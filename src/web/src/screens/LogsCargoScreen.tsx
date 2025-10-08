import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface LogsCargoScreenProps {
  state: GlobalState;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const LogsCargoScreen = ({ state, onBack, playSound }: LogsCargoScreenProps) => {
  const body = `
+-------------------------------+-------------------------------+---------------------+
| ITEM NAME                     | ROOM LOCATION                 | CONTACT             |
+-------------------------------+-------------------------------+---------------------+
| Cryogenic supplies            | Cryo pod                      | Miriam Winters      |
| Spare cryo pods               | Cryo pod                      | Miriam Winters      |
| Emergency rations             | Cargo bay                     | Riley Banks         |
| Atmospheric analyzer          | Cargo bay                     | Astrid Park         |
| Energy cell replacement units | Cargo bay                     | Riley Banks         |
| Survey drones                 | Cargo bay                     | Jaxon Steele        |
| Cryogenic fuel canisters      | Storage in cargo bay          | Jaxon Steele        |
| Personal weapon cache         | Loading ramp                  | Jaxon Steele        |
| Crop seeds & nutrients        | Crops/farm station            | Astrid Park         |
| Spare energy cells            | Maintenance/workshop          | Santiago Morales    |
| Spare parts kit               | Maintenance/workshop          | Santiago Morales    |
| Field repair kit              | Maintenance/workshop          | Santiago Morales    |
| Medical stasis pods           | Medbay/science lab            | Miriam Winters      |
| Medical supplies              | Medbay/science lab            | Miriam Winters      |
+-------------------------------+-------------------------------+---------------------+
    `;

  const options = [{ label: 'BACK', action: onBack }];

  return (
    <div>
      <TerminalHeader title="LOGS » CARGO" state={state} />
      <Menu options={options} onSelect={onBack} body={body} animateBody={true} playSound={playSound} />
    </div>
  );
};
