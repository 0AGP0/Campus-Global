# Campus Global — Sanity içerik paneli kurulumu

İçerik ekibi **GitHub / zip / MD dosyası görmez**; tarayıcıdaki panele girer. Site build edildiğinde içerik ve **navbar** Sanity’den okunur.

Sanity yoksa veya `.env` boşsa site **eskisi gibi** `site-nav.ts` + Markdown ile çalışır.

---

## Sizin yapacaklarınız (tek sefer)

### 1. Sanity hesabı ve proje

1. [sanity.io](https://www.sanity.io) → ücretsiz hesap  
2. **Create project** → ad: `Campus Global`  
3. **Project ID**’yi kopyalayın (ör. `abc123xy`)

### 2. API token’ları

Sanity proje → **API** → **Tokens**:

| Token | Yetki | Kullanım |
|-------|--------|----------|
| Read | Viewer veya Editor | `SANITY_API_READ_TOKEN` — site build |
| Write | Editor | `SANITY_API_WRITE_TOKEN` — import / seed |

### 3. Ortam değişkenleri

Proje kökünde:

```bash
cp .env.example .env
```

`.env` içine doldurun (Project ID her yerde aynı):

```env
PUBLIC_SANITY_PROJECT_ID=abc123xy
PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk...

SANITY_STUDIO_PROJECT_ID=abc123xy
SANITY_STUDIO_DATASET=production
SANITY_API_WRITE_TOKEN=sk...
```

`studio/.env` (panel için — aynı ID):

```env
SANITY_STUDIO_PROJECT_ID=abc123xy
SANITY_STUDIO_DATASET=production
```

### 4. Studio kurulumu ve yayın

```bash
cd studio
npm install
npm run dev
```

Tarayıcı: `http://localhost:3333` — şemaları görürsünüz.

Paneli internete açmak (içerikçi adresi):

```bash
npm run deploy
```

Çıkan adres örn. `https://campus-global.sanity.studio` — bunu içerikçiye verin.

### 5. İlk veri yükleme (navbar + makaleler)

Proje kökünde:

```bash
npm install
npm run sanity:seed
npm run sanity:import-articles
```

- `sanity:seed` → mevcut **navbar** (`site-nav.ts`) Sanity’ye  
- `sanity:import-articles` → tüm `src/content/articles/**/*.md` Sanity’ye  

Sonra Studio’da **Site menüsü** ve **Yazı sayfaları** dolu olmalı.

### 6. Site build test

```bash
npm run build
```

`.env` doluysa build Sanity’den okur; boşsa Markdown fallback.

### 7. Hostinger (mevcut akışınız)

1. Bilgisayarınızda `npm run build`  
2. `dist/` içeriğini `public_html`’e yükle  

**Otomatik deploy** (isteğe bağlı, sonra): GitHub Actions + Hostinger FTP — `docs` içinde adımlar eklenebilir.

---

## İçerikçi günlük kullanım

1. Sanity Studio adresine gir (e-posta daveti veya Google ile giriş)  
2. **Yazı sayfaları** → sayfa seç veya **Create**  
3. Alanları doldur; gövde **HTML** (mevcut makalelerle aynı)  
4. **Menü** sekmesi: mega menüde göster, sütun, menü metni  
5. **Publish**  

Navbar için: **Site menüsü (navbar)** → sütunlara link ekle/düzenle → Publish  

Siz: `npm run build` + Hostinger upload (otomasyon kurulana kadar).

---

## Yeni sayfa + menü

1. **Yazı sayfası** oluştur → slug: `dil-okullari/yeni-ulke`  
2. Menü sekmesinde: göster, ana menü `dil-okullari`, sütun `Ülkeler`, menü metni  
3. Veya **Site menüsü**nde ilgili sütuna link ekle  
4. Publish → build → site + navbar güncel  

---

## Sorun giderme

| Sorun | Çözüm |
|-------|--------|
| Build hâlâ eski metin | `.env` Project ID kontrol; makale Sanity’de **Published** mi? |
| Navbar değişmiyor | `siteNavigation` belgesini Publish edin |
| Studio açılmıyor | `studio/.env` Project ID |
| Import hata | Write token Editor yetkisi |

---

## Komut özeti

| Komut | Açıklama |
|-------|----------|
| `npm run studio` | Panel yerel (localhost:3333) |
| `npm run studio:deploy` | Paneli sanity.studio’ya yayınla |
| `npm run sanity:seed` | Navbar’ı Sanity’ye yükle |
| `npm run sanity:import-articles` | MD makaleleri Sanity’ye yükle |
| `npm run build` | Site üret (Sanity veya MD fallback) |
