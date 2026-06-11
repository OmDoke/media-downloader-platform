package com.videodownloader.service;

import com.videodownloader.dto.VideoInfoResponse;
import com.videodownloader.utility.YtDlpExecutor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class VideoService {

    private final YtDlpExecutor ytDlpExecutor;

    public VideoService(YtDlpExecutor ytDlpExecutor) {
        this.ytDlpExecutor = ytDlpExecutor;
    }

    public VideoInfoResponse getVideoInfo(String url) {
        try {
            return ytDlpExecutor.fetchVideoInfo(url);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error fetching video info", e);
        }
    }

    public Process downloadVideo(String url, String formatId) {
        try {
            return ytDlpExecutor.streamVideo(url, formatId);
        } catch (IOException e) {
            throw new RuntimeException("Error starting video stream", e);
        }
    }
}
