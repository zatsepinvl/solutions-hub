package com.solutionshub.extract.domain

data class Solution(
    val id: String,
    val name: String,
    val description: String,
    val readme: String,
    val files: List<FileObject>
)
