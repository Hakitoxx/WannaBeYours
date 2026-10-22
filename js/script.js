"use strict";

/* =========================================================
   1) HEDİYELER VE KİŞİSELLEŞTİRME
   Yalnızca bir hediye fotoğraf albümüdür.
   ========================================================= */

const albums = [
  {
    id: "album-1",
    title: "Bizim Fotoğraflarımız 📸",
    description: "Birlikte saklamak istediğimiz anılar.",
    cover: "assets/gifs/album-1.gif",
    emoji: "📸",
    photos: [
      "assets/photos/album-1/foto1.jpg",
      "assets/photos/album-1/foto2.jpg",
      "assets/photos/album-1/foto3.jpg",
      "assets/photos/album-1/foto4.jpg",
      "assets/photos/album-1/foto5.jpg",
      "assets/photos/album-1/foto6.jpg"
    ]
  }
];

const hediyeler = [
  { id:"fotograflar", tur:"photos", title:"Bizim Fotoğraflarımız 📸", description:"En güzel karelerimizi sakladığım kutu.", emoji:"📸", cover:"assets/gifs/album-1.gif" },
  { id:"mektup", tur:"letter", title:"Sana Bir Mektubum Var 💌", description:"Açılmayı bekleyen küçük bir zarf.", emoji:"💌" },
  { id:"notlar", tur:"notes", title:"Sende Sevdiğim Şeyler 💖", description:"Dokun, her kartta bir gülümseme bul.", emoji:"💖" },
  { id:"kuponlar", tur:"coupons", title:"Birlikte Yapılacaklar 🎟️", description:"Minik planlar, güzel anılar.", emoji:"🎟️" }
];

/* Bu metinleri kendi ilişkinize göre değiştirebilirsiniz. */
const mektupSatirlari = [
  "Bazen en güzel şeyler, en beklemediğimiz anlarda karşımıza çıkar.",
  "Seninle konuşmak, gülmek ve küçük anıları biriktirmek günleri daha özel kılıyor.",
  "Bu sayfa, birlikte yaşayacağımız güzel anılara küçük bir hatıra olsun. 💗"
];

const sevgiNotlari = [
  "Gülüşün günümü güzelleştiriyor. ☀️",
  "En sıradan anları bile eğlenceli yapıyorsun. ✨",
  "Birlikte gülebilmek çok güzel. 🧸",
  "Sana anlatacak yeni şeyler bulmak hoşuma gidiyor. 🌷",
  "Küçük sürprizlerin hep çok özel. 🎀",
  "İyi ki yollarımız kesişmiş. 💕"
];

const surprizKuponlar = [
  { emoji:"🍿", title:"Film Gecesi", description:"Birlikte bir film seçip sevdiğimiz atıştırmalıkları hazırlayalım." },
  { emoji:"🍦", title:"Dondurma Molası", description:"Sevdiğimiz dondurmayı seçip birlikte biraz gezelim." },
  { emoji:"🎮", title:"Oyun Saati", description:"Birlikte oyun oynayıp eğlenceli bir mini turnuva yapalım." },
  { emoji:"🌸", title:"Sürpriz Gün", description:"Küçük bir sürpriz planlayıp yeni bir anı biriktirelim." }
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
  const hata = () => {
    // Harici kedi GIF'i açılmazsa kendi çizimimiz yerel olarak çalışır.
    if (img.id === "heroGif" && !img.dataset.yedekDenendi) {
      img.dataset.yedekDenendi = "1";
      img.src = "assets/gifs/hugging-cats.svg";
      return;
    }
    kap.classList.add(sinif);
  };
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
const HAYIR_SINIRI = 7;

function olcekleriUygula() {
  const kademe = Math.min(hayirSayisi, HAYIR_SINIRI);
  // font-size / padding akışa dahildir: başlığın veya mesajın üstüne çıkmaz.
  evetBtn.style.setProperty("--e-font", (1.02 + kademe * 0.085).toFixed(3) + "rem");
  evetBtn.style.setProperty("--e-pad-y", (14 + kademe * 2) + "px");
  evetBtn.style.setProperty("--e-pad-x", (30 + kademe * 4) + "px");
  hayirBtn.style.setProperty("--h-o", Math.max(0.28, 1 - kademe * 0.11).toFixed(2));
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
  if (hayirSayisi >= HAYIR_SINIRI) return;
  hayirSayisi += 1;
  olcekleriUygula();

  if (hayirSayisi >= HAYIR_SINIRI) {
    hayirBtn.hidden = true;
    hayirBtn.disabled = true;
    butonAlani.classList.add("yalniz-evet");
    mesajEl.textContent = "Artık sadece Evet kaldı! 💗";
    nabizEkle();
  } else {
    salla(hayirBtn);
    nabizEkle();
    mesajGuncelle();
  }

  const kutu = hayirBtn.hidden ? evetBtn.getBoundingClientRect() : hayirBtn.getBoundingClientRect();
  kalpPatlamasi(kutu.left + kutu.width / 2, kutu.top + kutu.height / 2, 8, ["💗", "💕", "🙈"]);
});

evetBtn.addEventListener("click", () => {
  const kutu = evetBtn.getBoundingClientRect();
  kalpPatlamasi(kutu.left + kutu.width / 2, kutu.top + kutu.height / 2, 20);
  window.setTimeout(() => ekranDegistir("albumEkrani"), hareketAzalt ? 0 : 260);
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
  albumIzgara.replaceChildren();

  hediyeler.forEach((hediye) => {
    const kart = document.createElement("article");
    kart.className = "album-kart";

    const kapak = document.createElement("div");
    kapak.className = "album-kapak";
    if (hediye.cover) {
      const resim = document.createElement("img");
      resim.src = hediye.cover;
      resim.alt = "";
      resim.loading = "lazy";
      const yedek = document.createElement("span");
      yedek.className = "kapak-yedek";
      yedek.setAttribute("aria-hidden", "true");
      yedek.textContent = hediye.emoji;
      kapak.append(resim, yedek);
      gorselHatasiIzle(resim, kapak);
    } else {
      const ikon = document.createElement("span");
      ikon.className = "hediye-emoji";
      ikon.setAttribute("aria-hidden", "true");
      ikon.textContent = hediye.emoji;
      kapak.appendChild(ikon);
    }

    const baslik = document.createElement("h3");
    baslik.className = "album-ad";
    baslik.textContent = hediye.title;

    const aciklama = document.createElement("p");
    aciklama.className = "album-aciklama";
    aciklama.textContent = hediye.description;

    const ac = document.createElement("button");
    ac.type = "button";
    ac.className = "btn btn-album";
    ac.textContent = "Hediyeyi Aç";
    ac.addEventListener("click", () => hediyeAc(hediye));

    kart.append(kapak, baslik, aciklama, ac);
    albumIzgara.appendChild(kart);
  });
}

function hediyeAc(hediye) {
  if (hediye.tur === "photos") {
    galeriAc(albums[0]);
    return;
  }

  sec("#hediyeBaslik").textContent = hediye.title;
  const icerik = sec("#hediyeIcerik");
  icerik.replaceChildren();

  const aciklama = document.createElement("p");
  aciklama.className = "hediye-intro";
  aciklama.textContent = hediye.description;
  icerik.appendChild(aciklama);

  if (hediye.tur === "letter") mektubuOlustur(icerik);
  if (hediye.tur === "notes") notlariOlustur(icerik);
  if (hediye.tur === "coupons") kuponlariOlustur(icerik);
  ekranDegistir("hediyeEkrani");
}

function mektubuOlustur(icerik) {
  const zarf = document.createElement("button");
  zarf.type = "button";
  zarf.className = "mektup-zarfi";
  zarf.setAttribute("aria-expanded", "false");
  zarf.setAttribute("aria-controls", "mektupKagidi");
  const ikon = document.createElement("span");
  ikon.className = "zarf-ikon";
  ikon.textContent = "💌";
  ikon.setAttribute("aria-hidden", "true");
  const etiket = document.createElement("span");
  etiket.textContent = "Mektubu açmak için dokun";
  zarf.append(ikon, etiket);

  const kagit = document.createElement("article");
  kagit.id = "mektupKagidi";
  kagit.className = "mektup-kagidi";
  kagit.hidden = true;

  mektupSatirlari.forEach((satir) => {
    const p = document.createElement("p");
    p.textContent = satir;
    kagit.appendChild(p);
  });
  const imza = document.createElement("p");
  imza.className = "mektup-imza";
  imza.textContent = "Sevgiyle... 💗";
  kagit.appendChild(imza);

  zarf.addEventListener("click", () => {
    kagit.hidden = !kagit.hidden;
    const acik = !kagit.hidden;
    zarf.setAttribute("aria-expanded", String(acik));
    etiket.textContent = acik ? "Mektubu kapat" : "Mektubu açmak için dokun";
    ikon.textContent = acik ? "💝" : "💌";
  });
  icerik.append(zarf, kagit);
}

function notlariOlustur(icerik) {
  const izgara = document.createElement("div");
  izgara.className = "not-izgara";
  sevgiNotlari.forEach((metin, index) => {
    const kart = document.createElement("button");
    kart.type = "button";
    kart.className = "not-karti";
    kart.setAttribute("aria-expanded", "false");
    kart.textContent = "💗 " + (index + 1) + ". notu aç";
    kart.addEventListener("click", () => {
      const acik = kart.classList.toggle("acik");
      kart.setAttribute("aria-expanded", String(acik));
      kart.textContent = acik ? metin : "💗 " + (index + 1) + ". notu aç";
    });
    izgara.appendChild(kart);
  });
  icerik.appendChild(izgara);
}

function kuponlariOlustur(icerik) {
  const izgara = document.createElement("div");
  izgara.className = "kupon-izgara";

  surprizKuponlar.forEach((kupon) => {
    const kart = document.createElement("button");
    kart.type = "button";
    kart.className = "kupon-karti";
    kart.setAttribute("aria-pressed", "false");

    const ikon = document.createElement("span");
    ikon.className = "kupon-ikon";
    ikon.textContent = kupon.emoji;
    ikon.setAttribute("aria-hidden", "true");

    const baslik = document.createElement("span");
    baslik.textContent = kupon.title;

    const detay = document.createElement("span");
    detay.className = "kupon-detay";
    detay.textContent = kupon.description;

    const durum = document.createElement("span");
    durum.className = "kupon-durum";
    durum.textContent = "Seçmek için dokun";
    kart.append(ikon, baslik, detay, durum);

    kart.addEventListener("click", () => {
      const secildi = kart.classList.toggle("secilmis");
      kart.setAttribute("aria-pressed", String(secildi));
      durum.textContent = secildi ? "Seçildi ✓ Tekrar dokunarak kaldır" : "Seçmek için dokun";
    });
    izgara.appendChild(kart);
  });
  icerik.appendChild(izgara);
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
    kutu.appendChild(img);
    if (img.complete && img.naturalWidth === 0) yedekGoster(kutu, yol);

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
sec("#hediyelereDonBtn").addEventListener("click", () => ekranDegistir("albumEkrani"));

/* =========================================================
   10) ARKA PLAN DEKORU (yüzen kalpler + parıltılar)
   ========================================================= */

const arkaPlan = sec("#arkaPlan");
const hareketSorgu = window.matchMedia("(prefers-reduced-motion: reduce)");

function arkaPlaniOlustur() {
  arkaPlan.innerHTML = "";
  if (hareketAzalt) return;

  const kalpAdedi = window.innerWidth < 640 ? 9 : 15;
  const semboller = ["❤️", "💗", "💕", "💖", "🌸", "🦋", "✨", "🎀", "💝", "🌷"];

  for (let i = 0; i < kalpAdedi; i += 1) {
    const kalp = document.createElement("span");
    kalp.className = "yuzen-kalp";
    kalp.textContent = semboller[i % semboller.length];
    kalp.style.left = `${(Math.random() * 96).toFixed(1)}%`;
    kalp.style.fontSize = `${Math.round(11 + Math.random() * 15)}px`;
    kalp.style.setProperty("--bulanik", `${(Math.random() * 1.1).toFixed(1)}px`);
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
