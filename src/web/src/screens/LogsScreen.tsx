import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState, MenuScreen } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface LogsScreenProps {
  state: GlobalState;
  onNavigate: (screen: MenuScreen) => void;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const LogsScreen = ({ state, onNavigate, onBack, playSound }: LogsScreenProps) => {
  const options = [
    { label: 'SYSTEM', action: () => onNavigate('logs_system') },
    { label: 'CARGO', action: () => onNavigate('logs_cargo') },
    { label: 'ROSTER', action: () => onNavigate('logs_roster') },
    { label: 'BACK', action: onBack },
  ];

  const handleSelect = (index: number) => {
    options[index].action();
  };

  return (
    <div>
      <TerminalHeader title="LOGS" state={state} />
      <Menu options={options} onSelect={handleSelect} playSound={playSound} />
    </div>
  );
};
