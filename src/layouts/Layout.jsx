import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VoiceChat from '../components/common/VoiceChat';
import { Toaster } from 'react-hot-toast';
import { DeepgramContextProvider } from '../context/DeepgramContextProvider.jsx';
import { MicrophoneContextProvider } from '../context/MicrophoneContextProvider.jsx';
import { VoiceBotProvider } from '../context/VoiceBotContextProvider.jsx';

const Layout = ({ children }) => {
    return (
        <DeepgramContextProvider>
            <MicrophoneContextProvider>
                <VoiceBotProvider>
                    <div className="min-h-screen bg-white dark:bg-black flex flex-col font-sans text-black dark:text-white transition-colors duration-300">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <Toaster position="top-right" />
                        <VoiceChat />
                    </div>
                </VoiceBotProvider>
            </MicrophoneContextProvider>
        </DeepgramContextProvider>
    );
};

export default Layout;
