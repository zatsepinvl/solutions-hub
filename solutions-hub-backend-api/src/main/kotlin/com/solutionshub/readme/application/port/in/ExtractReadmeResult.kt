package com.solutionshub.readme.application.port.`in`

import com.solutionshub.readme.application.port.out.storage.FileObject

data class ExtractReadmeResult(
    val readme: String,
    val media: List<FileObject>
)