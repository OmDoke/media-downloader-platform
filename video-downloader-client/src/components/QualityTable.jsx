import React from 'react';

const QualityTable = ({ formats, onDownload, isDownloading }) => {
    if (!formats || formats.length === 0) return null;

    return (
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-900 border-b border-gray-700 text-gray-300 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold">Quality</th>
                            <th className="p-4 font-semibold">Format</th>
                            <th className="p-4 font-semibold">Size</th>
                            <th className="p-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {formats.map((format) => (
                            <tr key={format.formatId} className="hover:bg-gray-700 transition-colors">
                                <td className="p-4 font-medium text-gray-100">{format.quality}</td>
                                <td className="p-4 text-gray-400 uppercase text-sm font-mono">{format.extension}</td>
                                <td className="p-4 text-gray-400">{format.approximateSize}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => onDownload(format.formatId)}
                                        disabled={isDownloading}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded shadow hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                                    >
                                        Download
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

export default QualityTable;
