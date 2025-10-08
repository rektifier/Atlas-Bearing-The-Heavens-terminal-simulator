import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface ControlsDruPowerScreenProps {
  state: GlobalState;
  onRedirect: () => void;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const ControlsDruPowerScreen = ({
  state,
  onRedirect,
  onBack,
  playSound,
}: ControlsDruPowerScreenProps) => {
  const body = state.reroute_dru_power
    ? 'Once DRU power is redirected it cannot be altered.'
    : `Redirect power from Disaster Recovery Unit. This action cannot be undone.

Select 'REDIRECT DRU POWER' to accept.

`;

  const options = [
    { label: 'REDIRECT DRU POWER', action: onRedirect },
    { label: 'BACK', action: onBack },
  ];

  const handleSelect = (index: number) => {
    options[index].action();
  };

  return (
    <div>
      <TerminalHeader title="CONTROLS » DRU POWER" state={state} />
      <Menu options={options} onSelect={handleSelect} body={body} playSound={playSound} />
    </div>
  );
};
