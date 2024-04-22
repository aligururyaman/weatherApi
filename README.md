# iWeather React Staj Mülakat Projesi
## Ali Gurur Yaman



Projede kullanılan teknolojiler.


- "expo": "^50.0.17"
- "react-redux": "^9.1.0"
- "axios": "^1.6.8"
- "react-native-maps": "^1.10.0"
- "expo-location": "~16.5.5"

# Start

```sh
npm start
```

# Uygulama Resimleri ve Bilgiler

### İlk giriş ekranında bir TextInput ve bir Buton var. TextInput'un yanındaki Location iconuna tıkladığımızda konum bilgisine göre işlem yapıyor. Buton a tıkladığımızda daha önce kaydettiğimiz şehirlerin olduğu sayfaya gidiyor.



![](https://lh3.googleusercontent.com/pw/AP1GczNyiaQSUPOXr9nqvSMeZm1mg3Ft1UoclSpIJfl4mCI2JwFCcl_DFau1uUlA-NNJy81mYfjfYVzUm54hqUG2TFjwSWUOjxs63rH5Aoj7pXyqCB1p7IyOIVNqV1bZtODRDiKF4e1SggHTW2ckNhrZ8n6J=w403-h873-s-no-gm?authuser=0)



### İlk girişte inputTextBox a veri girildiği zaman sadece Türkiye'de bulunan şehirlerin önerisi geliyor. Tüm dünya yapacaktım APİ yi kuracak Ücretsiz bir sistem bulamadım. Bulduğum bir data içinde 1,5 milyon şehir vardı programı sıkıntıya sokuyordu... kendim sadece Türkiyedeki şehirleri öneri olarak sundum.



![](https://lh3.googleusercontent.com/pw/AP1GczNzdmqhKD2HI5WpMwCQy6AvEuljX2Y9a5mlXlWAx4-10WcjLsELVprqdyyr-Z2rdt966h6iTjDAA6q2Ym96_JKt0HVMdpFBU-YyHC2ToUJC2EQeP4YaeTVfqawTDgZtcOHLF0eEB_qM8NzXVpCTVRf7=w403-h873-s-no-gm?authuser=0)



### Bu resim ile bir önceki aynı sayılır sadece Loading Spinneri çok güzel yaptım diye göstermek istedim. Çok uyumlu duruyor.Klavye rengini temaya uygun hale getirdim.



![](https://lh3.googleusercontent.com/pw/AP1GczNbnYhIZNGZINSt9kVvXRRAoZ-iZ7JxcJgqGg-Uyh9CNvyD0BWDM5Qko_jLpH7yqmDaGFiwQ9CAtgfjEh8MTI4tPIEArwHYFK_rOOWD5CD21GD8BLU2H-8aTQ2LBl17eYdTv-dSIXD3EpSYKy-3nfjc=w403-h873-s-no-gm?authuser=0)



### Aranan Şehrin Bilgileri



![](https://lh3.googleusercontent.com/pw/AP1GczNJQGVHnAbblceILQUjIsUTUPKV_mPXjg7uuiLgxnAnGhh0YJ4mwjsOXVs8dOYwL_TJpQhjiMfjS5IQIXjNTSWxFt0w-fzcJ9R_SNd79ILWr8Sa1JGLWdFvmpnM-Agt8HSx2m2YjWOaAZS1ujYw37GF=w403-h873-s-no-gm?authuser=0)
![](https://lh3.googleusercontent.com/pw/AP1GczPxyyQAOBg6qTkeDDYWWgdzraGiiPXP7fBN2MlKM8zx68Db5-mKmErOUsDPYH8tI742F3J82TJCBypkq8-cXHc_xJOisQSAvZrdFUgARytSLpNkKXvn5ADN5RO-MiPdojGL6TUHzIHMcCl_zvIhMCN7=w403-h873-s-no-gm?authuser=0)



### Bu bölümde Verisi girilen şehire ait bütün bilgiler bulunuyor.


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

  - Rüzgar Kısmı
    + Sol kısımda rüzgarın hızı ve rüzgarın derecesi belirtiliyor
    + Sağ kısımda Rüzgarın hangi yönde estiğini belirtiyor. Kırmızı ok dereceye göre yön değiştiriyor.
   
  - Gün Doğum ve Batımı Kısmı
    + Güneşin Türkiye saatine göre hangi saat doğduğunu ve hangi saat battığını gösteriyor
   
  - Hava Kirliliği Kısmı
    + Sol kısımda  havadaki değerler üzerinden havanın nasıl olduğu bilgisi veriliyor
    + Sağ kısımda toplam verilerle ortaya çıkan sonucun havaya olan etkisini gösteriyor
   
    
   
## Kayıtlar Kısmı


![](https://lh3.googleusercontent.com/pw/AP1GczOCus1sHlbc2T1ltQI-ReksPSwpMJb8vkR1IKCj0l_FMWZfU7idvbWvhU1J8mJ7Jz6XMpSAP8GT1rduUXlb6tLN_kIT3vqCNwwBQbi3JffwvHKXaskUTZ6AyXuVKx-ppswrcKrCei5Uwa62pY9MehxE=w403-h873-s-no-gm?authuser=0)

- Bu Sayfa kendi yaptığım bir bölüm burada kaydedilmiş şehirler alt alta listeleniyor. Kaydedilmiş şehirler Local olarak kaydedildiği için sürekliliği korunuyor.
  +  Şehre tıkladığımızda hangi şehre tıklanırsa o şehrin bilgilerine gidiyoruz
  +  Çöp Butonuna basıldığında o şehri siliyor
