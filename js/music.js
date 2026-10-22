"use strict";

(() => {
  const muzik = document.getElementById("arkaPlanMuzigi");
  const dugme = document.getElementById("muzikDugmesi");
  if (!muzik || !dugme) return;

  let kullaniciDuraklatti = false;
  let dosyaHatasi = false;

  // Döngü ve autoplay hem HTML'de hem JavaScript'te tanımlı.
  // Tarayıcı sesli otomatik oynatmaya izin verirse sayfa açılır açılmaz başlar.
  muzik.loop = true;
  muzik.autoplay = true;
  muzik.preload = "auto";

  function dugmeyiGuncelle() {
    const caliyor = !muzik.paused && !muzik.ended;
    dugme.textContent = dosyaHatasi
      ? "♫ Müzik yüklenemedi"
      : caliyor ? "Ⅱ Müziği durdur" : "♫ Müziği başlat";
    dugme.setAttribute("aria-pressed", String(caliyor));
    dugme.title = dosyaHatasi
      ? "assets/music/wanna-be-yours.mp3 dosyasını kontrol et"
      : caliyor ? "Müziği durdur" : "Müziği başlat";
  }

  function calmayaCalis() {
    // Kullanıcı bilerek durdurduysa aynı ziyarette tekrar kendiliğinden başlatma.
    if (kullaniciDuraklatti || dosyaHatasi || !muzik.paused) return;

    try {
      const sonuc = muzik.play();
      if (sonuc && typeof sonuc.catch === "function") {
        sonuc.catch(() => {
          // NotAllowedError: tarayıcı henüz sesli autoplay'e izin vermedi.
          // Bu durumda kullanıcıya çalışır bir başlatma düğmesi sun.
          dugmeyiGuncelle();
        });
      }
    } catch {
      dugmeyiGuncelle();
    }

    dugmeyiGuncelle();
  }

  dugme.addEventListener("click", () => {
    if (!muzik.paused) {
      kullaniciDuraklatti = true;
      muzik.pause();
    } else {
      kullaniciDuraklatti = false;
      calmayaCalis();
    }
    dugmeyiGuncelle();
  });

  muzik.addEventListener("play", dugmeyiGuncelle);
  muzik.addEventListener("playing", dugmeyiGuncelle);
  muzik.addEventListener("pause", dugmeyiGuncelle);
  muzik.addEventListener("ended", dugmeyiGuncelle);
  muzik.addEventListener("error", () => {
    dosyaHatasi = true;
    dugmeyiGuncelle();
  }, true);

  // Autoplay engellenirse sayfadaki ilk dokunuş/klavye etkileşimini kullan.
  // Müzik düğmesindeki olayları ayrıca ele al: iki kez tetiklenip
  // anında duraklatma gibi bir yan etki oluşmasın.
  function etkilesimdeBaslat(olay) {
    if (olay.target instanceof Element && olay.target.closest("#muzikDugmesi")) return;
    calmayaCalis();
  }

  document.addEventListener("pointerdown", etkilesimdeBaslat, { capture: true });
  document.addEventListener("touchstart", etkilesimdeBaslat, { capture: true, passive: true });
  document.addEventListener("keydown", (olay) => {
    if (olay.target === dugme || ["Tab", "Shift", "Control", "Alt", "Meta"].includes(olay.key)) return;
    calmayaCalis();
  }, { capture: true });

  window.addEventListener("pageshow", calmayaCalis);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) calmayaCalis();
  });

  // Sayfanın ilk yüklenmesinde izin varsa ses hemen başlar.
  calmayaCalis();
  dugmeyiGuncelle();
})();
