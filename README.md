# 💗 Romantik Sürpriz Sitesi

Sevdiğin kişiye özel hazırlanmış, tamamen Türkçe, interaktif ve mobil uyumlu
bir web sitesi. HTML5, CSS3 ve saf JavaScript (Vanilla JS) ile yazıldı.
Hiçbir framework veya harici kütüphane kullanılmadı; site internet bağlantısı
olmadan da çalışır.

---

## ✨ Projenin Amacı

Site üç adımdan oluşur:

1. **Soru Ekranı:** "Beni seviyor musun?" sorusu ve Evet / Hayır butonları.
   Hayır'a her basıldığında Evet butonu biraz daha büyür, Hayır küçülür ve
   sevimli mesajlar değişir.
2. **Albüm Seçme Ekranı:** Üç farklı anı albümü kartı.
3. **Fotoğraf Galerisi:** Albüm fotoğraflarının ızgarası ve büyük fotoğraf
   görünümü (lightbox). Büyük görselde ileri / geri gezinme, klavye desteği
   ve kapatma vardır.

Tüm ekran geçişleri sayfa yenilenmeden, yumuşak fade-in / fade-out
animasyonlarıyla yapılır.

---

## 📁 Klasör Yapısı

```
WannaBeYours/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── gifs/
    │   ├── hero.gif      (soru ekranındaki üst görsel)
    │   ├── album-1.gif   (1. albüm kapağı)
    │   ├── album-2.gif   (2. albüm kapağı)
    │   └── album-3.gif   (3. albüm kapağı)
    └── photos/
        ├── album-1/      (1. albümün fotoğrafları)
        ├── album-2/      (2. albümün fotoğrafları)
        └── album-3/      (3. albümün fotoğrafları)
```

> Not: `.gitkeep` dosyaları sadece boş klasörlerin kaybolmamasını sağlar,
> onlara dokunmanıza gerek yoktur.

---

## 🚀 Projeyi Çalıştırma

**En kolay yol:**

1. `index.html` dosyasına çift tıklayın. Site tarayıcıda açılır.

**Önerilen yol (VS Code Live Server):**

1. Projeyi VS Code ile açın.
2. "Live Server" eklentisini kurun.
3. `index.html` üzerine sağ tıklayıp **"Open with Live Server"** seçin.

Her iki yöntem de çalışır. Live Server, değişiklikleri otomatik yeniler,
bu yüzden geliştirme sırasında daha rahattır.

---

## 📸 Fotoğraf Ekleme

Tarayıcılar bir klasördeki dosyaları kendiliğinden listeleyemez. Bu yüzden
fotoğrafların hangi klasörde olduğu JavaScript'teki bir listede tanımlıdır.
İki adımda fotoğraflarınızı ekleyebilirsiniz:

**1. Adım — Dosyaları kopyalayın:**

- 1. albümün fotoğrafları → `assets/photos/album-1/`
- 2. albümün fotoğrafları → `assets/photos/album-2/`
- 3. albümün fotoğrafları → `assets/photos/album-3/`

**2. Adım — `js/script.js` dosyasını düzenleyin:**

Dosyanın en üstündeki **`albums`** dizisi (yaklaşık **16. satırdan** başlar)
tüm albümleri tutar. Örnek:

```js
photos: [
  "assets/photos/album-1/foto1.jpg",
  "assets/photos/album-1/foto2.jpg"
]
```

Fotoğraflarınızı `foto1.jpg`, `foto2.jpg` ... şeklinde adlandırırsanız
listedeki yollarla birebir eşleşir ve hiçbir şey değiştirmenize gerek kalmaz.

Farklı isimler kullanmak isterseniz, ilgili satırdaki dosya yolunu kendi
dosya adınızla değiştirin:

```js
"assets/photos/album-1/denizde.jpg",
"assets/photos/album-1/kahve-keyfi.jpg"
```

Fotoğraf sayısını artırıp azaltmakta özgürsünüz; listeye eklediğiniz her
yol galeride yeni bir kutu oluşturur. **Aynı şekilde satırları silerek**
fotoğraf çıkarabilirsiniz.

> Önemli: Dosya adlarında Türkçe karakter ve boşluk kullanmaktan kaçının
> (`bizim-foto.jpg` iyi, `bizim fotoğrafı.JPG` sorun çıkarabilir). Büyük /
> küçük harf duyarlılığı özellikle GitHub Pages'te farklıdır; dosya adını
> listeye birebir aynı şekilde yazdığınızdan emin olun.

### Fotoğraf henüz eklenmediyse ne olur?

Hiçbir şey bozulmaz. Yüklenemeyen görsellerin yerine pembe degradeli,
kalp ikonlu zarif bir yer tutucu gösterilir. Büyük görünümde de
"Bu fotoğraf henüz eklenmemiş." mesajı çıkar.

---

## 🎞️ GIF Ekleme

GIF dosyalarını `assets/gifs/` klasörüne, **tam olarak şu isimlerle** koyun:

| Dosya               | Nerede kullanılır              |
| ------------------- | ------------------------------ |
| `hero.gif`          | Soru ekranındaki üst görsel    |
| `album-1.gif`       | "Güzel Anılarımız" kartı       |
| `album-2.gif`       | "En Tatlı Anlarımız" kartı     |
| `album-3.gif`       | "Sadece Biz" kartı             |

GIF dosyaları yoksa site yine sorunsuz çalışır: GIF yerine CSS ile çizilmiş,
kalp atışı animasyonlu sevimli bir kalp (soru ekranında) veya emoji kapak
(albüm kartlarında) gösterilir. İnternetten GIF çekilmez; sadece yerel
dosyalar kullanılır.

---

## 🏷️ Albüm İsmini ve Açıklamasını Değiştirme

`js/script.js` dosyasındaki `albums` dizisinde her albümün şu alanları vardır:

```js
{
  id: "album-1",                                  // değiştirmeyin
  title: "Güzel Anılarımız 💕",                   // albüm başlığı
  description: "Birlikte çekildiğimiz fotoğraflar.", // kısa açıklama
  cover: "assets/gifs/album-1.gif",               // kapak GIF yolu
  emoji: "💕",                                    // GIF yoksa gösterilen emoji
  photos: [ ... ]                                 // fotoğraf listesi
}
```

- **Başlığı değiştirmek için:** `title` alanını düzenleyin (satır ~19, 34, 49).
- **Açıklamayı değiştirmek için:** `description` alanını düzenleyin.
- **Kapak GIF'ini değiştirmek için:** `cover` alanındaki yolu güncelleyin.
- `emoji` alanı, kapak GIF'i bulunamadığında gösterilen yedek görseldir.

### Yeni albüm eklemek isterseniz

Üç albümün altına yeni bir nesne eklemeniz yeterlidir (albüm ızgarası
otomatik olarak uyum sağlar):

```js
{
  id: "album-4",
  title: "Yeni Albümümüz 🌷",
  description: "Açıklama...",
  cover: "assets/gifs/album-4.gif",
  emoji: "🌷",
  photos: [
    "assets/photos/album-4/foto1.jpg"
  ]
}
```

Yeni bir klasör açmayı unutmayın: `assets/photos/album-4/`.

---

## 🌐 GitHub Pages ile Yayımlama

1. GitHub'da yeni bir depo (repository) oluşturun.
2. Proje dosyalarını depoya yükleyin (push edin).
3. Depoda **Settings → Pages** bölümüne gidin.
4. **Source** olarak `Deploy from a branch` seçin.
5. **Branch** olarak `main` ve klasör olarak `/ (root)` seçip **Save**'e basın.
6. Birkaç dakika sonra siteniz şu adreste yayında olur:
   `https://kullanıcı-adınız.github.io/depo-adı/`

> İpuçları:
> - `index.html` kök dizinde olmalıdır (bu projede öyle).
> - Fotoğraf dosya adlarının büyük / küçük harfleriyle listeye yazılan
>   yollar birebir aynı olmalıdır; GitHub Pages büyük/küçük harfe duyarlıdır.

---

## ⌨️ Klavye Kısayolları (Büyük Fotoğraf Görünümü)

| Tuş          | İşlev                          |
| ------------ | ------------------------------ |
| `→`          | Sonraki fotoğraf               |
| `←`          | Önceki fotoğraf                |
| `Esc`        | Büyük görünümü kapat           |
| `Tab`        | Kapat / ileri / geri arasında gezinme |

---

## ♿ Erişilebilirlik ve Performans Notları

- Ekran okuyucular için anlamlı `alt` metinleri ve `aria` etiketleri vardır.
- İşletim sisteminde "hareketi azalt" (prefers-reduced-motion) tercihi
  açıksa animasyonlar otomatik olarak en aza indirilir; yüzen kalpler
  gösterilmez.
- Büyük fotoğraf açıkken arka planın kaydırılması engellenir.
- Sayfa, dış kütüphane kullanmadığı için hızlı açılır ve çevrimdışı çalışır.

---

## 🛠️ Sorun Giderme

| Sorun | Çözüm |
| ----- | ----- |
| Fotoğraf görünmüyor | Dosya adını ve uzantıyı `js/script.js` listesiyle birebir karşılaştırın. Yol `assets/photos/album-1/...` ile başlamalıdır. |
| GIF görünmüyor | Dosya adı tam olarak `hero.gif`, `album-1.gif` ... olmalı ve `assets/gifs/` içinde bulunmalıdır. Yedek görsel çıkıyorsa normaldir. |
| Büyük fotoğraf açılmıyor | Konsolda hata olup olmadığını kontrol edin; albüm listesinin doğru formatta olduğundan emin olun. |
| Değişiklikler görünmüyor | Sayfayı yenileyin; Live Server kullanıyorsanız kaydettiğinizden emin olun. |
