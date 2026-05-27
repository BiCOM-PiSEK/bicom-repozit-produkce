/**
 * ═══════════════════════════════════════════════════════════════
 * BICOM PÍSEK — Admin Activity Feed API
 * ═══════════════════════════════════════════════════════════════
 * GET /admin/activity?limit=30
 *
 * Vrací chronologický proud událostí z audit_log pro Activity
 * Feed panel v admin SPA. Mapuje entity/action na typy a zprávy.
 * ═══════════════════════════════════════════════════════════════
 */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestGet({ env, data, request }) {
  if (!data.operator) {
    return json({ ok: false, error: 'Neoprávněný přístup' }, 401);
  }

  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '30', 10), 100);

    const result = await env.DB.prepare(
      `SELECT id, entity, entity_id, action, actor, created_at
       FROM audit_log
       ORDER BY created_at DESC
       LIMIT ?`
    ).bind(limit).all();

    const items = (result?.results || []).map((row) => ({
      id: row.id,
      type: mapEventType(row.entity, row.action),
      message: buildMessage(row.entity, row.action, row.actor, row.entity_id),
      created_at: row.created_at,
    }));

    return json({ ok: true, data: { items } });
  } catch (err) {
    console.error('[admin/activity] Error:', err);
    return json({ ok: false, error: 'Chyba při načítání událostí.' }, 500);
  }
}

/**
 * Mapuje entity + action na typ pro Activity Feed ikonu.
 */
function mapEventType(entity, action) {
  const map = {
    'bookings:create':   'booking',
    'bookings:confirm':  'booking',
    'bookings:cancel':   'alert',
    'bookings:anonymize': 'system',
    'newsletter:subscribe': 'booking',
    'blog_posts:create': 'ai',
    'blog_posts:publish': 'ai',
    'invoices:create':   'invoice',
    'invoices:paid':     'invoice',
    'operators:login':   'system',
    'system:backup':     'system',
    'system:error':      'error',
  };
  return map[`${entity}:${action}`] || 'system';
}

/**
 * Sestaví čitelnou zprávu pro Activity Feed.
 */
function buildMessage(entity, action, actor, entityId) {
  const messages = {
    'bookings:create':     'Nová poptávka zaregistrována',
    'bookings:confirm':    'Rezervace potvrzena',
    'bookings:cancel':     'Rezervace zrušena',
    'bookings:anonymize':  'Osobní údaje anonymizovány (GDPR)',
    'newsletter:subscribe': 'Nový odběratel newsletteru',
    'blog_posts:create':   'AI vygenerovala nový článek',
    'blog_posts:publish':  'Článek publikován na web',
    'invoices:create':     'Nová faktura vystavena',
    'invoices:paid':       'Faktura uhrazena',
    'operators:login':     'Přihlášení do Virtual Office',
    'system:backup':       'Záloha databáze dokončena',
    'system:error':        'Systémová chyba',
  };

  let msg = messages[`${entity}:${action}`] || `${entity}.${action}`;

  if (actor && actor !== 'system') {
    msg += ` · ${actor}`;
  }

  return msg;
}
