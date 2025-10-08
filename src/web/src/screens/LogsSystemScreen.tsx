import { TerminalHeader } from '../components/TerminalHeader';
import { Menu } from '../components/Menu';
import { GlobalState } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface LogsSystemScreenProps {
  state: GlobalState;
  onBack: () => void;
  playSound: (sound: SoundEffect) => void;
}

export const LogsSystemScreen = ({ state, onBack, playSound }: LogsSystemScreenProps) => {
  const body = `
+-------------+------------------------+----------------------------------------------------------------------------+
| DATE        | STATUS/LABEL           | DESCRIPTION                                                                |
+-------------+------------------------+----------------------------------------------------------------------------+
| 2108.04.22  | STATUS: INITIATE       | Tokugawa Enterprises confirms discovery of habitable planet NC-2806.       |
| 2110.01.15  | MISSION PLAN: UPDATED  | Colonization mission launched: USCC Atlas en route to NC-2806.             |
| 2110.01.15  | DEPARTURE CONFIRMED    | USCC Atlas departure from Mother Earth confirmed. Navigation stable.       |
| 2110.01.22  | CREW STATUS            | 1,200 colonists, main crew and Disaster Recovery Unit secured in cryo.     |
| 2114.09.17  | NAV SYS                | Electromagnetic storm detected. Route alteration procedures commencing.    |
| 2114.09.17  | ALERT                  | Severe EM interference. Navigation failure. Backup systems engaged.        |
| 2114.09.17  | CRYO STATUS            | Attempt to wake Disaster Recovery Unit failed due to system malfunction.   |
| 2114.09.17  | CRITICAL ERROR         | Navigation module damaged. Autonomous course recalibration required.       |
| 2114.09.17  | COURSE UPDATE          | Unable to align with NC-2806. Entering deep space drift.                   |
| 2212.07.05  | AUTONOMOUS DETECTION   | Celestial body proximity detected. Unknown planet in trajectory.           |
| 2212.07.07  | AUTOPILOT              | Autopilot malfunction. Collision course with unidentified planetary body.  |
| 2212.07.12  | IMPACT IMMINENT        | Safety protocols activated. Waking regular crew for emergency procedure.   |
| 2212.07.12  | IMPACT                 | USCC Atlas collision with planetary surface confirmed. Integrity lost.     |
| 2212.07.12  | SEVERE DAMAGE          | Ship split into two halves. Power loss across all major systems.           |
| 2212.07.12  | EMERGENCY PROTOCOL     | Attempting partial system restoration. Crew survival probability 32%.      |
| 2212.07.12  | DISASTER RECOVERY UNIT | Status: Still in cryo. Catastrophic failure detected. Power restore failed.|
| 2212.08.10  | UNKNOWN PLANET LOG     | Hostile atmospheric conditions detected. Alien flora/fauna confirmed.      |
| 2212.08.11  | IMMEDIATE THREAT       | Security alerts detected. Unauthorized lifeform signals within perimeter.  |
| 2212.09.14  | LIFE SUPPORT OFFLINE   | Life support power terminated. Oxygen and environmental control ceased.    |
| 2212.09.14  | FINAL ENTRY            | Disaster Recovery Unit power supply low. Waking Disaster Recovery Unit.    |
+-------------+------------------------+----------------------------------------------------------------------------+
               `;

  const options = [{ label: 'BACK', action: onBack }];

  return (
    <div>
      <TerminalHeader title="LOGS » SYSTEM" state={state} />
      <Menu options={options} onSelect={onBack} body={body} animateBody={true} playSound={playSound} />
    </div>
  );
};
