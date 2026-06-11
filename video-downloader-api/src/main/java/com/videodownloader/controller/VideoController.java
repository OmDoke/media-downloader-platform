package com.videodownloader.controller;

import com.videodownloader.dto.VideoInfoResponse;
import com.videodownloader.dto.VideoRequest;
import com.videodownloader.service.VideoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.InputStream;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/info")
    public ResponseEntity<?> getVideoInfo(@Valid @RequestBody VideoRequest request) {
        try {
            VideoInfoResponse info = videoService.getVideoInfo(request.getUrl());
            return ResponseEntity.ok(info);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }

    @GetMapping("/download")
    public ResponseEntity<StreamingResponseBody> downloadVideo(
            @RequestParam String url,
            @RequestParam(required = false) String format) {
        
        try {
            Process process = videoService.downloadVideo(url, format);
            InputStream inputStream = process.getInputStream();

            StreamingResponseBody responseBody = outputStream -> {
                try (inputStream) {
                    byte[] buffer = new byte[8192];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                        outputStream.flush();
                    }
                } catch (Exception e) {
                    // Client abort or stream error
                } finally {
                    process.destroy();
                }
            };

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"video.mp4\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(responseBody);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
