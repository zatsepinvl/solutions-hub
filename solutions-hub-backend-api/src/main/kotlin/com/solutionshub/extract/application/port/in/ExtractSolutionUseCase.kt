package com.solutionshub.extract.application.port.`in`

interface ExtractSolutionUseCase {
    fun extractFromWordFile(input: ExtractSolutionInput): ExtractSolutionResult
}