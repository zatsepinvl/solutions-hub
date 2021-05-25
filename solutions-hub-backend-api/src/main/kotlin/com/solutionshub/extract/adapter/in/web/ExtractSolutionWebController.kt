package com.solutionshub.extract.adapter.`in`.web

import com.solutionshub.extract.application.port.`in`.ExtractSolutionInput
import com.solutionshub.extract.application.port.`in`.ExtractSolutionResult
import com.solutionshub.extract.application.port.`in`.ExtractSolutionUseCase
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.multipart.MultipartFile

@Controller
@RequestMapping("/solutions/extract")
class ExtractSolutionWebController(
    private val extractSolutionUseCase: ExtractSolutionUseCase
) {

    @ResponseBody
    @PostMapping(
        path = ["/word"],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun extractFromWord(
        @RequestParam("file") file: MultipartFile
    ): ExtractSolutionResult {
        val input = ExtractSolutionInput(file.inputStream)
        return extractSolutionUseCase.extractFromWordFile(input)
    }
}
