import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface LogsRosterScreenProps {
  state: GlobalState;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const LogsRosterScreen = ({ state, onBack, playSound }: LogsRosterScreenProps) => {
  const body = `
+--------------------------+--------------------------+--------------------------+
| NAME                     | POSITION                 | AFFILIATION              |
+--------------------------+--------------------------+--------------------------+
| Kyle Mendez              | Corporate representative | Tokugawa Enterprises     |
| Riley Harris             | Flight commander         | Tokugawa Enterprises     |
| Jaxon "Brick" Steele     | Security officer         | Tokugawa Enterprises     |
| Miriam Winters           | Chief medical officer    | Tokugawa Enterprises     |
| Darwin GPP-7.3           | Corporate android        | Tokugawa Enterprises     |
+--------------------------+--------------------------+--------------------------+
| DISASTER RECOVERY UNIT   | Classified               | Classified               |
| PASSANGERS: 1200 souls   |                          |                          |
+--------------------------+--------------------------+--------------------------+
            `;

  const options = [{ label: 'BACK', action: onBack }];

  return (
    <div>
      <TerminalHeader title="LOGS » ROSTER" state={state} />
      <Menu options={options} onSelect={onBack} body={body} animateBody={true} playSound={playSound} />
    </div>
  );
};
