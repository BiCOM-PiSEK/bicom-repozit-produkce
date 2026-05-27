// GET /api/blog
// Returns the list of published blog posts.
// Uses KV cache with 1-hour TTL, falls back to D1 query.

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const CACHE_TTL = 3600; // 1 hour

/**
 * Handles OPTIONS preflight.
 */
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * GET /api/blog — List published blog posts.
 * Optional query param: ?limit=3
 */
export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    // Build cache key
    const cacheKey = `blog:published:limit:${limit}`;

    // 1. Check KV cache
    const cached = await env.CACHE.get(cacheKey, 'json');
    if (cached) {
      return new Response(
        JSON.stringify(cached),
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // 2. Query D1
    const { results } = await env.DB.prepare(
      `SELECT id, slug, title, excerpt, content, image_url, published_at 
       FROM blog_posts 
       WHERE status = 'published' 
       ORDER BY published_at DESC 
       LIMIT ?`
    ).bind(limit).all();

    const posts = results || [];

    // 3. Cache in KV with TTL
    await env.CACHE.put(cacheKey, JSON.stringify(posts), {
      expirationTtl: CACHE_TTL,
    });

    // 4. Return JSON array
    return new Response(
      JSON.stringify(posts),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('[blog] Unexpected error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Interní chyba serveru.' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
