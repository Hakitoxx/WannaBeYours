"use strict";

/* =========================================================
   1) ALBÜM VERİLERİ  →  ★ BURAYI DÜZENLEYEREK FOTOĞRAF EKLERSİNİZ ★
   ---------------------------------------------------------
   Fotoğraf eklemek için:
   a) Fotoğrafları assets/photos/album-1 (veya album-2, album-3)
      klasörünün içine kopyalayın.
   b) Aşağıdaki ilgili albümün "photos" listesine dosya yolunu ekleyin:
      "assets/photos/album-1/benim-fotom.jpg"

   Albüm adını / açıklamasını değiştirmek için "title" ve
   "description" alanlarını düzenleyin.
   ========================================================= */

const albums = [
  {
    id: "album-1",
    title: "Güzel Anılarımız 💕",
    description: "Birlikte çekildiğimiz fotoğraflar.",
    cover: "assets/gifs/album-1.gif",
    emoji: "💕",
    photos: [
      "assets/photos/album-1/foto1.jpg",
      "assets/photos/album-1/foto2.jpg",
      "assets/photos/album-1/foto3.jpg",
      "assets/photos/album-1/foto4.jpg",
      "assets/photos/album-1/foto5.jpg",
      "assets/photos/album-1/foto6.jpg"
    ]
  },
  {
    id: "album-2",
    title: "En Tatlı Anlarımız 🧸",
    description: "Gülümseten ve unutulmaz karelerimiz.",
    cover: "assets/gifs/album-2.gif",
    emoji: "🧸",
    photos: [
      "assets/photos/album-2/foto1.jpg",
      "assets/photos/album-2/foto2.jpg",
      "assets/photos/album-2/foto3.jpg",
      "assets/photos/album-2/foto4.jpg",
      "assets/photos/album-2/foto5.jpg",
      "assets/photos/album-2/foto6.jpg"
    ]
  },
  {
    id: "album-3",
    title: "Sadece Biz ✨",
    description: "Bize özel diğer fotoğraflar.",
    cover: "assets/gifs/album-3.gif",
    emoji: "✨",
    photos: [
      "assets/photos/album-3/foto1.jpg",
      "assets/photos/album-3/foto2.jpg",
      "assets/photos/album-3/foto3.jpg",
      "assets/photos/album-3/foto4.jpg",
      "assets/photos/album-3/foto5.jpg",
      "assets/photos/album-3/foto6.jpg"
    ]
  }
];

/* =========================================================
   2) "HAYIR" BUTONU MESAJLARI
   Sırayla gösterilir; buradan düzenleyebilirsiniz.
   ========================================================= */

const hayirMesajlari = [
  "Emin misin? 🥺",
  "Bir daha düşünsen? 💗",
  "Kalbim cevabını bekliyor...",
  "Belki de evet demek istersin? ❤️",
  "Hayır butonu bile evet demek istiyor 🙈",
  "Bir şans daha? 🌸"
];

/* =========================================================
   3) KÜÇÜK YARDIMCILAR
   ========================================================= */

const sec = (secici, kok = document) => kok.querySelector(secici);
const dosyaAdi = (yol) => (yol || "").split("/").pop();

let hareketAzalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function gorselHatasiIzle(img, kap, sinif = "gif-yok") {
  const hata = () => kap.classList.add(sinif);
  img.addEventListener("error", hata);
  if (img.complete && img.naturalWidth === 0) hata();
}

/* =========================================================
   4) EKRAN GEÇİŞLERİ (sayfa yenilenmeden fade-in / fade-out)
   ========================================================= */

let gecisKilidi = false;

function ekranDegistir(hedefId) {
  const aktif = sec(".ekran.aktif");
  const hedef = document.getElementById(hedefId);
  if (!hedef || hedef === aktif || gecisKilidi) return;

  gecisKilidi = true;

  const goster = () => {
    hedef.hidden = false;
    hedef.classList.add("aktif", "giriyor");
    hedef.addEventListener("animationend", () => hedef.classList.remove("giriyor"), { once: true });

    const odak = hedef.querySelector("[data-odak]");
    if (odak) odak.focus({ preventScroll: true });

    gecisKilidi = false;
  };

  if (aktif) {
    aktif.classList.add("cikiyor");
    window.setTimeout(() => {
      aktif.classList.remove("aktif", "cikiyor");
      aktif.hidden = true;
      goster();
    }, hareketAzalt ? 0 : 280);
  } else {
    goster();
  }
}

/* =========================================================
   5) SORU EKRANI — EVET / HAYIR DAVRANIŞI
   ========================================================= */

const evetBtn = sec("#evetBtn");
const hayirBtn = sec("#hayirBtn");
const butonAlani = sec("#butonAlani");
const mesajEl = sec("#hayirMesaji");

let hayirSayisi = 0;
let evetOlcek = 1;
let hayirOlcek = 1;

const HAYIR_MIN_OLCEK = 0.55;

function evetMaksOlcek() {
  const kutuGenisligi = butonAlani.clientWidth || window.innerWidth - 80;
  const butonGenisligi = evetBtn.offsetWidth || 140;
  const sigar = (kutuGenisligi - 28) / butonGenisligi;
  const ekranSiniri = window.innerWidth < 520 ? 1.7 : 2.3;
  return Math.max(1.25, Math.min(sigar, ekranSiniri));
}

function olcekleriUygula() {
  evetBtn.style.setProperty("--e-o", evetOlcek.toFixed(3));
  hayirBtn.style.setProperty("--h-o", hayirOlcek.toFixed(3));
}

function salla(eleman) {
  eleman.classList.remove("sallan");
  void eleman.offsetWidth;
  eleman.classList.add("sallan");
}

function nabizEkle() {
  evetBtn.classList.remove("nabiz");
  void evetBtn.offsetWidth;
  evetBtn.classList.add("nabiz");
}

function mesajGuncelle() {
  if (hayirSayisi === 0) return;
  mesajEl.textContent = hayirMesajlari[(hayirSayisi - 1) % hayirMesajlari.length];
  mesajEl.classList.remove("mesaj-pop");
  void mesajEl.offsetWidth;
  mesajEl.classList.add("mesaj-pop");
}

hayirBtn.addEventListener("click", () => {
  hayirSayisi += 1;

  const evetArtis = 0.1 + hayirSayisi * 0.02;
  const hayirAzalis = 0.08 + hayirSayisi * 0.015;

  evetOlcek = Math.min(evetOlcek + evetArtis, evetMaksOlcek());
  hayirOlcek = Math.max(hayirOlcek - hayirAzalis, HAYIR_MIN_OLCEK);
  olcekleriUygula();

  salla(hayirBtn);
  nabizEkle();
  mesajGuncelle();

  const kutu = hayirBtn.getBoundingClientRect();
  kalpPatlamasi(kutu.left + kutu.width / 2, kutu.top + kutu.height / 2, 8, ["💗", "💕", "🙈"]);
});

evetBtn.addEventListener("click", () => {
  const kutu = evetBtn.getBoundingClientRect();
  kalpPatlamasi(kutu.left + kutu.width / 2, kutu.top + kutu.height / 2, 20);
  window.setTimeout(() => ekranDegistir("albumEkrani"), hareketAzalt ? 0 : 260);
});

window.addEventListener("resize", () => {
  evetOlcek = Math.max(1, Math.min(evetOlcek, evetMaksOlcek()));
  olcekleriUygula();
});

/* =========================================================
   6) KALP PATLAMASI ANİMASYONU
   ========================================================= */

const patlamaKatmani = sec("#patlamaKatmani");

function kalpPatlamasi(x, y, adet = 14, semboller = ["❤️", "💗", "💕", "💖"]) {
  if (hareketAzalt) return;

  for (let i = 0; i < adet; i += 1) {
    const kalp = document.createElement("span");
    kalp.className = "patlama-kalp";
    kalp.textContent = semboller[Math.floor(Math.random() * semboller.length)];

    const aci = Math.random() * Math.PI * 2;
    const mesafe = 60 + Math.random() * 100;

    kalp.style.left = `${x}px`;
    kalp.style.top = `${y}px`;
    kalp.style.fontSize = `${12 + Math.random() * 16}px`;
    kalp.style.setProperty("--dx", `${(Math.cos(aci) * mesafe).toFixed(1)}px`);
    kalp.style.setProperty("--dy", `${(Math.sin(aci) * mesafe - 50).toFixed(1)}px`);
    kalp.style.setProperty("--dondur", `${Math.round(Math.random() * 140 - 70)}deg`);
    kalp.style.setProperty("--sure", `${(0.7 + Math.random() * 0.5).toFixed(2)}s`);

    kalp.addEventListener("animationend", () => kalp.remove(), { once: true });
    window.setTimeout(() => kalp.remove(), 1600);

    patlamaKatmani.appendChild(kalp);
  }
}

/* =========================================================
   7) ALBÜM SEÇME EKRANI
   ========================================================= */

const albumIzgara = sec("#albumIzgara");
const fotoIzgara = sec("#fotoIzgara");
const galeriBaslik = sec("#galeriBaslik");

let aktifAlbum = null;
let aktifFotoIndex = 0;

function albumleriOlustur() {
  albumIzgara.innerHTML = "";

  albums.forEach((album) => {
    const kart = document.createElement("article");
    kart.className = "album-kart";
    kart.innerHTML = `
      <div class="album-kapak">
        <img src="${album.cover}" alt="${album.title} albümünün kapak görseli" loading="lazy">
        <span class="kapak-yedek" aria-hidden="true">${album.emoji || "💗"}</span>
      </div>
      <h3 class="album-ad">${album.title}</h3>
      <p class="album-aciklama">${album.description}</p>
      <button type="button" class="btn btn-album">Albümü Aç</button>
    `;

    const kapak = kart.querySelector(".album-kapak");
    gorselHatasiIzle(kart.querySelector("img"), kapak);

    kart.querySelector(".btn-album").addEventListener("click", () => galeriAc(album));
    albumIzgara.appendChild(kart);
  });
}

function galeriAc(album) {
  aktifAlbum = album;
  aktifFotoIndex = 0;
  galeriBaslik.textContent = album.title;
  fotoIzgarasiniOlustur(album);
  ekranDegistir("galeriEkrani");
}

function fotoIzgarasiniOlustur(album) {
  fotoIzgara.innerHTML = "";

  if (!album.photos || album.photos.length === 0) {
    const bos = document.createElement("p");
    bos.className = "bos-mesaj";
    bos.textContent =
      `Bu albüme henüz fotoğraf eklenmemiş. ` +
      `assets/photos/${album.id}/ klasörüne fotoğraflarınızı koyup ` +
      `js/script.js dosyasındaki listeye ekleyin. 💗`;
    fotoIzgara.appendChild(bos);
    return;
  }

  album.photos.forEach((yol, index) => {
    const kutu = document.createElement("button");
    kutu.type = "button";
    kutu.className = "foto-kutu";
    kutu.setAttribute("aria-label", `${album.title}: ${index + 1}. fotoğrafı büyüt`);

    const img = document.createElement("img");
    img.src = yol;
    img.alt = `${album.title} - ${index + 1}. fotoğraf`;
    img.loading = "lazy";
    img.addEventListener("error", () => yedekGoster(kutu, yol));
    if (img.complete && img.naturalWidth === 0) yedekGoster(kutu, yol);
    kutu.appendChild(img);

    kutu.addEventListener("click", () => lightboxAc(index));
    fotoIzgara.appendChild(kutu);
  });
}

function yedekGoster(kutu, yol) {
  if (kutu.querySelector(".foto-yedek")) return;
  kutu.innerHTML = `
    <span class="foto-yedek" aria-hidden="true">
      <span class="foto-yedek-kalp">💗</span>
      <span class="foto-yedek-ad">${dosyaAdi(yol)}</span>
    </span>
  `;
}

/* =========================================================
   8) BÜYÜK FOTOĞRAF GÖRÜNÜMÜ (LIGHTBOX)
   ========================================================= */

const lightbox = sec("#lightbox");
const buyukGorsel = sec("#buyukGorsel");
const buyukYedek = sec("#buyukYedek");
const buyukYedekAd = sec("#buyukYedekAd");
const lbSayac = sec("#lbSayac");
const lbAlbumAdi = sec("#lbAlbumAdi");
const lbKapat = sec("#lbKapat");
const lbOnceki = sec("#lbOnceki");
const lbSonraki = sec("#lbSonraki");

let sonOdaklanan = null;
let lbKapanisZamanlayici = null;
let aktifFotoYolu = "";

function lightboxAc(index) {
  if (!aktifAlbum || !aktifAlbum.photos || aktifAlbum.photos.length === 0) return;

  sonOdaklanan = document.activeElement;
  aktifFotoIndex = index;
  buyukGoster(aktifFotoIndex);

  if (lbKapanisZamanlayici) window.clearTimeout(lbKapanisZamanlayici);
  lightbox.hidden = false;
  window.requestAnimationFrame(() => lightbox.classList.add("acik"));
  document.body.classList.add("kilitli");
  lbKapat.focus({ preventScroll: true });
}

function lightboxKapat() {
  lightbox.classList.remove("acik");
  document.body.classList.remove("kilitli");
  lbKapanisZamanlayici = window.setTimeout(() => {
    lightbox.hidden = true;
  }, hareketAzalt ? 0 : 300);

  if (sonOdaklanan && typeof sonOdaklanan.focus === "function") {
    sonOdaklanan.focus({ preventScroll: true });
  }
}

function buyukGoster(index) {
  const adet = aktifAlbum.photos.length;
  aktifFotoIndex = ((index % adet) + adet) % adet;
  aktifFotoYolu = aktifAlbum.photos[aktifFotoIndex];

  buyukYedek.hidden = true;
  buyukGorsel.hidden = false;
  buyukGorsel.src = aktifFotoYolu;
  buyukGorsel.alt = `${aktifAlbum.title} - ${aktifFotoIndex + 1}. fotoğraf`;

  lbAlbumAdi.textContent = aktifAlbum.title;
  lbSayac.textContent = `${aktifFotoIndex + 1} / ${adet}`;

  fotoOnYukle(aktifFotoIndex + 1);
  fotoOnYukle(aktifFotoIndex - 1);
}

function fotoOnYukle(index) {
  const adet = aktifAlbum.photos.length;
  const hedef = ((index % adet) + adet) % adet;
  const yol = aktifAlbum.photos[hedef];
  if (!yol || yol === aktifFotoYolu) return;
  const onYukleme = new Image();
  onYukleme.src = yol;
}

buyukGorsel.addEventListener("error", () => {
  if (buyukGorsel.getAttribute("src") !== aktifFotoYolu) return;
  buyukGorsel.hidden = true;
  buyukYedek.hidden = false;
  buyukYedekAd.textContent = dosyaAdi(aktifFotoYolu);
});

lbKapat.addEventListener("click", lightboxKapat);
lbOnceki.addEventListener("click", () => buyukGoster(aktifFotoIndex - 1));
lbSonraki.addEventListener("click", () => buyukGoster(aktifFotoIndex + 1));

lightbox.addEventListener("click", (olay) => {
  if (olay.target === lightbox) lightboxKapat();
});

document.addEventListener("keydown", (olay) => {
  if (lightbox.hidden) return;

  if (olay.key === "Escape") {
    olay.preventDefault();
    lightboxKapat();
    return;
  }

  if (olay.key === "ArrowRight") {
    olay.preventDefault();
    buyukGoster(aktifFotoIndex + 1);
    return;
  }

  if (olay.key === "ArrowLeft") {
    olay.preventDefault();
    buyukGoster(aktifFotoIndex - 1);
    return;
  }

  if (olay.key === "Tab") {
    const odaklar = [lbKapat, lbOnceki, lbSonraki];
    const aktifIndeks = odaklar.indexOf(document.activeElement);
    if (aktifIndeks === -1) return;
    olay.preventDefault();
    const yon = olay.shiftKey ? -1 : 1;
    const yeniIndeks = (aktifIndeks + yon + odaklar.length) % odaklar.length;
    odaklar[yeniIndeks].focus();
  }
});

/* =========================================================
   9) GERİ DÖNÜŞ BUTONLARI
   ========================================================= */

sec("#albumlereDonBtn").addEventListener("click", () => ekranDegistir("albumEkrani"));
sec("#soruyaDonBtn").addEventListener("click", () => ekranDegistir("soruEkrani"));

/* =========================================================
   10) ARKA PLAN DEKORU (yüzen kalpler + parıltılar)
   ========================================================= */

const arkaPlan = sec("#arkaPlan");
const hareketSorgu = window.matchMedia("(prefers-reduced-motion: reduce)");

function arkaPlaniOlustur() {
  arkaPlan.innerHTML = "";
  if (hareketAzalt) return;

  const kalpAdedi = window.innerWidth < 640 ? 9 : 15;
  const semboller = ["❤️", "💗", "💕", "💖"];

  for (let i = 0; i < kalpAdedi; i += 1) {
    const kalp = document.createElement("span");
    kalp.className = "yuzen-kalp";
    kalp.textContent = semboller[i % semboller.length];
    kalp.style.left = `${(Math.random() * 96).toFixed(1)}%`;
    kalp.style.fontSize = `${Math.round(10 + Math.random() * 15)}px`;
    kalp.style.setProperty("--sure", `${(15 + Math.random() * 18).toFixed(1)}s`);
    kalp.style.setProperty("--gecikme", `${(-Math.random() * 24).toFixed(1)}s`);
    kalp.style.setProperty("--op", `${(0.22 + Math.random() * 0.3).toFixed(2)}`);
    arkaPlan.appendChild(kalp);
  }

  for (let i = 0; i < 7; i += 1) {
    const parilti = document.createElement("span");
    parilti.className = "parilti";
    parilti.style.left = `${(Math.random() * 96).toFixed(1)}%`;
    parilti.style.top = `${(Math.random() * 92).toFixed(1)}%`;
    parilti.style.setProperty("--sure", `${(3 + Math.random() * 3).toFixed(1)}s`);
    parilti.style.setProperty("--gecikme", `${(Math.random() * 4).toFixed(1)}s`);
    arkaPlan.appendChild(parilti);
  }
}

hareketSorgu.addEventListener("change", (olay) => {
  hareketAzalt = olay.matches;
  arkaPlaniOlustur();
});

/* =========================================================
   11) BAŞLATMA
   ========================================================= */

function baslat() {
  gorselHatasiIzle(sec("#heroGif"), sec("#heroMedya"));
  arkaPlaniOlustur();
  albumleriOlustur();
}

baslat();
