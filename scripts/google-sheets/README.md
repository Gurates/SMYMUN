# Apps Script'e yapıştırılacak kod

Bu klasördeki **`Code.gs`**, başvuruları ve şarkı isteklerini Google Sheets'e kaydeden tam script'tir. Kopyalanmaya hazırdır; herhangi bir konferansa ait URL, secret veya Sheet kimliği içermez.

1. Apps Script editöründeki `Kod.gs` / `Code.gs` dosyasını açın. Varsayılan `function myFunction() { ... }` kodunu tamamen silin.
2. Bu klasördeki **`Code.gs` dosyasının tamamını** o alana yapıştırıp kaydedin. `receiver-template.gs` dosyasını tek başına yapıştırmayın; gerekli alan tanımlarını içeren dosya `Code.gs`'dir.
3. Proje ayarlarının Script Properties bölümüne aşağıdaki değerleri ekleyin:

   | Özellik | Değer |
   | --- | --- |
   | `SPREADSHEET_ID` | Sheet adresindeki `/d/` ile `/edit` arasındaki kimlik |
   | `APPLICATIONS_WEBHOOK_SECRET` | Kendinizin oluşturduğu, en az 32 karakterlik rastgele gizli değer |
   | `TIMEZONE` | İsteğe bağlı; örneğin `Europe/Istanbul`. Boşsa UTC kullanılır. |

4. Proje ayarlarından manifest dosyasını görünür yapın. Apps Script'teki `appsscript.json` içeriğini bu klasördeki aynı adlı dosyayla değiştirin.
5. Kaydedin; fonksiyon listesinden **`setupSheets`** seçip bir kez çalıştırın ve gereken Google yetkisini verin. Bu işlem başvuru sekmelerini ve başlıklarını oluşturur. `doPost` fonksiyonunu editörden elle çalıştırmayın.
6. Web App olarak dağıtın: kendi hesabınızla çalıştırın ve erişimi Anyone olarak ayarlayın. Dağıtımın `/exec` ile biten URL'sini alın. Sheet'in kendisi özel kalmalıdır.
7. Sitenin `.env` dosyasında ve yayındaki sunucu ortam değişkenlerinde şu iki alanı doldurun:

   ```dotenv
   APPLICATIONS_WEBHOOK_URL=BURAYA_EXEC_ILE_BITEN_WEB_APP_URLSI
   APPLICATIONS_WEBHOOK_SECRET=BURAYA_SCRIPT_PROPERTIES_ILE_AYNI_SECRET
   ```

Siteyi yeniden başlatın; yayındaki ortam değişkenleri için yeniden dağıtım yapın. Formlar artık sunucudaki `/api/applications` üzerinden bu script'e gönderilir.

Form alanlarını değiştirdiğinizde proje kökünde `npm run sheets:build` çalıştırın. Güncellenen `Code.gs` dosyasını tekrar yapıştırıp Web App dağıtımını yeni sürümle güncelleyin. Kalıcı kod değişiklikleri `receiver-template.gs` üzerinde yapılır; `Code.gs` bu şablondan üretilir. `enable-songs.gs` yalnızca eski kurulumlar için bir geçiş dosyasıdır; yeni kurulumda gerekli değildir.
