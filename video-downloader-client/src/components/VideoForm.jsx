import React, { useState } from 'react';

const VideoForm = ({ onFetch, isLoading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) {
            setError('Please enter a valid video URL');
            return;
        }
        setError('');
        onFetch(url);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-8 border border-gray-700 hover:border-gray-600 transition-colors">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                    <input
                        type="url"
                        placeholder="Paste video URL here (e.g., YouTube, Vimeo...)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400 transition-all"
                        disabled={isLoading}
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                >
                    {isLoading ? 'Fetching...' : 'Fetch'}
                </button>
            </form>
        </div>
    );
};

export default VideoForm;
