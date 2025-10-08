import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState, MenuScreen } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface MainScreenProps {
  state: GlobalState;
  onNavigate: (screen: MenuScreen) => void;
  onExit: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const MainScreen = ({ state, onNavigate, onExit, playSound }: MainScreenProps) => {
  const options = [
    { label: 'SYSTEM DIAGNOSTICS', action: () => onNavigate('system_diagnostics') },
    { label: 'LOGS', action: () => onNavigate('logs') },
    { label: 'SHIP LAYOUT', action: () => onNavigate('ship_layout') },
    { label: 'CONTROLS', action: () => onNavigate('controls') },
    { label: 'EXIT', action: onExit },
  ];

  const handleSelect = (index: number) => {
    options[index].action();
  };

  const body = `TOKUGAWA ENTERPRISES SYSTEMS © 4803 - REBEL LICENSE
---------------------------------------------------
`;

  return (
    <div>
      <TerminalHeader title="USCC ATLAS CONTROL" state={state} />
      <Menu options={options} onSelect={handleSelect} body={body} playSound={playSound} />
    </div>
  );
};
