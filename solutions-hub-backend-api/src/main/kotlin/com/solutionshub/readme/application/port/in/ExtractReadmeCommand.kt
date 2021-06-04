package com.solutionshub.readme.application.port.`in`

import com.solutionshub.readme.domain.SupportedConvertingFileType
import java.io.InputStream

data class ExtractReadmeCommand(
    val inputFile: InputStream,
    val fileType: SupportedConvertingFileType
)