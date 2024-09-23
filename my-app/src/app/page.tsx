'use client';

import { FC, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiPaperAirplane } from "react-icons/hi";
import Image from "next/image";

const Home: FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
        { text: "Hi!", sender: 'user' },
        { text: "Hello! How can I help you today?", sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState("");
    const heroRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(heroRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
            );
        }
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            gsap.fromTo(chatRef.current,
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
            );
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim()) {
            setMessages((prev) => [...prev, { text: inputText, sender: 'user' }]);
            setInputText("");

            try {
                const response = await fetch('http://127.0.0.1:8000/chat_gen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: inputText }),
                });

                const data = await response.json();
                setMessages((prev) => [...prev, { text: data.ans, sender: 'bot' }]);
            } catch (error) {
                console.error("Error sending message to backend:", error);
            }
        }
    };

    return (
        <div
            className="h-[220vh] bg-gradient-to-br from-blue-800 to-black relative overflow-hidden"
            style={{
                backgroundImage: `url(https://i.pinimg.com/originals/c4/e8/20/c4e820b0a8b71a4ca72cbf98a30e86c8.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            {/* Main container */}
            <div className="flex h-[100vh] pt-24">

                {/* Hero Text with Enhanced Design */}
                <div ref={heroRef} className="w-2/3 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-6xl font-extrabold text-white shadow-md mt-8">
                        Your Key to <span className="text-yellow-300">Korean Fluency</span>
                    </h1>
                    <p className="text-lg text-yellow-200 mt-4">
                        Unlock the secrets of the Korean language with our interactive AI-powered chatbot.
                    </p>
                </div>

                {/* Chatbot - Fixed Position with Updated Gradient */}
                <div className="fixed right-8 bottom-8 w-[420px] h-[calc(100%-6rem-30px)] rounded-lg p-6 flex flex-col bg-white bg-opacity-10 backdrop-blur-lg border border-yellow-500 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Ask :</h2>
                    <div ref={chatRef} className="flex-grow overflow-y-auto bg-white/20 p-4 rounded-lg mb-4 backdrop-blur-md">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-xs transition-transform duration-300 ${msg.sender === 'user' ? 'bg-yellow-500 text-white transform hover:scale-105' : 'bg-blue-500 text-white transform hover:scale-105'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-grow p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-shadow duration-200"
                            placeholder="Type your message..."
                        />
                        <div className="ml-2">
                            <button
                                onClick={handleSendMessage}
                                className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 flex items-center"
                            >
                                <HiPaperAirplane className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div ref={descriptionRef} className="absolute w-1/2 mx-auto top-[80vh] left-16 p-6">
                <div className="bg-black rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
                    style={{
                        border: '1px solid rgba(255, 215, 0, 0.6)',
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 215, 0, 0.6)',
                    }}
                >
                    <h2 className="text-4xl font-bold text-white mb-2">Description</h2>
                    <p className="mt-4 text-xl leading-relaxed text-gray-300">
                        This Korean learning app is designed to revolutionize how users engage with the language, offering an interactive and tailored learning experience. With an AI-powered chatbot, users can practice speaking, ask questions, and receive instant feedback, all personalized to their proficiency level.
                        <br />
                        <br />
                        Example prompts include:
                        <br />
                        <br />
                        👉“Can you help me practice introducing myself in Korean?”<br />
                        👉“What’s the difference between formal and informal speech?”<br />
                        👉“How do I properly conjugate Korean verbs?”<br />
                        👉“What are the most common phrases for traveling in Korea?”<br />
                        👉“Can you explain the meaning of this Korean idiom?”<br />
                        👉“How can I improve my pronunciation of Hangeul?”<br />
                        <br />
                        This app aims to make learning Korean accessible, enjoyable, and effective, breaking down language barriers while fostering a deeper appreciation for Korean culture. By leveraging AI to provide real-time guidance and practice, it empowers users to build confidence in speaking, listening, and understanding Korean, paving the way for language mastery and cultural immersion.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                    <p className="text-white text-xl flex items-center justify-center">
                        <span className="px-2">Powered by</span>
                        <Image
                            src="https://www.gaianet.ai/images/logo.png"
                            alt="Description of image"
                            width={50}
                            height={30}
                        />
                    </p>
                </div>
            </footer>

            <style jsx>{`
                .blinking {
                    animation: blinkingText 1.5s infinite;
                }

                @keyframes blinkingText {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Home;
