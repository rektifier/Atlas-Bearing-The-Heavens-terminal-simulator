import { GlobalState } from '../types/terminal';

interface TerminalHeaderProps {
  title: string;
  state: GlobalState;
}

export const TerminalHeader = ({ title, state }: TerminalHeaderProps) => {
  const druPower = state.reroute_dru_power
    ? '[ REDIRECTED ]'
    : '[:##        :] 14 %';
  const lifeSupport = state.life_support_on
    ? '[:#         :] 01 %'
    : '[  OFFLINE   ]';
  const connectedDevice = state.is_computer
    ? 'CONNECTED DEVICE: COMPUTER'
    : 'CONNECTED DEVICE: TERMINAL';

  return (
    <div className="mb-6 select-none">
      <pre className="text-sm leading-tight">
        {`╔═══════════════════╦═════════════╦═══════════════════════╗
║ MS SYSTEM CONSOLE ║ VER. 0.5.12 ║ DRU POWER             ║
╠═══════════════════╩═════════════╣ ${druPower.padEnd(21, ' ')} ║
║  ${title.padEnd(31, ' ')}║ LIFE SUPPORT          ║
║  ${connectedDevice.padEnd(31, ' ')}║ ${lifeSupport.padEnd(21, ' ')} ║
╚═════════════════════════════════╩═══════════════════════╝`}
      </pre>
    </div>
  );
};
