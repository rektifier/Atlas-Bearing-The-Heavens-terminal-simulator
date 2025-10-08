import { useState, useEffect } from 'react';
import { TerminalHeader } from '../components/TerminalHeader';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface ControlsSelfDestructScreenProps {
  state: GlobalState;
  onExit: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const ControlsSelfDestructScreen = ({
  state,
  onExit,
  playSound,
}: ControlsSelfDestructScreenProps) => {
  const [countdown, setCountdown] = useState(600);

  useEffect(() => {
    playSound('self_destruct');
  }, [playSound]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onExit, 2000);
    }
  }, [countdown, onExit]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div>
      <TerminalHeader title="SELF DESTRUCT SEQUENCE" state={state} />
      <div className="space-y-4 mt-8 text-center">
        <div className="text-xl animate-pulse">
          WARNING: Destruction of corporate property is a violation of company policy #2778-B.
        </div>
        <div className="text-lg mt-4">
          TOKUGAWA ENTERPRISES assumes no responsibilities or liabilities resulting from the
          improper use of this feature.
        </div>
        <div className="text-lg mt-4">
          This will initiate a 10-minute ship self-destruct sequence.
        </div>
        <div className="text-lg mt-4">Immediate evacuation suggested.</div>
        <div className="text-4xl font-bold mt-8 animate-pulse">
          SELF DESTRUCT IN: {timeDisplay}
        </div>
      </div>
    </div>
  );
};
