/** Optional Pages Function — primary contact path is client-side Formspree (free). */
export const onRequestPost: PagesFunction = async () =>
  new Response(
    JSON.stringify({
      ok: false,
      error: "use_formspree",
      message: "Configure site.formspreeEndpoint; the React form posts to Formspree directly.",
    }),
    {
      status: 501,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
