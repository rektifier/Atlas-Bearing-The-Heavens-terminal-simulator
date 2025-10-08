import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState, MenuScreen } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface ControlsScreenProps {
  state: GlobalState;
  onNavigate: (screen: MenuScreen) => void;
  onBack: () => void;
  onToggleLoadingRamp: () => void;
  onStartShuttle: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const ControlsScreen = ({
  state,
  onNavigate,
  onBack,
  onToggleLoadingRamp,
  onStartShuttle,
  playSound,
}: ControlsScreenProps) => {
  const loadingRampLabel = state.loadingramp_open ? 'CLOSE LOADING RAMP' : 'OPEN LOADING RAMP';

  const body = `
+----------------+----------------------+
| SYSTEM CONTROL | STATE                |
+----------------+----------------------+
| LOADING RAMP   | ${state.loadingramp_open ? 'Open  ' : 'Closed'}               |
| DRU POWER      | ${state.reroute_dru_power ? 'Online      ' : 'Online      '}         |
| LIFE SUPPORT   | ${state.life_support_on ? 'Online              ' : 'Offline             '} |
| SHUTTLE ONE    | ---                  |
| SHUTTLE TWO    | ---                  |
| SHUTTLE THREE  | ---                  |
| SHUTTLE FOUR   | ${state.shuttle_on ? 'Online              ' : 'Offline             '} |
+----------------+----------------------+
    `;

  const options: Array<{ label: string; action: () => void }> = [];

  if (!state.reroute_dru_power) {
    options.push({ label: 'REDIRECT DRU POWER', action: () => onNavigate('controls_dru_power') });
  }

  if (state.is_computer) {
    options.push({ label: loadingRampLabel, action: onToggleLoadingRamp });

    if (!state.shuttle_on) {
      options.push({ label: 'START SHUTTLE FOUR', action: () => onNavigate('controls_shuttle') });
    }

    options.push({ label: 'SELF DESTRUCT', action: () => onNavigate('controls_self_destruct') });
  }

  options.push({ label: 'BACK', action: onBack });

  const handleSelect = (index: number) => {
    options[index].action();
  };

  return (
    <div>
      <TerminalHeader title="CONTROLS" state={state} />
      <Menu options={options} onSelect={handleSelect} body={body} playSound={playSound} />
    </div>
  );
};
