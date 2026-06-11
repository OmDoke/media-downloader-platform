import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Video Downloader
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
