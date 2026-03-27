import { useState, useEffect, useRef } from 'react';

export function useAudio(src) {
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setIsFinished(true);
      return;
    }

    setIsFinished(false);
    setIsPlaying(true);
    
    const audio = new Audio(src);
    audioRef.current = audio;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        // React 18 Strict Mode monta y desmonta rápido en desarrollo. 
        // Esto causa que el audio reciba pause() antes de iniciar, tirando un AbortError.
        // Si no lo ignoramos, el sistema cree que hubo un fallo y desbloquea el botón por error.
        if (e.name === 'AbortError') {
          return;
        }
        
        console.warn(`Fallo al reproducir ${src} (Quizá error 404 o política del navegador). Liberando botón automático.`, e);
        setIsFinished(true);
        setIsPlaying(false);
      });
    }

    audio.onended = () => {
      setIsFinished(true);
      setIsPlaying(false);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [src]);

  return { isFinished, isPlaying };
}
