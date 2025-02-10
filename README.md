<div align="center">
  <a href="https://github.com/ionic-team/capacitor-filesystem">
    <img src=".github/assets/logo.png" alt="Logo" width="auto" height="100">
  </a>

<h3 align="center"> @capacitor/filesystem</h3>

  <p align="center">
    The Filesystem API provides a NodeJS-like API for working with files on the device.
    <br />
    <a href="https://github.com/ionic-team/cordova-outsystems-file">🔌 Cordova Plugin</a>
    ·
    <a href="https://github.com/ionic-team/ion-android-filesystem">🤖 Android Library</a>
    ·
    <a href="https://github.com/ionic-team/ion-ios-filesystem">🍏 iOS Library</a>
  </p>
  <p align="center">
    <a href="https://github.com/ionic-team/capacitor-filesystem/issues/new?labels=bug&template=bug-report.md">🐛 Report Bug</a>
    ·
    <a href="https://github.com/ionic-team/capacitor-filesystem/issues/new?labels=enhancement&template=feature-request.md">   💡 Request Feature</a>
  </p>
</div>

## Install

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple Privacy Manifest Requirements

Apple mandates that app developers now specify approved reasons for API usage to enhance user privacy. By May 1st, 2024, it's required to include these reasons when submitting apps to the App Store Connect.

When using this specific plugin in your app, you must create a `PrivacyInfo.xcprivacy` file in `/ios/App` or use the VS Code Extension to generate it, specifying the usage reasons.

For detailed steps on how to do this, please see the [Capacitor Docs](https://capacitorjs.com/docs/ios/privacy-manifest).

**For this plugin, the required dictionary key is [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393) and the recommended reason is [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393).**

### Example PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- Add this dict entry to the array if the PrivacyInfo file already exists -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>C617.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## iOS

To have files appear in the Files app, you must also set the following keys to `YES` in `Info.plist`:

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

## Android

If using <a href="#directory">`Directory.Documents`</a> or <a href="#directory">`Directory.ExternalStorage`</a>, in Android 10 and older, this API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

Note that <a href="#directory">`Directory.ExternalStorage`</a> is only available on Android 9 or older and <a href="#directory">`Directory.Documents`</a> only allows to access the files/folders created by your app on Android on Android 11 and newer.

Working with large files may require you to add `android:largeHeap="true"` to the `<application>` tag in `AndroidManifest.xml`.

## Understanding Directories and Files

iOS and Android have additional layers of separation between files, such as special directories that are backed up to the Cloud, or ones for storing Documents. The Filesystem API offers a simple way to scope each operation to a specific special directory on the device.

Additionally, the Filesystem API supports using full `file://` paths, or reading `content://` files on Android. Simply leave out the `directory` param to use a full file path.

## Example

```typescript
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: "secrets/text.txt",
    data: "This is a test",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log("secrets:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
};
```

## API

<docgen-index>

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

</docgen-api>

### Errors

The plugin returns specific errors with specific codes on native Android and iOS. Web does not follow this standard for errors.

The following table list all the plugin errors:

| Error code        | Platform(s)  | Message                   |
| ----------------- | ------------ | ------------------------- |
| OS-PLUG-FILE-0001 | Android, iOS | Example of error message. |
