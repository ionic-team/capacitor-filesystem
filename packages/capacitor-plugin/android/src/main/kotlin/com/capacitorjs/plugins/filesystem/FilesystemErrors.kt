package com.capacitorjs.plugins.filesystem

import io.ionic.libs.ionfilesystemlib.model.IONFILEExceptions

object FilesystemErrors {
    private fun formatErrorCode(number: Int): String {
        return "OS-PLUG-FILE-" + number.toString().padStart(4, '0')
    }

    data class ErrorInfo(
        val code: String,
        val message: String
    )

    // TODO align errors with iOS - to be done in a future PR possibly?

    fun invalidInputMethod(methodName: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(1),
        message = "Received invalid input on $methodName."
    )

    val invalidPath: ErrorInfo = ErrorInfo(
        code = formatErrorCode(2),
        message = "The provided path is not valid."
    )

    val filePermissionsDenied: ErrorInfo = ErrorInfo(
        code = formatErrorCode(3),
        message = "Unable to do file operation, user denied permission request."
    )

    fun doesNotExist(methodName: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(4),
        message = "$methodName operation failed because the provided file does not exist."
    )

    fun notAllowed(methodName: String, notAllowedFor: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(5),
        message = "$methodName operation is not supported on $notAllowedFor."
    )

    val directoryCreationAlreadyExists: ErrorInfo = ErrorInfo(
        code = formatErrorCode(5),
        message = "Directory already exists, cannot be created."
    )

    val missingParentDirectories: ErrorInfo = ErrorInfo(
        code = formatErrorCode(6),
        message = "Missing parent directories - either recursive=false was passed or parent directory creation failed."
    )

    val cannotDeleteChildren: ErrorInfo = ErrorInfo(
        code = formatErrorCode(7),
        message = "Received recursive=false, but directory has contents."
    )

    fun copyOrRenameDestinationDirectoryExists(methodName: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(8),
        message = "Cannot run $methodName because the destination is a directory that already exists."
    )

    fun copyOrRenameNoParentDirectory(methodName: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(8),
        message = "Cannot run $methodName because the destination's parent directory does not exist."
    )

    fun unknownError(methodName: String): ErrorInfo = ErrorInfo(
        code = formatErrorCode(10),
        message = "Unknown error occurred while trying to execute $methodName."
    )
}

fun Throwable.toFilesystemError(methodName: String): FilesystemErrors.ErrorInfo = when (this) {

    is IONFILEExceptions.UnresolvableUri -> FilesystemErrors.invalidPath

    is IONFILEExceptions.DoesNotExist -> FilesystemErrors.doesNotExist(methodName)

    is IONFILEExceptions.NotSupportedForContentScheme -> FilesystemErrors.notAllowed(
        methodName,
        notAllowedFor = "content:// URIs"
    )

    is IONFILEExceptions.NotSupportedForDirectory -> FilesystemErrors.notAllowed(
        methodName,
        notAllowedFor = "directories"
    )

    is IONFILEExceptions.NotSupportedForFiles -> FilesystemErrors.notAllowed(
        methodName,
        notAllowedFor = "files, only directories are supported"
    )

    is IONFILEExceptions.CreateFailed.AlreadyExists -> FilesystemErrors.directoryCreationAlreadyExists

    is IONFILEExceptions.CreateFailed.NoParentDirectory -> FilesystemErrors.missingParentDirectories

    is IONFILEExceptions.DeleteFailed.CannotDeleteChildren -> FilesystemErrors.cannotDeleteChildren

    is IONFILEExceptions.CopyRenameFailed.MixingFilesAndDirectories,
    is IONFILEExceptions.CopyRenameFailed.LocalToContent,
    is IONFILEExceptions.CopyRenameFailed.SourceAndDestinationContent ->
        FilesystemErrors.notAllowed(methodName, "the provided source and destinations")

    is IONFILEExceptions.CopyRenameFailed.DestinationDirectoryExists ->
        FilesystemErrors.copyOrRenameDestinationDirectoryExists(methodName)

    is IONFILEExceptions.CopyRenameFailed.NoParentDirectory ->
        FilesystemErrors.copyOrRenameNoParentDirectory(methodName)

    else -> FilesystemErrors.unknownError(methodName)
}