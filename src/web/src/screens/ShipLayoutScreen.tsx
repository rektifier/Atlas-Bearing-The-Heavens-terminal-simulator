import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface ShipLayoutScreenProps {
  state: GlobalState;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const ShipLayoutScreen = ({ state, onBack, playSound }: ShipLayoutScreenProps) => {
  const body = `+---------------------------------------+
│  UNITED SPACE COLONIAL CARRIER ATLAS  │
+---------------------------------------+
        ┌─────────────────────────┐
        │                         │
    ┌───┴───┐    ┌──────┐     ┌───┴───┐    ───  CORRIDOR
 <──┤ CARGO ├────┤ COMP ├+++++┤ CRYO  │    <──  LOADING RAMP
    │  BAY  │    └──────┘     │       │    +++  AIR VENT
    │       ├+++++++++++++++++┤       │
    └───────┘           ┌+++++┤       │
                        +     └───┬───┘
                        +         │
          │                   ┌───┴───┐
    ┌─────┴─┐                 │  DRU  │
    │ CROPS │ ┌─────────┐     └───┬───┘
    │       ├─┤ REPAIRS │     ┌───┴───┐
    │ FARM  │ └─────────┘     │ POWER │
    │STATION│                 └───────┘
    └───┬───┘               +
        │                   +
    ┌───┴─────┐  ┌───────┐  +
    │ MED BAY ├──┤ POWER ├++┘
    └─────────┘  └───────┘`;

  const options = [{ label: 'BACK', action: onBack }];

  return (
    <div>
      <TerminalHeader title="SHIP LAYOUT" state={state} />
      <Menu options={options} onSelect={onBack} body={body} animateBody={true} playSound={playSound} />
    </div>
  );
};
