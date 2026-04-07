import React, { useState, useEffect, useRef } from 'react';

const VIDEO_URL = 'https://res.cloudinary.com/dvixq2oge/video/upload/v1774233001/samples/elephants.mp4';

const VslVideo = ({ onComplete, onPlayStart }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [showMuteOverlay, setShowMuteOverlay] = useState(true);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Auto-play muted on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => {
      setIsEnded(true);
      onComplete();
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [onComplete]);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsMuted(false);
    onPlayStart?.();  // solo dimming cuando el usuario activa el audio
    setShowMuteOverlay(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = duration > 0 ? duration - currentTime : 0;

  return (
    <section className="h-full flex flex-col items-center justify-center pb-3 md:pb-5 relative">

      {/* Terminal Video Frame — 16:9 cinema on PC */}
      <div className="flex flex-col w-full md:max-w-2xl lg:max-w-3xl mx-auto bg-background/70 backdrop-blur-sm border border-structure shadow-2xl">

        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 border-b border-structure shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-structure" />
            <div className="w-2.5 h-2.5 rounded-full bg-structure" />
            <div className="w-2.5 h-2.5 rounded-full bg-structure" />
          </div>
          <p className="text-[10px] text-gray-600 font-mono ml-3 tracking-widest uppercase truncate">
            Quant_IDS_Terminal // VIDEO_FEED_{isMuted ? 'MUTED' : 'ACTIVE'}
          </p>
        </div>

        {/* Video container — 16:9 */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />

          {/* CRT scanline overlay */}
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none z-10" />

          {/* Corner brackets — always visible */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-signals/50 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-signals/50 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-signals/50 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-signals/50 z-20 pointer-events-none" />

          {/* Timer — top right (like reference) */}
          {duration > 0 && (
            <div className="absolute top-3 right-10 z-30 font-mono text-sm md:text-lg font-bold text-white drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] pointer-events-none">
              {formatTime(remaining)}
            </div>
          )}

          {/* Center mute overlay (like reference — NOT full screen black) */}
          {showMuteOverlay && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                onClick={handleUnmute}
                className="flex flex-col items-center gap-2 bg-depth/90 border border-signals/40 px-6 py-5 md:px-10 md:py-7 backdrop-blur-sm hover:bg-signals/10 hover:border-signals transition-all duration-300 group"
              >
                {/* Muted speaker icon */}
                <svg
                  className="w-10 h-10 md:w-14 md:h-14 text-signals group-hover:scale-110 transition-transform duration-200"
                  fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                  <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="font-mono text-xs md:text-sm text-signals uppercase tracking-widest">
                  [ Activar audio ]
                </span>
                <span className="font-mono text-[10px] md:text-xs text-gray-400">
                  Pulse aquí para activar el sonido
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-structure shrink-0">
          <div
            className="h-full bg-gradient-to-r from-signals/60 to-signals transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-background/80 border-t border-structure/50 shrink-0">
          <span className="font-mono text-[9px] md:text-[10px] text-gray-600 uppercase tracking-widest">
            {isEnded ? '// DIAGNÓSTICO COMPLETADO' : isMuted ? '// MUTED — ACTIVA AUDIO' : '// EN VIVO'}
          </span>
          {!isEnded && (
            <span className="flex items-center gap-1 font-mono text-[9px] md:text-[10px] text-signals">
              <span className="w-1 h-1 bg-signals rounded-full animate-pulse" />
              LIVE
            </span>
          )}
        </div>
      </div>

    </section>
  );
};

export default VslVideo;
