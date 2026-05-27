/**
 * BICOM PÍSEK — Invoices Admin API
 * GET  /admin/invoices — přehled z iDokladu / DB
 * POST /admin/invoices — vystavení faktury
 */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export async function onRequestGet({ env, data, request }) {
  if (!data.operator) return json({ ok: false, error: 'Neoprávněný přístup' }, 401);

  try {
    // Pokud iDoklad klíče existují, proxy na iDoklad API
    if (env.SECRET_IDOKLAD_CLIENT_ID && env.SECRET_IDOKLAD_CLIENT_SECRET) {
      return await fetchFromIDoklad(env, request);
    }

    // Fallback: mock data (klíče nejsou nastaveny)
    return json({
      ok: true,
      data: {
        invoices: [],
        source: 'mock',
        note: 'iDoklad klíče nejsou nastaveny. Pro propojení přidejte SECRET_IDOKLAD_CLIENT_ID a SECRET_IDOKLAD_CLIENT_SECRET.',
      },
    });
  } catch (err) {
    console.error('[admin/invoices] GET error:', err);
    return json({ ok: false, error: 'Chyba při načítání faktur.' }, 500);
  }
}

export async function onRequestPost({ env, data, request }) {
  if (!data.operator) return json({ ok: false, error: 'Neoprávněný přístup' }, 401);

  try {
    const body = await request.json();
    const { customer_name, items } = body;

    if (!customer_name || !items?.length) {
      return json({ ok: false, error: 'Vyplňte jméno klienta a položky faktury.' }, 400);
    }

    // iDoklad integration
    if (env.SECRET_IDOKLAD_CLIENT_ID && env.SECRET_IDOKLAD_CLIENT_SECRET) {
      return await createInIDoklad(env, data, body);
    }

    // Audit log + mock response
    await env.DB.prepare(
      `INSERT INTO audit_log (id, entity, entity_id, action, actor, details)
       VALUES (?, 'invoices', ?, 'create', ?, ?)`
    ).bind(
      crypto.randomUUID(),
      'mock-' + crypto.randomUUID().slice(0, 8),
      `operator:${data.operator.id}`,
      `Mock faktura: ${customer_name}`
    ).run();

    return json({
      ok: true,
      data: {
        id: 'mock-' + crypto.randomUUID().slice(0, 8),
        source: 'mock',
        note: 'Faktura zaznamenaná v audit logu. Pro skutečné vystavení propojte iDoklad.',
      },
    });
  } catch (err) {
    console.error('[admin/invoices] POST error:', err);
    return json({ ok: false, error: 'Chyba při vystavování faktury.' }, 500);
  }
}

/**
 * Fetch invoices from iDoklad API.
 */
async function fetchFromIDoklad(env, request) {
  const token = await getIDokladToken(env);
  if (!token) return json({ ok: false, error: 'Nepodařilo se autorizovat u iDokladu.' }, 502);

  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const pageSize = url.searchParams.get('limit') || '20';

  const res = await fetch(`https://app.idoklad.cz/developer/api/v3/IssuedInvoices?page=${page}&pageSize=${pageSize}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
  });

  if (!res.ok) {
    console.error('[iDoklad] API error:', res.status);
    return json({ ok: false, error: `iDoklad API chyba: ${res.status}` }, 502);
  }

  const idData = await res.json();
  const invoices = (idData.Items || []).map((inv) => ({
    id: inv.Id,
    number: inv.DocumentNumber,
    customer: inv.PartnerName,
    date: inv.DateOfIssue,
    amount: inv.TotalWithVat,
    status: inv.IsPaid ? 'paid' : 'unpaid',
    currency: inv.CurrencyCode || 'CZK',
  }));

  return json({ ok: true, data: { invoices, total: idData.TotalItems || invoices.length, source: 'idoklad' } });
}

/**
 * Create invoice in iDoklad.
 */
async function createInIDoklad(env, data, body) {
  const token = await getIDokladToken(env);
  if (!token) return json({ ok: false, error: 'Nepodařilo se autorizovat u iDokladu.' }, 502);

  const items = body.items.map((item) => ({
    Name: item.description,
    Amount: item.quantity || 1,
    UnitPrice: item.unit_price,
    VatRateType: 2, // 21% DPH (standard)
  }));

  const res = await fetch('https://app.idoklad.cz/developer/api/v3/IssuedInvoices', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      PartnerName: body.customer_name,
      Items: items,
      Description: body.description || 'Biorezonanční terapie BICOM',
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[iDoklad] Create error:', errBody);
    return json({ ok: false, error: 'iDoklad: nepodařilo se vystavit fakturu.' }, 502);
  }

  const created = await res.json();

  // Audit log
  await env.DB.prepare(
    `INSERT INTO audit_log (id, entity, entity_id, action, actor, details)
     VALUES (?, 'invoices', ?, 'create', ?, ?)`
  ).bind(
    crypto.randomUUID(),
    String(created.Id || ''),
    `operator:${data.operator.id}`,
    `iDoklad faktura: ${created.DocumentNumber || 'N/A'}`
  ).run();

  return json({
    ok: true,
    data: {
      id: created.Id,
      number: created.DocumentNumber,
      source: 'idoklad',
    },
  });
}

/**
 * Get OAuth token from iDoklad.
 */
async function getIDokladToken(env) {
  try {
    const res = await fetch('https://identity.idoklad.cz/server/connect/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: env.SECRET_IDOKLAD_CLIENT_ID,
        client_secret: env.SECRET_IDOKLAD_CLIENT_SECRET,
        scope: 'idoklad_api',
      }),
    });
    const tokenData = await res.json();
    return tokenData.access_token || null;
  } catch (err) {
    console.error('[iDoklad] Token error:', err);
    return null;
  }
}
