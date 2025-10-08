import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface SystemDiagnosticsScreenProps {
  state: GlobalState;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const SystemDiagnosticsScreen = ({ state, onBack, playSound }: SystemDiagnosticsScreenProps) => {
  const lifeSupportStatus = state.life_support_on
    ? 'Online - limited processing capacity due to low power supply.'
    : 'Offline - life support power terminated.';

  const body = `
+------------------------+-----------------------------------------------------------------------------+
| SYSTEM COMPONENT       | STATUS                                                                      |
+------------------------+-----------------------------------------------------------------------------+
| OVERALL STATUS         | Critical failure - ship broken in two sections.                             |
|------------------------|-----------------------------------------------------------------------------|
| POWER STATUS           | Main power offline. Auxiliary power designated for DRU operational at 14%.  |
| LIFE SUPPORT STATUS    | ${lifeSupportStatus.padEnd(76, ' ')}|
| COMMUNICATIONS STATUS  | Damaged - limited internal comms only.                                      |
| NAVIGATION SYSTEM      | Inoperable - navigation system damaged beyond repair.                       |
| STRUCTURAL INTEGRITY   | Compromised - major breaches in several sections.                           |
| CRYO SYSTEMS           | Partially functional - damaged beyond repair.                               |
| ENVIRONMENTAL SENSORS  | Partially operational - detecting hostile conditions outside.               |
| AI CORE STATUS         | Corrupted - limited processing capacity, autonomous behavior unstable.      |
+------------------------+-----------------------------------------------------------------------------+
    `;

  const options = [{ label: 'BACK', action: onBack }];

  return (
    <div>
      <TerminalHeader title="SYSTEM DIAGNOSTICS" state={state} />
      <Menu options={options} onSelect={onBack} body={body} animateBody={true} playSound={playSound} />
    </div>
  );
};
