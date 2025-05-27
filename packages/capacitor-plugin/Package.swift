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
            url: "https://github.com/ionic-team/ion-ios-filesystem/releases/download/1.0.0/IONFilesystemLib.zip",
            checksum: "0279cb09ba79c2c917b049a6e388f37f025846886ecc86b0a09320da46ed2c33" // sha-256
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
