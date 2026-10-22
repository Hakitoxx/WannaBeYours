"use strict";

(() => {
  const muzik = document.getElementById("arkaPlanMuzigi");
  const dugme = document.getElementById("muzikDugmesi");
  if (!muzik || !dugme) return;

  let kullaniciDuraklatti = false;
  let dosyaEksik = false;

  function durumuGuncelle() {
    const caliyor = !muzik.paused && !muzik.ended;
    dugme.textContent = dosyaEksik
      ? "♫ Şarkı dosyasını ekle"
      : (caliyor ? "Ⅱ Müziği durdur" : "♫ Müziği başlat");
    dugme.setAttribute("aria-pressed", String(caliyor));
    dugme.title = dosyaEksik
      ? "assets/music/wanna-be-yours.mp3 dosyasını eklemelisin."
      : (caliyor ? "Müziği durdur" : "Müziği başlat");
  }

  async function oynat() {
    if (dosyaEksik || kullaniciDuraklatti) return;
    try {
      await muzik.play();
    } catch {
      // Sesli otomatik oynatma bazı tarayıcılarda engellenir.
      // Kullanıcı butondan veya sayfadaki ilk etkileşimden başlatabilir.
      durumuGuncelle();
    }
  }

  dugme.addEventListener("click", async () => {
    if (!muzik.paused) {
      kullaniciDuraklatti = true;
      muzik.pause();
    } else {
      kullaniciDuraklatti = false;
      await oynat();
    }
    durumuGuncelle();
  });

  muzik.addEventListener("playing", durumuGuncelle);
  muzik.addEventListener("pause", durumuGuncelle);
  muzik.addEventListener("error", () => {
    dosyaEksik = true;
    durumuGuncelle();
  });

  // Otomatik oynatma mümkünse ilk açılışta başlat.
  // Engellendiyse ilk kullanıcı etkileşimini değerlendir.
  document.addEventListener("pointerdown", (olay) => {
    if (!olay.target.closest("#muzikDugmesi")) oynat();
  }, { once: true });
  document.addEventListener("keydown", (olay) => {
    if (!["Tab", "Shift", "Control", "Alt", "Meta"].includes(olay.key)) oynat();
  }, { once: true });
  oynat();
  durumuGuncelle();
})();
