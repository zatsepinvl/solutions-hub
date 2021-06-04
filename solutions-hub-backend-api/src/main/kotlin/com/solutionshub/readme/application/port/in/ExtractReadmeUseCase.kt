package com.solutionshub.readme.application.port.`in`

interface ExtractReadmeUseCase {
    fun extractFromWordFile(command: ExtractReadmeCommand): ExtractReadmeResult
}