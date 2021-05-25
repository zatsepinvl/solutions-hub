package com.solutionshub.extract.application

import com.solutionshub.extract.application.port.`in`.ExtractSolutionInput
import com.solutionshub.extract.application.port.`in`.ExtractSolutionResult
import com.solutionshub.extract.application.port.`in`.ExtractSolutionUseCase
import com.solutionshub.extract.domain.FileObject
import com.solutionshub.extract.domain.Solution
import org.springframework.stereotype.Service
import java.nio.file.Files

@Service
class ExtractSolutionUseCaseImpl(
    private val pandocConverter: PandocConverter
) : ExtractSolutionUseCase {
    override fun extractFromWordFile(input: ExtractSolutionInput): ExtractSolutionResult {
        val converterOutput = pandocConverter.convertWordToMarkdown(
            ConverterInput(input.wordFile)
        )
        return ExtractSolutionResult(
            solution = Solution(
                id = "test",
                name = "test",
                description = "test",
                readme = Files.readString(converterOutput.markdownPath),
                files = converterOutput.mediaFiles.map { FileObject("test", it.toString(), "test") }
            )
        )
    }
}