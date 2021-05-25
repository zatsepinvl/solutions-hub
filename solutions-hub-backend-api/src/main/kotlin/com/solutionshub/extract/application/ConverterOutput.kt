package com.solutionshub.extract.application

import java.nio.file.Path

data class ConverterOutput(
    val markdownPath: Path,
    val mediaFiles: List<Path>
)
