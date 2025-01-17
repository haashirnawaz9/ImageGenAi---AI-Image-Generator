'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white min-h-screen flex items-center justify-center p-4 md:p-8 ">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Creativity
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 animate-gradient">
                Transform Your Ideas
              </span>
              <br />
              Into Reality
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
            >
              Experience the future of creativity with our advanced AI image generation. 
              Create stunning, unique visuals that perfectly capture your vision, all with 
              a few simple prompts.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link 
                href="/main"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 rounded-2xl blur-3xl opacity-20 -z-10 animate-pulse" />
            <Image
              src="/ai.jpg"
              alt="AI Generated Masterpiece"
              width={900}
              height={600}
              className="rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/10 transition-transform hover:scale-[1.02] duration-500"
              priority
            />
            <div className="absolute -bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm text-slate-300">AI Model Processing • Creating Magic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}