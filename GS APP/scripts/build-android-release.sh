#!/bin/sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
KEY_ALIAS=gruas-sabino-upload
KEYCHAIN_SERVICE=cl.gruasabino.app.android-upload
KEYSTORE_PATH="$PROJECT_ROOT/android/app/release-upload.jks"

if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "Android upload keystore was not found: $KEYSTORE_PATH" >&2
    exit 1
fi

if ! command -v security >/dev/null 2>&1; then
    echo "macOS Keychain access is required to retrieve the Android signing password." >&2
    exit 1
fi

if ! ANDROID_KEYSTORE_PASSWORD=$(security find-generic-password \
    -a "$KEY_ALIAS" -s "$KEYCHAIN_SERVICE" -w 2>/dev/null); then
    echo "Signing password is missing from the macOS login Keychain." >&2
    exit 1
fi

export ANDROID_KEYSTORE_PATH="$KEYSTORE_PATH"
export ANDROID_KEYSTORE_PASSWORD
export ANDROID_KEY_ALIAS="$KEY_ALIAS"
export ANDROID_KEY_PASSWORD="$ANDROID_KEYSTORE_PASSWORD"

if [ -z "${JAVA_HOME:-}" ] && [ -d /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home ]; then
    export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
fi

if [ -z "${ANDROID_HOME:-}" ] && [ -d "$HOME/Library/Android/sdk" ]; then
    export ANDROID_HOME="$HOME/Library/Android/sdk"
fi

export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"

npm --prefix "$PROJECT_ROOT" run sync
cd "$PROJECT_ROOT/android"
./gradlew --no-daemon assembleRelease bundleRelease
