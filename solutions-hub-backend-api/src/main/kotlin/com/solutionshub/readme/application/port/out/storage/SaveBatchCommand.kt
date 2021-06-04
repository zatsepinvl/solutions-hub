package com.solutionshub.readme.application.port.out.storage

import java.nio.file.Path

data class SaveBatchCommand(
    val files: List<Path>
)