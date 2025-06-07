"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio/bg.mp3" type="audio/mpeg" />
      </audio>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

      <div className="absolute top-4 left-6 right-6 z-30 flex justify-between items-center px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white text-2xl md:text-3xl font-bold"
        >
          Munchy
        </motion.div>

        <div className="flex gap-4 text-white text-2xl md:text-3xl">
          <a
            href="https://wa.me/6281931488608"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://github.com/DaMunchy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-white via-purple-400 to-white text-transparent bg-clip-text animate-pulse -mt-2"
        >
          Nyxelia
        </motion.h1>

        <p className="text-lg md:text-2xl text-gray-300 max-w-xl drop-shadow-sm mb-10">
          An intelligent and adaptive AI chatbot built to help, entertain, and
          evolve with you.
        </p>

        <Link href="/chat">
          <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20 hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-in-out text-white text-lg shadow-lg">
            Chat Now
          </div>
        </Link>
      </div>
    </div>
  );
}
