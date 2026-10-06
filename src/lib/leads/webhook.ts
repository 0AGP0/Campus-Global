/** Make → CRM lead webhook. QR sayfası ve site formu bu adresi kullanır. */
export const MAKE_LEAD_WEBHOOK_URL = "https://hook.eu2.make.com/gi9ljt1pln4gna968773eggx5okcjc9d";

/** Üniversite seçim sayfası (sabit form + popup). */
export const UNI_MATCH_WEBHOOK_URL = "https://hook.eu2.make.com/m3d9da66kkbe2ppwszbjegq2vpwlmhf4";

/**
 * Tarayıcıdan gönderir. Make CORS’u sık reddeder; istek çoğu zaman yine düşer.
 * Ağ hatasında da throw etmez — çağıran başarı ekranını gösterebilir.
 */
export async function postLeadWebhook(
  payload: Record<string, unknown>,
  url: string = MAKE_LEAD_WEBHOOK_URL,
): Promise<void> {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
    });
  } catch {
    /* Make CORS */
  }
}
