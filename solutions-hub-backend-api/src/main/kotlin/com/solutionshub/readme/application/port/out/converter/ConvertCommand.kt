package com.solutionshub.readme.application.port.out.converter

import com.solutionshub.readme.domain.SupportedConvertingFileType
import java.io.InputStream

data class ConvertCommand(
    val inputStream: InputStream,
    val fileType: SupportedConvertingFileType
)
