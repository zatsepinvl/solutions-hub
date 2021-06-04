package com.solutionshub.readme.adapter.`in`.web

import com.solutionshub.readme.application.port.`in`.ExtractReadmeCommand
import com.solutionshub.readme.application.port.`in`.ExtractReadmeResult
import com.solutionshub.readme.application.port.`in`.ExtractReadmeUseCase
import com.solutionshub.readme.domain.SupportedConvertingFileType
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.multipart.MultipartFile

@Controller
@RequestMapping("/solutions/readme/conversion")
class ExtractSolutionWebController(
    private val extractReadmeUseCase: ExtractReadmeUseCase
) {

    @ResponseBody
    @PostMapping(
        path = ["/word"],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun extractFromWord(
        @RequestParam("file") file: MultipartFile
    ): ExtractReadmeResult {
        val command = ExtractReadmeCommand(file.inputStream, SupportedConvertingFileType.WORD)
        return extractReadmeUseCase.extractFromWordFile(command)
    }
}
