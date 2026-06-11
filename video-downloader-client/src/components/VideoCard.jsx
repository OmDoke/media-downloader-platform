import React from 'react';

const VideoCard = ({ info }) => {
    if (!info) return null;

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 flex flex-col md:flex-row mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-full md:w-1/3 relative group overflow-hidden bg-gray-900">
                <img 
                    src={info.thumbnail} 
                    alt={info.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-mono font-semibold text-white">
                    {info.duration}
                </div>
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-100 mb-2 line-clamp-2">{info.title}</h2>
                <div className="text-gray-400 flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>{info.uploader}</span>
                </div>
                <div className="text-gray-500 text-sm">
                    Uploaded on: {info.uploadDate ? `${info.uploadDate.substring(0,4)}-${info.uploadDate.substring(4,6)}-${info.uploadDate.substring(6,8)}` : 'Unknown'}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
