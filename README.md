# iWeather React Staj Mülakat Projesi
## Ali Gurur Yaman



Projede kullanılan teknolojiler.

- React/Redux
- Axios
- React Navigation
- React Native Responsive Screen

# Start

```sh
npm start
```

#Uygulama Resimleri ve Bilgiler

- İlk girişte karşımıza sadece input ve bir adet buton geliyor. input şehir aramamızı sağlıyor uygulamanın alt bölümündeki Simge tıklanabilir durumda eğer ona tıklarsak bizi daha önce kaydedilmiş şehirler sayfasına yönlendiriyor.

![](https://lh3.googleusercontent.com/pw/AP1GczPz45lVVtSAduqQIxZIGoJlt8QmzXvq-JgBCzAIUrAGEWbFXoYRGmlZ_aesiyEpkGQCpVYfNVtGijsS9McqBlrGaSPeZuCsbSZCf71Tuzapy7yZ2pxrBdU8qE44-woQR5p2xgOLQi29U8954MTJY-6k=w403-h873-s-no-gm?authuser=0)

- İlk girişte inputTextBox a veri girildiği zaman sadece Türkiye'de bulunan şehirlerin önerisi FlatList kullanılarak geliyor. Tüm dünya yapacaktım APİ yi kuracak Ücretsiz bir sistem bulamadım. Bulduğum bir data içinde 1,5 milyon şehir vardı programı sıkıntıya sokuyordu... kendim sadece Türkiyedeki şehirleri öneri olarak sundum.

![](https://lh3.googleusercontent.com/pw/AP1GczPvKIvFkDGCVF_q2toE2RzS7uPi5f2e2dfx8fjHd4_SVeVOAUHgLXDyRx004PITM3n-DXu00DDQvOBMQUUcoQ3Y0SACTa4R-kJKKjO2IkxfXWC5FH-W3iKNLJz1CIYkI2NuKgu3vu2xIT_0xdxM_yhy=w403-h873-s-no-gm?authuser=0)

- Bu resim ile bir önceki aynı sayılır sadece Loading Spinneri çok güzel yaptım diye göstermek istedim. Çok uyumlu duruyor.

![](https://lh3.googleusercontent.com/pw/AP1GczP27haboRtySfMGbRqNW39XJ6o-oYl3xVpmToMrcKrXlBvmeNQ5YxJpPcDUlPTNaD7NS0-fqchkeESX2YJ67z2ZYulJWtA3aeKvHg4LlTPiYyBPjP-wL4gx57zPKUJ0iuc-eQ_vUFHLS2xnInbbM7ph=w403-h873-s-no-gm?authuser=0)

- Bu bölümde Verisi girilen şehire ait bütün bilgiler bulunuyor.

- Header Kısmı
  + Girilen şehir ismi.
  + Girilen şehri kaydetmek için bir buton (+).
  + Anasayfaya dönmek için bir buton.
  + Yine kayıtlı şehirlere giden bir buton.
  + Gün/Ay/Yıl bilgisi
  + Anlık Sıcaklık bilgisi
  + O Gün olacak max ve min sıcaklık bilgisi
  + havanın durumu
  + Arka Plan ve İcon hava durumunun o anki haline göre değişiyor Örnek olara
    - Eğer hava açık ise arka plan Açık Mavi renk ve icon sadece güneş şeklinde beliriyor
    - Gece ve Gündür ayrımı yapabiliyor gece ise koyu gündüz ise açık tema, Ay ve Güneş kullanımları ile bilgilendirme sağlıyor.

- Orta Kısım
  + Burda küçük iconlarla görsel güzelleştirmeler sağlanıyor
  + FlatList kullanılarak yukarıdan aşağıya doğru sicaklık, rüzgr hızı vb bilgiler veriliyor
    - Yağmur oranı ve UV index hakkındaki bilgiye Api JSON'da ulaşamadım o yüzden oraları dolduramadım

 - Bottom Kısmı
   + Burada Yana doğru FlatList kullandım
     - Yana Doğru Flat kullanmamın sebebi görsel güzellik ve kullanışlı olması kaydırdığınızda günler değişiyor.
     - Süreklü FlatList kullanmamın nedeni FlatList kullanımını iyice öğrenmek
   + Üst kısımda hangi gün olduğunu göremiyoruz
   + O gün havanın nasıl olacağını gösteren bir icon ile Uİ geliştiriliyor
   + Gündüz ve Gecenin nasıl olacağını gösteren dereceler mevcut
   
![](https://lh3.googleusercontent.com/pw/AP1GczPGrU86Kf-PWobiliNqlv-VzdNuBl-on4Tnz1Bom5H0tnp-hJXQh7i_GN4XBEjancuoSxPYlGz1ZXsdS034N4VGoqGFtfjs0_0fEdEpxIrQlRBfiUJTgpZfcD8_EVh_R3hmkq3ChpBoxdt-Nrwi8hCJ=w403-h873-s-no-gm?authuser=0)

- Bu Sayfa kendi yaptığım bir bölüm burada kaydedilmiş şehirler alt alta listeleniyor tabiki yine FlatList kullanıldı. Geri butonuyla geri gidiyoruz.
  +  Şehre tıkladığımızda hangi şehre tıklanırsa o şehrin bilgilerine gidiyoruz
  +  x Tuşuna basıldığında o şehri siliyor
