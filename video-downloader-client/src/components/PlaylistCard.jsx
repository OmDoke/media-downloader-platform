import React from 'react';

const PlaylistCard = ({ info, onFetchVideo }) => {
    if (!info || !info.playlist) return null;

    return (
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">{info.title}</h2>
                <div className="text-gray-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <span>Playlist • {info.playlistEntries?.length || 0} videos</span>
                </div>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-900 border-b border-gray-700 text-gray-300 text-sm uppercase tracking-wider sticky top-0 shadow">
                            <th className="p-4 font-semibold">Video Title</th>
                            <th className="p-4 font-semibold w-24">Duration</th>
                            <th className="p-4 font-semibold text-right w-32">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {info.playlistEntries?.map((item, index) => (
                            <tr key={item.id || index} className="hover:bg-gray-700 transition-colors">
                                <td className="p-4 font-medium text-gray-100 line-clamp-2" title={item.title}>
                                    {index + 1}. {item.title}
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-sm">{item.duration}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => onFetchVideo(item.url)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded shadow hover:shadow-blue-500/30 transition-all transform active:scale-95"
                                    >
                                        Fetch Options
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlaylistCard;
