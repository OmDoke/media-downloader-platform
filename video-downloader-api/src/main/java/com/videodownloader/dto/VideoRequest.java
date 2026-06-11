package com.videodownloader.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VideoRequest {
    @NotBlank(message = "URL cannot be blank")
    @Pattern(regexp = "^(https?://).+", message = "Must be a valid HTTP or HTTPS URL")
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
