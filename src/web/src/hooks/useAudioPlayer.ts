import { useEffect, useRef, useCallback } from 'react';

export type SoundEffect =
  | 'menu_nav'
  | 'shuttle_start'
  | 'ramp_open'
  | 'ramp_close'
  | 'dru_redirect'
  | 'self_destruct';

const BASE_URL = import.meta.env.BASE_URL;

const SOUND_FILES: Record<SoundEffect, string> = {
  menu_nav: `${BASE_URL}sounds/ABTH_terminal_UI.mp3`,
  shuttle_start: `${BASE_URL}sounds/ABTH_start_shuttle.mp3`,
  ramp_open: `${BASE_URL}sounds/ABTH_Loading_ramp_open.mp3`,
  ramp_close: `${BASE_URL}sounds/ABTH_loading_ramp_closed.mp3`,
  dru_redirect: `${BASE_URL}sounds/ABTH_DRU_redirected_120_minutes.mp3`,
  self_destruct: `${BASE_URL}sounds/ABTH_Self_destruct_10_minutes.mp3`,
};

export const useAudioPlayer = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    Object.entries(SOUND_FILES).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = 0.5;
      audioCache.current[key] = audio;
    });

    return () => {
      isMounted.current = false;
      Object.values(audioCache.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioCache.current = {};
    };
  }, []);

  const playSound = useCallback((sound: SoundEffect) => {
    if (!isMounted.current) return;

    const audio = audioCache.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn(`Failed to play sound ${sound}:`, error);
      });
    }
  }, []);

  return { playSound };
};
