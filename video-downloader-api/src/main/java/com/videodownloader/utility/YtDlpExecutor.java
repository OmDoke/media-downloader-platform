package com.videodownloader.utility;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.videodownloader.dto.FormatResponse;
import com.videodownloader.dto.VideoInfoResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class YtDlpExecutor {

    @Value("${ytdlp.path:yt-dlp}")
    private String ytDlpPath;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public VideoInfoResponse fetchVideoInfo(String url) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(ytDlpPath, "-J", "--flat-playlist", "--no-warnings", "--force-ipv4", "--geo-bypass", url);
        // Do not redirect error stream so we only read pure JSON from stdout
        Process process = pb.start();

        String output = new String(process.getInputStream().readAllBytes());
        String errorOutput = new String(process.getErrorStream().readAllBytes());
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("yt-dlp extraction failed: " + (errorOutput.isEmpty() ? output : errorOutput));
        }

        if (output == null || output.trim().isEmpty() || output.trim().equals("null")) {
            throw new RuntimeException("yt-dlp returned empty or null output. Error stream: " + errorOutput);
        }

        JsonNode root = objectMapper.readTree(output);
        VideoInfoResponse response = new VideoInfoResponse();

        String type = root.path("_type").asText("");
        if ("playlist".equals(type) || "multi_video".equals(type)) {
            response.setPlaylist(true);
            response.setTitle(root.path("title").asText("Playlist"));
            response.setUploader(root.path("uploader").asText("Unknown"));
            
            List<com.videodownloader.dto.PlaylistItem> entries = new ArrayList<>();
            JsonNode entriesNode = root.path("entries");
            if (entriesNode.isArray()) {
                for (JsonNode entry : entriesNode) {
                    com.videodownloader.dto.PlaylistItem item = new com.videodownloader.dto.PlaylistItem();
                    item.setId(entry.path("id").asText());
                    item.setTitle(entry.path("title").asText());
                    item.setUrl(entry.path("url").asText());
                    
                    int durationSeconds = entry.path("duration").asInt(0);
                    if (durationSeconds > 0) {
                        item.setDuration(String.format("%d:%02d", durationSeconds / 60, durationSeconds % 60));
                    } else {
                        item.setDuration("Unknown");
                    }
                    entries.add(item);
                }
            }
            response.setPlaylistEntries(entries);
            return response;
        }

        // Single video logic
        response.setPlaylist(false);
        response.setTitle(root.path("title").asText());
        response.setThumbnail(root.path("thumbnail").asText());
        
        int durationSeconds = root.path("duration").asInt(0);
        response.setDuration(String.format("%d:%02d", durationSeconds / 60, durationSeconds % 60));
        
        response.setUploader(root.path("uploader").asText());
        response.setUploadDate(root.path("upload_date").asText());

        List<FormatResponse> formats = new ArrayList<>();
        JsonNode formatsNode = root.path("formats");
        if (formatsNode.isArray()) {
            for (JsonNode formatNode : formatsNode) {
                String formatId = formatNode.path("format_id").asText();
                String ext = formatNode.path("ext").asText();
                String vcodec = formatNode.path("vcodec").asText();
                String acodec = formatNode.path("acodec").asText();
                String formatNote = formatNode.path("format_note").asText();
                
                if (!"none".equals(vcodec) || !"none".equals(acodec)) {
                    FormatResponse format = new FormatResponse();
                    format.setFormatId(formatId);
                    format.setQuality(formatNode.path("resolution").asText(formatNote));
                    format.setExtension(ext);
                    
                    double filesize = formatNode.path("filesize").asDouble(0);
                    if (filesize == 0) filesize = formatNode.path("filesize_approx").asDouble(0);
                    if (filesize > 0) {
                        format.setApproximateSize(String.format("%.2f MB", filesize / (1024 * 1024)));
                    } else {
                        format.setApproximateSize("Unknown");
                    }
                    
                    format.setVideoCodec(vcodec);
                    format.setAudioCodec(acodec);
                    formats.add(format);
                }
            }
        }
        response.setFormats(formats);

        return response;
    }

    public Process streamVideo(String url, String formatId) throws IOException {
        String format = (formatId == null || formatId.isEmpty()) ? "best" : formatId;
        ProcessBuilder pb = new ProcessBuilder(ytDlpPath, "-f", format, "--force-ipv4", "--geo-bypass", "-o", "-", url);
        // Discard stderr to prevent the process from hanging due to full stderr buffer (yt-dlp progress output)
        pb.redirectError(ProcessBuilder.Redirect.DISCARD);
        return pb.start();
    }
}
