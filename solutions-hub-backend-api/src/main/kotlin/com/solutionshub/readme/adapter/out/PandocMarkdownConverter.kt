package com.solutionshub.readme.adapter.out

import com.github.dockerjava.api.async.ResultCallback
import com.github.dockerjava.api.model.Bind
import com.github.dockerjava.api.model.Frame
import com.github.dockerjava.api.model.HostConfig
import com.github.dockerjava.api.model.WaitResponse
import com.github.dockerjava.core.DefaultDockerClientConfig
import com.github.dockerjava.core.DockerClientImpl
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient
import com.solutionshub.annotation.Adapter
import com.solutionshub.readme.application.port.out.converter.ConvertCommand
import com.solutionshub.readme.application.port.out.converter.ConvertResult
import com.solutionshub.readme.application.port.out.converter.MarkdownConverter
import org.apache.commons.lang.SystemUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import java.nio.file.Files
import java.nio.file.Path
import java.time.Instant
import kotlin.streams.toList

@Adapter
class PandocMarkdownConverter(
    @Value("classpath:.resources")
    val resourceFolderMarker: Resource
) : MarkdownConverter {

    private fun getDockerHost(): String {
        return if (SystemUtils.IS_OS_WINDOWS) {
            //https://docs.docker.com/desktop/faqs/#how-do-i-connect-to-the-remote-docker-engine-api
            "npipe:////./pipe/docker_engine"
        } else {
            "/var/run/docker.sock"
        }
    }

    override fun convertToMarkdown(command: ConvertCommand): ConvertResult {
        val tempFolderPath = Path.of("temp")
        val now = Instant.now().toEpochMilli()
        val inputFilename = "input-${now}.docx"
        val outputFilename = "output-${now}.md"
        val outputMediaFolder = "output-media-${now}"
        val inputWordPath = tempFolderPath.resolve(inputFilename)
        val outputMarkdownPath = tempFolderPath.resolve(outputFilename)
        val outputMediaFolderPath = tempFolderPath.resolve(outputMediaFolder)

        Files.deleteIfExists(inputWordPath)
        Files.copy(command.inputStream, inputWordPath)

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
            .withCmd(inputFilename, "-o", outputFilename, "--extract-media", outputMediaFolder/*, "--to", "gfm"*/)
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

        val mediaFiles = Files.walk(outputMediaFolderPath)
            .filter { path -> !Files.isDirectory(path) }
            .toList()

        val markdown = Files.readString(outputMarkdownPath).replace(Regex("\\{width=*.height=*.}"), "")

        return ConvertResult(
            markdown = markdown,
            mediaFiles = mediaFiles
        )
    }
}