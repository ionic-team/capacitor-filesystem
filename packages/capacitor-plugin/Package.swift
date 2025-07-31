// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorFilesystem",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorFilesystem",
            targets: ["FilesystemPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .binaryTarget(
            name: "IONFilesystemLib",
            url: "https://github.com/ionic-team/ion-ios-filesystem/releases/download/1.0.1/IONFilesystemLib.zip",
            checksum: "2d333c2be44a51f804f3b592d61fa19d582afc40b6916c1c9d1dee43c30657b9" // sha-256
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
