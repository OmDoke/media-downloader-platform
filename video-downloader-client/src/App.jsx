import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 py-6 text-center text-gray-500 text-sm">
        <p>Universal Video Downloader &copy; {new Date().getFullYear()} - Local Use Only</p>
      </footer>
    </div>
  );
}

export default App;
