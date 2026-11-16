'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay muted
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative">
        {/* Sketchbook tape accent */}
        <span
          className="tape hidden sm:block"
          style={{ top: '-12px', right: '28px', transform: 'rotate(2.5deg)' }}
          aria-hidden="true"
        />

        {/* Clean, authentic video frame — no controllers */}
        <div
          onClick={togglePlay}
          className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-black shadow-xl transition-all duration-300"
          style={{ borderColor: 'var(--ink-14)' }}
          title={isPlaying ? 'Click to pause' : 'Click to play'}
        >
          <video
            ref={videoRef}
            src="/my-site-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Saffan — Showreel"
            className="h-full w-full object-cover"
          />

          {/* Minimalist discreet audio toggle */}
          <div className="absolute bottom-3 right-3 z-10">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4 text-[var(--accent)]" />
              )}
            </button>
          </div>

          {/* Subtle pause overlay */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                <Play className="h-6 w-6 fill-current translate-x-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
