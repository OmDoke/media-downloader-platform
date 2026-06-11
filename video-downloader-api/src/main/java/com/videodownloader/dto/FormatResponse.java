package com.videodownloader.dto;

public class FormatResponse {
    private String formatId;
    private String quality;
    private String extension;
    private String approximateSize;
    private String videoCodec;
    private String audioCodec;

    public FormatResponse() {}

    public FormatResponse(String formatId, String quality, String extension, String approximateSize, String videoCodec, String audioCodec) {
        this.formatId = formatId;
        this.quality = quality;
        this.extension = extension;
        this.approximateSize = approximateSize;
        this.videoCodec = videoCodec;
        this.audioCodec = audioCodec;
    }

    public String getFormatId() { return formatId; }
    public void setFormatId(String formatId) { this.formatId = formatId; }

    public String getQuality() { return quality; }
    public void setQuality(String quality) { this.quality = quality; }

    public String getExtension() { return extension; }
    public void setExtension(String extension) { this.extension = extension; }

    public String getApproximateSize() { return approximateSize; }
    public void setApproximateSize(String approximateSize) { this.approximateSize = approximateSize; }

    public String getVideoCodec() { return videoCodec; }
    public void setVideoCodec(String videoCodec) { this.videoCodec = videoCodec; }

    public String getAudioCodec() { return audioCodec; }
    public void setAudioCodec(String audioCodec) { this.audioCodec = audioCodec; }
}
