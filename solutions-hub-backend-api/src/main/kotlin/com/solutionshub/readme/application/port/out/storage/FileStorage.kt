package com.solutionshub.readme.application.port.out.storage

interface FileStorage {
    fun saveBatch(command: SaveBatchCommand): SaveBatchResult
}