// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorFilesystem",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "CapacitorFilesystem",
            targets: ["FilesystemPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "9.0.0-alpha.5"),
        .package(url: "https://github.com/ionic-team/ion-ios-filesystem.git", from: "1.1.1")
    ],
    targets: [
        .target(
            name: "FilesystemPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "IONFilesystemLib", package: "ion-ios-filesystem")
            ],
            path: "ios/Sources/FilesystemPlugin"),
        .testTarget(
            name: "FilesystemPluginTests",
            dependencies: ["FilesystemPlugin"],
            path: "ios/Tests/FilesystemPluginTests")
    ]
)
