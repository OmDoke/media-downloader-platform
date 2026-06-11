import React, { useState } from 'react';
import VideoForm from '../components/VideoForm';
import VideoCard from '../components/VideoCard';
import QualityTable from '../components/QualityTable';
import PlaylistCard from '../components/PlaylistCard';
import Loader from '../components/Loader';
import { fetchVideoInfo, getDownloadUrl } from '../services/api';

const Home = () => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const handleFetch = async (url) => {
        setIsLoading(true);
        setError('');
        setVideoInfo(null);
        setCurrentUrl(url);
        
        try {
            const data = await fetchVideoInfo(url);
            setVideoInfo(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Could not fetch video info. Ensure the backend is running and the URL is valid.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = (formatId) => {
        setIsDownloading(true);
        // We use an iframe or window.location to trigger download
        const downloadUrl = getDownloadUrl(currentUrl, formatId);
        
        // Creating an anchor to trigger the download dialog
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Brief timeout to re-enable button (download is handled by browser)
        setTimeout(() => setIsDownloading(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
                    Download Any Video
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Paste a link below to fetch video metadata and download in your preferred quality. 100% free.
                </p>
            </div>

            <VideoForm onFetch={handleFetch} isLoading={isLoading} />

            {error && (
                <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p>{error}</p>
                </div>
            )}

            {isLoading && <Loader />}

            {videoInfo && !isLoading && videoInfo.playlist && (
                <div className="animate-fade-in-up">
                    <PlaylistCard info={videoInfo} onFetchVideo={handleFetch} />
                </div>
            )}

            {videoInfo && !isLoading && !videoInfo.playlist && (
                <div className="animate-fade-in-up">
                    <VideoCard info={videoInfo} />
                    <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Available Qualities
                    </h3>
                    <QualityTable formats={videoInfo.formats} onDownload={handleDownload} isDownloading={isDownloading} />
                </div>
            )}
        </div>
    );
};

export default Home;
