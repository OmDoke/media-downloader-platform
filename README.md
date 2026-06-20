# 🎬 Universal Video Downloader Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java%2017-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<p align="center">
  <a href="https://video-downloader-client.onrender.com/"><b>🔗 Live Demo</b></a>
</p>

A full-stack media downloader built with **React**, **Spring Boot**, **Java 17**, and `yt-dlp`. It features metadata extraction, quality selection, playlist support, and efficient file downloads through a modern, responsive dark-mode web interface.

> ⚠️ **Note:** First load may take 30–60 seconds since the backend runs on Render's free tier and spins down when idle.

---

## 🚀 Features

- **Universal Support** — download videos from thousands of sites supported by `yt-dlp`
- **Playlist Support** — paste a playlist URL to view all included videos and selectively fetch quality options
- **Quality Selection** — view all available resolutions, formats, and estimated file sizes before downloading
- **Modern UI** — sleek, responsive dark-mode interface built with React 19 and Tailwind CSS v4
- **Direct Downloads** — videos are streamed directly through the backend to the browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, Axios |
| Backend | Spring Boot 3, Java 17, Maven |
| Core Processing | `yt-dlp` (extraction), `ffmpeg` (media processing) |
| Deployment | Docker, Render (Infrastructure as Code) |

---

## 📂 Project Structure

```
media-downloader-platform/
├── video-downloader-api/       # Spring Boot backend
├── video-downloader-client/    # React + Vite frontend
├── render.yaml                 # Render Blueprint (IaC)
└── .gitignore
```

---

## 💻 Local Development Setup

### Prerequisites

- **Java 17** & **Maven**
- **Node.js** & **npm**
- **Python 3**
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) — install via `pip install yt-dlp`
- [`ffmpeg`](https://ffmpeg.org/download.html) — ensure it's added to your system's PATH

### 1. Start the Backend (Spring Boot)

```bash
cd video-downloader-api
mvn clean spring-boot:run
```

API runs on `http://localhost:8080`.

### 2. Start the Frontend (React + Vite)

```bash
cd video-downloader-client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` — open this in your browser.

---

## ☁️ Deployment (Render)

This project is configured for automated, free deployment using **Render.com**.

The repo includes a `render.yaml` Blueprint that defines:

- **Backend** — deployed as a free Docker Web Service. The Dockerfile installs Java, Python, `ffmpeg`, and `yt-dlp` automatically.
- **Frontend** — deployed as a free Static Site, automatically wired to the live backend API URL during build.

### How to Deploy

1. Push this code to your own GitHub repository
2. Log in to [Render](https://render.com/)
3. Go to **Blueprints → New Blueprint Instance**
4. Connect your GitHub repository
5. Render reads `render.yaml`, builds the backend Docker container and the Vite frontend, and wires up the networking automatically

---

## ⚠️ Disclaimer

This project is for **educational and personal use only**. Please respect copyright laws and the Terms of Service of the platforms you download content from.

---

## 👤 Author

**Om Doke**
- GitHub: [@OmDoke](https://github.com/OmDoke)
- LinkedIn: [onkar-doke](https://www.linkedin.com/in/onkar-doke-26862420a/)

---

⭐️ If you found this project useful, consider giving it a star!
