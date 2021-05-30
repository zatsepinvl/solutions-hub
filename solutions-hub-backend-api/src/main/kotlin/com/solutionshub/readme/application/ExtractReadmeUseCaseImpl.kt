package com.solutionshub.readme.application

import com.solutionshub.readme.application.port.out.converter.ConvertCommand
import com.solutionshub.readme.application.port.`in`.ExtractReadmeCommand
import com.solutionshub.readme.application.port.`in`.ExtractReadmeResult
import com.solutionshub.readme.application.port.`in`.ExtractReadmeUseCase
import com.solutionshub.readme.application.port.out.converter.MarkdownConverter
import com.solutionshub.readme.application.port.out.storage.FileObject
import com.solutionshub.readme.application.port.out.storage.FileStorage
import com.solutionshub.readme.application.port.out.storage.SaveBatchCommand
import org.springframework.stereotype.Service
import java.nio.file.Files

@Service
class ExtractReadmeUseCaseImpl(
    private val markdownConverter: MarkdownConverter,
    private val fileStorage: FileStorage
) : ExtractReadmeUseCase {
    override fun extractFromWordFile(command: ExtractReadmeCommand): ExtractReadmeResult {
        val convertCommand = ConvertCommand(command.inputFile, command.fileType)
        val convertingResult = markdownConverter.convertToMarkdown(convertCommand)

        val saveBatchCommand = SaveBatchCommand(convertingResult.mediaFiles)
        val saveBatchResult = fileStorage.saveBatch(saveBatchCommand)

        return ExtractReadmeResult(
            readme = convertingResult.markdown,
            media = saveBatchResult.objects
        )
    }
}