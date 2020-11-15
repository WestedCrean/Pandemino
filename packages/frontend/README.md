This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instrukcja

Aby moc korzystać MediaDevice API (kamerki/mikrofonu) w streamach, trzeba to robić w bezpiecznym kontekście https.

Lokalnie najlepiej wygenerować własnoręcznie podpisany certyfikat

Następnie trzeba wybrać certyfikat w opcjach przeglądarki: https://javorszky.co.uk/2019/11/06/get-firefox-to-trust-your-self-signed-certificates/

Generowanie certyfikatów przedstawione jest poniżej.

### Windows
1. Uruchom PowerShell jako Administrator i wpisz

```powershell
New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My -DnsName "localhost:3000" -FriendlyName "Pandemino" -NotAfter (Get-Date).AddYears(10)
```

### Linux
1. Pobierz OpenSSL

```bash
sudo apt install openssl
```

2. Wygeneruj certyfikat komendą

```bash
openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out example.crt \
            -keyout example.key \
            -subj "/C=PL/ST=Lublin/L=Lublin/O=Security/OU=IT Department/CN=localhost:3000"
```

### Mac

1. Utwórz certyfikat w Pęku Kluczy (Keychain)

https://support.apple.com/pl-pl/guide/keychain-access/kyca8916/mac