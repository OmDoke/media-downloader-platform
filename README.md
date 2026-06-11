# Universal Video Downloader Platform

A full-stack media downloader built with React, Spring Boot, Java 17, and `yt-dlp`. It features metadata extraction, quality selection, playlist support, and efficient file downloads through a modern, responsive dark-mode web interface.

## 🚀 Features
- **Universal Support**: Download videos from thousands of supported websites, powered by `yt-dlp`.
- **Playlist Support**: Paste a playlist URL to instantly view all included videos and selectively fetch their qualities.
- **Quality Selection**: View all available resolutions, formats, and estimated file sizes before downloading.
- **Modern UI**: A sleek, responsive dark-mode interface built with React 19 and Tailwind CSS v4.
- **Direct Downloads**: Videos are streamed directly through the backend to your browser.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Axios
- **Backend**: Spring Boot 3, Java 17, Maven
- **Core Processing**: `yt-dlp` (Video Extraction), `ffmpeg` (Media Processing)
- **Deployment**: Docker, Render (Infrastructure as Code)

---

## 💻 Local Development Setup

### Prerequisites
Before running locally, ensure you have the following installed on your machine:
- **Java 17** & **Maven**
- **Node.js** & **npm**
- **Python 3**
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** (`pip install yt-dlp`)
- **[ffmpeg](https://ffmpeg.org/download.html)** (Ensure it is added to your system's PATH)

### 1. Start the Backend (Spring Boot)
Open a terminal and run the following commands:
```bash
cd video-downloader-api
mvn clean spring-boot:run
```
The API will start running on `http://localhost:8080`.

### 2. Start the Frontend (React + Vite)
Open a new terminal and run:
```bash
cd video-downloader-client
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`. Open this URL in your browser.

---

## ☁️ Deployment (Render)

This project is configured for automated, 100% free deployment using **Render.com**. 

The repository includes a `render.yaml` Blueprint file, which defines the infrastructure:
- **Backend**: Deployed as a free Docker Web Service. The `Dockerfile` automatically installs Java, Python, `ffmpeg`, and `yt-dlp`.
- **Frontend**: Deployed as a free Static Site. It automatically receives the live backend API URL during the build step.

### How to Deploy:
1. Push this code to a repository on GitHub.
2. Log in to [Render](https://render.com/).
3. Go to **Blueprints** -> **New Blueprint Instance**.
4. Connect your GitHub repository.
5. Render will read the `render.yaml` file, build the Docker container for the backend, build the Vite frontend, and set up the networking automatically.

## ⚠️ Disclaimer
This project is for educational and personal use only. Please respect copyright laws and the Terms of Service of the platforms you are downloading content from.
