/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { Globe, ArrowRight, Instagram, X, Check, ArrowUpRight, MessageCircle, Mail, Sparkles } from "lucide-react";
import { CoursesPage } from "./components/CoursesPage";

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "courses">("home");
  const [vaultTab, setVaultTab] = useState<"store" | "premium">("store");
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  // Custom animation frame-based fade transition (no CSS transitions)
  const animateOpacity = (target: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any running animation to prevent competing frames
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth quadratic ease-in-out easing function
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentOpacity = startOpacity + (target - startOpacity) * ease;
      video.style.opacity = currentOpacity.toFixed(4);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Video time update checker: starts custom 500ms fade-out 0.55s before finishing
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const currentTime = video.currentTime;

    if (!duration || isNaN(duration)) return;

    const secondsRemaining = duration - currentTime;

    // Detect when exactly 0.55 sec remain and fade out.
    // fadingOutRef prevents redundant trigger cascades on repeated timeupdate cycles.
    if (secondsRemaining <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  };

  // Video ended transition: set opacity to 0, wait 100ms, rewind, play, and fade back in
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setTimeout(() => {
      const vid = videoRef.current;
      if (!vid) return;

      vid.currentTime = 0;
      vid.play()
        .then(() => {
          fadingOutRef.current = false;
          animateOpacity(1, 500);
        })
        .catch((err) => {
          console.warn("Autoplay/Loop play got blocked by browser:", err);
          fadingOutRef.current = false;
          animateOpacity(1, 500);
        });
    }, 100);
  };

  // Handle video loaded metadata / ready to play states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    const startPlaying = () => {
      video.play()
        .then(() => {
          animateOpacity(1, 500);
        })
        .catch((err) => {
          console.log("Autoplay was initially prevented. Fading in anyway to expect interaction:", err);
          // Force fade-in so frame is visible on manual trigger or play
          animateOpacity(1, 500);
        });
    };

    // Attach load listener or play instantly if loaded
    if (video.readyState >= 1) {
      startPlaying();
    } else {
      video.addEventListener("loadedmetadata", startPlaying);
    }

    // Try a general window interaction listener as a safety net for browser auto-play policies
    const handleInteraction = () => {
      if (video.paused) {
        video.play()
          .then(() => {
            if (parseFloat(video.style.opacity || "0") < 0.1 && !fadingOutRef.current) {
              animateOpacity(1, 500);
            }
          })
          .catch(() => {});
      }
    };
    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      video.removeEventListener("loadedmetadata", startPlaying);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setIsSubscribed(true);
    setEmail("");

    // Auto dismiss subscribe feedback
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <div id="landing-root" className="h-[100dvh] min-h-[100dvh] md:h-screen bg-black flex flex-col relative text-white overflow-hidden">
      
      {/* 1. LOOPING BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        muted
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="fixed inset-0 w-full h-full object-cover translate-y-[17%] pointer-events-none z-0"
        style={{ opacity: 0 }}
      />

      {/* 2. CINEMATIC GRADIENT & VIGNETTE OVERLAYS */}
      <div 
        id="vignette-overlay" 
        className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 pointer-events-none z-[1]" 
      />
      <div 
        id="radial-lens-overlay" 
        className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-[1]" 
      />

      {/* 3. NAVIGATION BAR */}
      <header id="main-navigation" className="relative z-20 w-full px-4 sm:px-6 pt-[3vh] pb-[1vh]">
        <div className="rounded-full px-4 sm:px-6 py-2 sm:py-[1vh] flex items-center justify-between max-w-5xl mx-auto liquid-glass gap-2">
          
          <div className="flex items-center min-w-0">
            <div 
              id="brand-logo" 
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
              onClick={() => setCurrentPage("home")}
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:rotate-12 transition-transform duration-500 shrink-0" />
              <span className="text-white font-semibold text-xs sm:text-sm md:text-lg tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">The Bundle Baaz</span>
            </div>
          </div>

          <div id="nav-actions-container" className="flex items-center shrink-0">
            <a 
              id="whatsapp-header-button"
              href="https://chat.whatsapp.com/CHnxJdx9K0856ti1jzxjKd"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-3 py-1.5 sm:px-5 sm:py-[1vh] text-white text-[10px] sm:text-xs md:text-sm font-semibold hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1 sm:gap-2 cursor-pointer border border-white/5 whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
              <span className="inline sm:hidden">Join Group</span>
              <span className="hidden sm:inline">Join WhatsApp Group</span>
            </a>
          </div>

        </div>
      </header>

      {/* 4. HERO CONTENT AREA */}
      {currentPage === "home" ? (
        <main 
          id="hero-content" 
          className="relative z-10 flex-1 flex flex-col items-center justify-center pt-[1.5vh] pb-[3vh] px-4 sm:px-6 text-center md:-translate-y-[12vh] -translate-y-[3vh]"
        >
          <div className="max-w-4xl flex flex-col items-center w-full space-y-[1.8vh] md:space-y-[3.5vh]">
            
            {/* Headline */}
            <h1 
              id="hero-title"
              style={{ fontFamily: "'Instrument Serif', serif" }} 
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none italic font-light drop-shadow-lg text-center font-serif px-2 max-w-full break-words"
            >
              Built for the <span className="not-italic inline-block font-normal bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">ambitious</span>
            </h1>

            {/* Subtitle text */}
            <p 
              id="hero-subtitle" 
              className="text-white/80 text-[11px] sm:text-sm leading-relaxed px-2 sm:px-4 max-w-xl mx-auto"
            >
              Courses, eBooks, templates, and creator toolkits bundled at unbeatable prices. Pay once and receive your download link instantly as soon as your payment is confirmed.
            </p>

            {/* Action buttons row */}
            <div 
              id="hero-action-buttons" 
              className="flex flex-row items-center justify-center gap-3 md:gap-4 flex-wrap"
            >
              <button
                id="browse-all-bundles-trigger"
                onClick={() => {
                  setVaultTab("store");
                  setCurrentPage("courses");
                }}
                className="liquid-glass rounded-full px-5 py-2 sm:px-8 sm:py-[1.2vh] text-white text-xs sm:text-sm font-semibold hover:bg-white/5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse all bundles</span>
                <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </button>
            </div>

            {/* RATINGS & STATS SECTION (REMOVED FROM HERE - MOVED TO FOOTER) */}

          </div>
        </main>
      ) : (
        <CoursesPage 
          onBack={() => setCurrentPage("home")} 
          initialTab={vaultTab} 
          onCheckoutOpen={setIsCheckoutActive}
        />
      )}

      {/* 5. SOCIAL IONS FOOTER */}
      {!isCheckoutActive && (
        <footer id="social-footer" className="relative z-10 flex flex-col items-center justify-center gap-3 pb-[4.5vh] sm:pb-[3.5vh] mt-auto w-full -translate-y-[1.5vh] sm:translate-y-0">
          {/* Subtitle ratings bar with stars as specified */}
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs md:text-sm text-neutral-400">
            <span className="text-[#f3b33e] tracking-tight text-base">★★★★★</span>
            <span>
              <strong className="text-white font-semibold">4.8/5</strong> from 3,400+ verified buyers
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <a 
              id="social-instagram"
              href="https://www.instagram.com/the_bundlebaaz" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="liquid-glass rounded-full p-[1vh] sm:p-[1.3vh] text-white/80 hover:text-white hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              id="social-whatsapp"
              href="https://chat.whatsapp.com/CHnxJdx9K0856ti1jzxjKd" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="liquid-glass rounded-full p-[1vh] sm:p-[1.3vh] text-white/80 hover:text-white hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a 
              id="social-email"
              href="mailto:qsinfo999@gmail.com" 
              aria-label="Email"
              className="liquid-glass rounded-full p-[1vh] sm:p-[1.3vh] text-white/80 hover:text-white hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </footer>
      )}

      {/* 6. MANIFESTO GLASS MODAL OVERLAY */}
      {manifestoOpen && (
        <div 
          id="modal-backdrop" 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setManifestoOpen(false)}
        >
          <div 
            id="manifesto-modal-card" 
            className="liquid-glass rounded-3xl p-8 md:p-12 max-w-xl w-full relative z-50 text-white/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="modal-close"
              onClick={() => setManifestoOpen(false)}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-neutral-400 rotate-12" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">The Bundle Baaz Ethos</span>
              </div>

              <h2 
                style={{ fontFamily: "'Instrument Serif', serif" }} 
                className="text-4xl md:text-5xl text-white italic font-light tracking-wide leading-tight"
              >
                Here’s to the Seeker.
              </h2>

              <p className="text-white/80 text-base leading-relaxed font-sans">
                We design for those who value absolute focus, radical aesthetic honesty, and the poetry details can carry. Underneath the glass, and behind the dark corners of the lens, lies an architecture reserved for the curious.
              </p>

              <div className="border-t border-white/10 pt-6 space-y-4 text-sm text-neutral-300 font-light">
                <div id="manifesto-item-1" className="flex items-start gap-4">
                  <span className="text-xs font-mono text-neutral-500 pt-0.5">01</span>
                  <span><strong>Form Follows Intent:</strong> In a world crowded with clutter, space and focus are our ultimate luxury.</span>
                </div>
                <div id="manifesto-item-2" className="flex items-start gap-4">
                  <span className="text-xs font-mono text-neutral-500 pt-0.5">02</span>
                  <span><strong>Liquid Horizons:</strong> Interfaces shouldn't feel rigid. They should flow, catching light as naturally as morning mist resting on glass.</span>
                </div>
                <div id="manifesto-item-3" className="flex items-start gap-4">
                  <span className="text-xs font-mono text-neutral-500 pt-0.5">03</span>
                  <span><strong>Cinematic Attention:</strong> We hold attention through rhythmic frame transitions, deep shadow structures, and respectful visual silence.</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center text-xs text-neutral-400 font-mono">
                <span>VER. 1.0.4.A</span>
                <span>THE BUNDLE BAAZ TEAM</span>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
