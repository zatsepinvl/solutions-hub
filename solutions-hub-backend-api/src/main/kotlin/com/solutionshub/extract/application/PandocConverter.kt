package com.solutionshub.extract.application

import com.github.dockerjava.api.async.ResultCallback
import com.github.dockerjava.api.model.*
import com.github.dockerjava.core.DefaultDockerClientConfig
import com.github.dockerjava.core.DockerClientImpl
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient
import io.minio.GetObjectTagsArgs
import io.minio.GetPresignedObjectUrlArgs
import io.minio.MinioClient
import io.minio.PutObjectArgs
import org.apache.commons.lang.SystemUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Path
import java.time.Instant
import kotlin.streams.toList

@Service
class PandocConverter(
    @Value("classpath:.resources")
    val resourceFolderMarker: Resource
) {

    fun getDockerHost(): String {
        return if (SystemUtils.IS_OS_WINDOWS) {
            //https://docs.docker.com/desktop/faqs/#how-do-i-connect-to-the-remote-docker-engine-api
            "npipe:////./pipe/docker_engine"
        } else {
            "/var/run/docker.sock"
        }
    }

    fun convertWordToMarkdown(input: ConverterInput): ConverterOutput {
        val tempFolderPath = Path.of("temp")
        val now = Instant.now().toEpochMilli()
        val inputFilename = "input-${now}.docx"
        val outputFilename = "output-${now}.md"
        val outputMediaFolder = "output-media-${now}"
        val inputWordPath = tempFolderPath.resolve(inputFilename)
        val outputMarkdownPath = tempFolderPath.resolve(outputFilename)
        val outputMediaFolderPath = tempFolderPath.resolve(outputMediaFolder)

        Files.deleteIfExists(inputWordPath)
        Files.copy(input.inputStream, inputWordPath)

        val clientConfig = DefaultDockerClientConfig.createDefaultConfigBuilder()
            .withDockerHost(getDockerHost())
            .build()

        val httpClient = ApacheDockerHttpClient.Builder()
            .dockerHost(clientConfig.dockerHost)
            .sslConfig(clientConfig.sslConfig)
            .build()

        val docker = DockerClientImpl.getInstance(clientConfig, httpClient)

        val container = docker.createContainerCmd("pandoc/core")
            .withHostConfig(
                HostConfig.newHostConfig()
                    .withBinds(Bind.parse("${tempFolderPath.toAbsolutePath()}:/data"))
            )
            .withCmd(inputFilename, "-o", outputFilename, "--extract-media", outputMediaFolder, "--to", "gfm")
            .exec()
        docker.startContainerCmd(container.id).exec()

        val resultCallback = object : ResultCallback.Adapter<WaitResponse>() {}

        docker.waitContainerCmd(container.id)
            .exec(resultCallback)
        resultCallback.awaitCompletion()

        docker.logContainerCmd(container.id)
            .withStdOut(true)
            .withStdErr(true)
            .exec(object : ResultCallback.Adapter<Frame>() {
                override fun onNext(frame: Frame) {
                    println(frame)
                }
            })
            .awaitCompletion()

        docker.removeContainerCmd(container.id).withForce(true).exec()

        /*  val minioClient: MinioClient = MinioClient.builder()
                 .endpoint("http://localhost:9000")
                 .credentials("minio", "password")
                 .build()
            minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
    */
/*
        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket("filestorage").build())) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket("filestorage").build());
        }

        val response = minioClient.putObject(
            PutObjectArgs.builder()
                .stream(
                    Files.newInputStream(outputPath),
                    Files.size(outputPath), -1
                )
                .bucket("filestorage")
                .`object`(outputFilename)
                .build()
        )*/
        val mediaFiles = Files.walk(outputMediaFolderPath)
            .filter { path -> !Files.isDirectory(path) }
            .toList()
        return ConverterOutput(
            markdownPath = outputMarkdownPath,
            mediaFiles = mediaFiles
        )
    }
}