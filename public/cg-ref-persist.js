/**
 * Campus Global — site geneli influencer / ref takibi
 *
 * 1) Ziyaretçi ?ref=ayse_ornek (veya influencer=, utm_ref=) ile gelir → saklanır.
 * 2) Sitede başka sayfaya geçse de değer kalır (localStorage + sessionStorage).
 * 3) hook.*.make.com adresine giden fetch (JSON veya form-urlencoded) gövdesine
 *    otomatik influencer_ref eklenir.
 *
 * Örnek: https://campusglobal.com.tr/?ref=ayse_ornek
 */
(function () {
  var KEY = "cg_influencer_ref";

  function sanitize(raw) {
    var ref = (raw || "").trim().slice(0, 80);
    if (!ref) return "";
    if (!/^[a-zA-Z0-9\u00C0-\u024F._-]+$/.test(ref)) return "";
    return ref;
  }

  function storeRef(ref) {
    if (!ref) return;
    try {
      sessionStorage.setItem(KEY, ref);
    } catch (e1) {}
    try {
      localStorage.setItem(KEY, ref);
    } catch (e2) {}
  }

  function getRef() {
    try {
      return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function captureFromUrl() {
    try {
      var u = new URL(window.location.href);
      var ref = sanitize(
        u.searchParams.get("ref") ||
          u.searchParams.get("influencer") ||
          u.searchParams.get("utm_ref") ||
          "",
      );
      if (ref) storeRef(ref);
    } catch (e) {}
  }

  function captureFromReferrer() {
    try {
      if (getRef()) return;
      var refUrl = document.referrer || "";
      if (!refUrl) return;
      var origin = window.location.origin || "";
      if (origin && refUrl.indexOf(origin) !== 0) return;
      var u = new URL(refUrl);
      var ref = sanitize(
        u.searchParams.get("ref") ||
          u.searchParams.get("influencer") ||
          u.searchParams.get("utm_ref") ||
          "",
      );
      if (ref) storeRef(ref);
    } catch (e) {}
  }

  captureFromUrl();
  captureFromReferrer();
  window.cgGetInfluencerRef = getRef;

  if (typeof window.fetch !== "function" || window.__cgMakeWebhookRefFetchWrapped) {
    return;
  }
  window.__cgMakeWebhookRefFetchWrapped = true;

  function isMakeWebhookUrl(urlStr) {
    if (!urlStr) return false;
    var s = String(urlStr).toLowerCase();
    return s.indexOf("hook.") !== -1 && s.indexOf("make.com") !== -1;
  }

  function contentType(headers) {
    if (!headers) return "";
    if (typeof Headers !== "undefined" && headers instanceof Headers) {
      return headers.get("Content-Type") || "";
    }
    return String(headers["Content-Type"] || headers["content-type"] || "");
  }

  var origFetch = window.fetch;
  window.fetch = function (input, init) {
    init = init || {};
    var urlStr = typeof input === "string" ? input : input && input.url ? String(input.url) : "";

    if (!isMakeWebhookUrl(urlStr) || init.body == null) {
      return origFetch.call(this, input, init);
    }

    var ref = getRef();
    if (!ref) {
      return origFetch.call(this, input, init);
    }

    try {
      var ct = contentType(init.headers).toLowerCase();

      if (typeof init.body === "string") {
        var bodyTrim = init.body.replace(/^\uFEFF/, "").trim();

        if (ct.indexOf("json") !== -1 || bodyTrim.charAt(0) === "{") {
          var j = JSON.parse(init.body);
          if (j !== null && typeof j === "object" && !Array.isArray(j)) {
            if (!j.influencer_ref) j.influencer_ref = ref;
            init = Object.assign({}, init, { body: JSON.stringify(j) });
          }
        } else if (
          ct.indexOf("application/x-www-form-urlencoded") !== -1 ||
          bodyTrim.indexOf("=") !== -1
        ) {
          var params = new URLSearchParams(init.body);
          if (!params.get("influencer_ref")) params.set("influencer_ref", ref);
          init = Object.assign({}, init, { body: params.toString() });
        }
      } else if (typeof FormData !== "undefined" && init.body instanceof FormData) {
        if (!init.body.has("influencer_ref")) init.body.append("influencer_ref", ref);
      }
    } catch (e) {}

    return origFetch.call(this, input, init);
  };
})();
