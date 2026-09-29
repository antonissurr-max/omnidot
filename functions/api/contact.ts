/** Optional Pages Function fallback — primary path is client-side Web3Forms (free). */
type Body = {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  notes?: string;
  locale?: string;
  website?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost: PagesFunction = async (context) => {
  let body: Body;
  try {
    body = (await context.request.json()) as Body;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (body.website) return json({ ok: true });

  // Kept for compatibility; the React form posts to Web3Forms directly (free, no Workers Paid).
  return json(
    {
      ok: false,
      error: "use_web3forms",
      message: "Configure site.web3formsAccessKey and submit from the client.",
    },
    501,
  );
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
