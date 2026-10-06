/** Make → CRM lead webhook. QR sayfası ve site formu aynı adresi kullanır. */
export const MAKE_LEAD_WEBHOOK_URL = "https://hook.eu2.make.com/gi9ljt1pln4gna968773eggx5okcjc9d";

/**
 * Tarayıcıdan gönderir. Make CORS’u sık reddeder; istek çoğu zaman yine düşer.
 * Ağ hatasında da throw etmez — çağıran başarı ekranını gösterebilir.
 */
export async function postLeadWebhook(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch(MAKE_LEAD_WEBHOOK_URL, {
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
