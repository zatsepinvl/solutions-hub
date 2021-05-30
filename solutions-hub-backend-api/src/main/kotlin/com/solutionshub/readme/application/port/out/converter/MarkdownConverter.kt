package com.solutionshub.readme.application.port.out.converter

interface MarkdownConverter {
    fun convertToMarkdown(command: ConvertCommand): ConvertResult
}