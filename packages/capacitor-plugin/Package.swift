// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "FilesystemCapacitor",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "FilesystemCapacitor",
            targets: ["FilesystemPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "7.1.0")
    ],
    targets: [
        .binaryTarget(
            name: "IONFilesystemLib",
            // url: "https://github.com/ionic-team/ion-ios-filesystem/releases/download/1.0.0/IONFilesystemLib.zip",
            // checksum: "<compute_checksum>" // sha-256
            path: "./ios/Sources/FilesystemPlugin/IONFilesystemLib.xcframework"
        ),
        .target(
            name: "FilesystemPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                "IONFilesystemLib"
            ],
            path: "ios/Sources/FilesystemPlugin"),
        .testTarget(
            name: "FilesystemPluginTests",
            dependencies: ["FilesystemPlugin"],
            path: "ios/Tests/FilesystemPluginTests")
    ]
)
