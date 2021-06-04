package com.solutionshub.readme.application.port.out.converter

import java.nio.file.Path

data class ConvertResult(
    val markdown: String,
    val mediaFiles: List<Path>
)
