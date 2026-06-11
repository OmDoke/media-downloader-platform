package com.videodownloader.dto;

import java.util.List;

public class VideoInfoResponse {
    private String title;
    private String thumbnail;
    private String duration;
    private String uploader;
    private String uploadDate;
    private List<FormatResponse> formats;

    private boolean isPlaylist;
    private List<PlaylistItem> playlistEntries;

    public boolean isPlaylist() { return isPlaylist; }
    public void setPlaylist(boolean playlist) { isPlaylist = playlist; }

    public List<PlaylistItem> getPlaylistEntries() { return playlistEntries; }
    public void setPlaylistEntries(List<PlaylistItem> playlistEntries) { this.playlistEntries = playlistEntries; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getUploader() { return uploader; }
    public void setUploader(String uploader) { this.uploader = uploader; }

    public String getUploadDate() { return uploadDate; }
    public void setUploadDate(String uploadDate) { this.uploadDate = uploadDate; }

    public List<FormatResponse> getFormats() { return formats; }
    public void setFormats(List<FormatResponse> formats) { this.formats = formats; }
}
