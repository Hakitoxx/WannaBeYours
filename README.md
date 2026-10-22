# 💗 WannaBeYours — Romantik Sürpriz Sitesi (V2)

Orijinal sitenin soru → hediye kutuları → sürpriz akışını koruyan mobil uyumlu revizyon. HTML/CSS/Vanilla JS; framework veya kurulum gerektirmez.

## 🎁 Hediyeler
Dört hediye var: **fotoğraf galerisi**, açılır **mektup**, tek tek çevrilen **sevgi notları**, seçilebilir **aktivite kuponları**. Fotoğraf yalnızca ilk kutuda kullanılır.

Metinleri değiştirmek için: \`js/script.js\` dosyasının üstündeki \`mektupSatirlari\`, \`sevgiNotlari\` ve \`surprizKuponlar\` dizilerini düzenle. Hediye başlıkları \`hediyeler\` dizisindedir.

## 📸 Fotoğraf ekleme
Fotoğraflarını \`assets/photos/album-1/\` içine \`foto1.jpg\`, \`foto2.jpg\` ... adlarıyla koy. Farklı isim veya sayılar için \`js/script.js\` dosyasındaki \`albums[0].photos\` listesini değiştir. Eksik fotoğraflar için kırık resim yerine yer tutucu gösterilir. Eskiden kullanılan album-2/album-3 klasörleri geriye uyumluluk amacıyla korunmuştur.

## 🐱 Girişteki kediler
Girişte birbirine sarılan iki çizim kedinin Tenor üzerinden alınan GIF'i kullanılır. Kaynak: https://tenor.com/view/peach-cat-hug-hug-up-love-mochi-mochi-peach-cat-gif-16334628. İnternet erişimi veya GIF engeli halinde **özgün animasyonlu** \`assets/gifs/hugging-cats.svg\` gösterilir. GIF'i yerel olarak kullanma hakkın varsa \`assets/gifs/hero.gif\` dosyasını ekleyip \`index.html\` içindeki \`heroGif\` yolunu buna çevirebilirsin.

## 🎵 Müzik
\`assets/music/README.md\` dosyasındaki notları izle. Uygun haklara sahip olduğun \`wanna-be-yours.mp3\` dosyasını \`assets/music/\` klasörüne kendin koyman gerekir; şarkı dosyası telif nedeniyle repoya dahil edilmedi. Dosya varsa ses döngüde çalar, tarayıcı izin verdiği anda otomatik başlatma denenir. Mobil tarayıcılar sesli otomatik oynatmayı engelleyebilir; bu durumda müzik butonu veya ilk etkileşim gerekir.

## 🖥️ Çalıştırma / yayın
\`index.html\` dosyasını tarayıcıyla aç veya Live Server kullan. GitHub Pages: Settings → Pages → Deploy from a branch, main / root. Değişiklikler PR üzerinden main'e alındıktan sonra yayımlanır.

## ✅ V2 iyileştirmeleri
- Hayır butonu 7 tıklamada kademeli küçülüp kaybolur; Evet tek başına ortada kalır.
- Evet butonu artık transform ile çevresindeki metinlerin üstüne taşmaz; gerçek font ve padding ölçüleriyle büyür.
- Mobil, tablet ve masaüstü için hediye gridleri, azaltılmış hareket tercihi ve klavye kullanılabilirliği.
- Eksik fotoğraf fallback sırası ve kedi animasyonu alternatifleri.
