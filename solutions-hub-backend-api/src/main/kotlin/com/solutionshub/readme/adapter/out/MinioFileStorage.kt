package com.solutionshub.readme.adapter.out

import com.solutionshub.annotation.Adapter
import com.solutionshub.readme.application.port.out.storage.FileObject
import com.solutionshub.readme.application.port.out.storage.FileStorage
import com.solutionshub.readme.application.port.out.storage.SaveBatchCommand
import com.solutionshub.readme.application.port.out.storage.SaveBatchResult
import io.minio.*
import java.nio.file.Files

const val DEFAULT_BUCKET = "default"

@Adapter
class MinioFileStorage : FileStorage {

    override fun saveBatch(command: SaveBatchCommand): SaveBatchResult {
        val minioClient: MinioClient = MinioClient.builder()
            .endpoint("http://localhost:9000")
            .credentials("minio", "password")
            .build()

        val objects = command.files.map { file ->
            val filename = file.fileName.toString()
            val response = minioClient.putObject(
                PutObjectArgs.builder()
                    .stream(
                        Files.newInputStream(file),
                        Files.size(file), -1
                    )
                    .bucket(DEFAULT_BUCKET)
                    .`object`(filename)
                    .build()
            )
            FileObject(
                name = response.`object`(),
                bucket = response.bucket()
            )
        }

        return SaveBatchResult(objects)
    }
}