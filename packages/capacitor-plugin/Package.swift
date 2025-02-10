// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "FilesystemCapacitor",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "FilesystemCapacitor",
            targets: ["FilesystemPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .binaryTarget(
            name: "IONFilesystemLib",
            url: "https://github.com/ionic-team/ion-ios-geolocation/releases/download/1.0.0/IONFilesystemLib.zip",
            checksum: "b117d3681a947f5d367e79abdb3bfc9abf7ab070ea5279d7da634ddd2d54ffdb" // sha-256
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
            path: "ios/Tests/FilesystemTests")
    ]
)
