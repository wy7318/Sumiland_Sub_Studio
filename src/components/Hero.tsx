import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/Sumiland%20Design//10613973-hd_1920_1080_24fps%20(1).mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-white/10 text-white backdrop-blur-sm rounded-full text-sm font-medium mb-6"
            >
              Award-Winning Design Studio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl font-bold text-white mb-6"
            >
              We craft digital
              <span className="relative inline-block mx-2">
                <span className="text-[#037ffc]">experiences</span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 100 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0 5C30 5 70 5 100 5"
                    stroke="#037ffc"
                    strokeWidth="2"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  />
                </motion.svg>
              </span>
              <br />that inspire
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-12"
            >
              We're a creative powerhouse delivering stunning designs, SEO-optimized websites,
              and comprehensive branding solutions that drive real business growth.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center px-8 py-4 bg-[#037ffc] text-white rounded-full font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
              >
                Start Your Project
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/portfolio"
                className="group relative inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto justify-center"
              >
                View Our Work
                <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        >
          {/* <span className="text-sm text-white/80 mb-2">Scroll to explore</span> */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <MousePointer2 className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Gradient transition to Services section */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-blue-50" /> */}
      </section>
    </>
  );
}