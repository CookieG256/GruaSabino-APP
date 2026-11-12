# Grúas Sabino — aplicativo Capacitor

O app usa HTML estático com CSS e fontes locais. `www/` é gerado pelo processo de build e é copiado para as plataformas Capacitor.

## Desenvolvimento

```sh
npm ci
npm run sync
```

Abra `android/` no Android Studio ou `ios/App/App.xcodeproj` no Xcode. Android requer Java e Android SDK; iOS requer Xcode e assinatura Apple para instalar em aparelho ou publicar.

## Android

- APK de teste: `android/app/build/outputs/apk/debug/app-debug.apk`
- APK/AAB de lançamento: gere localmente com `npm run release:android`, após configurar a chave de assinatura local.
- A chave local `private/release-upload.jks`, as senhas e os certificados privados nunca devem ser enviados ao Git.
- Para futuras atualizações, mantenha a mesma chave de lançamento. Guarde uma cópia segura fora do computador.

O APK é um app público para usuários finais. Todo conteúdo incluído no app pode ser extraído ou visto por quem o instala.
