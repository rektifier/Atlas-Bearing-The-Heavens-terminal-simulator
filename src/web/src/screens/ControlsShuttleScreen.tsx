import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface ControlsShuttleScreenProps {
  state: GlobalState;
  onStartShuttle: () => void;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const ControlsShuttleScreen = ({
  state,
  onStartShuttle,
  onBack,
  playSound,
}: ControlsShuttleScreenProps) => {
  const body = state.shuttle_on
    ? 'Shuttle 4 is already online.'
    : `
+------------------------------------------------------------------------------------------+
| This can only be done with the Warden's consent. Is there anyone operating shuttle four? |
+------------------------------------------------------------------------------------------+

Select 'START SHUTTLE FOUR' to accept.
`;

  const options = [
    { label: 'START SHUTTLE FOUR', action: onStartShuttle },
    { label: 'BACK', action: onBack },
  ];

  const handleSelect = (index: number) => {
    options[index].action();
  };

  return (
    <div>
      <TerminalHeader title="CONTROLS » LIFE SUPPORT" state={state} />
      <Menu options={options} onSelect={handleSelect} body={body} playSound={playSound} />
    </div>
  );
};
