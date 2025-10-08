import { useEffect, useState } from 'react';
import { CRTScreen } from './components/CRTScreen';
import { MainScreen } from './screens/MainScreen';
import { SystemDiagnosticsScreen } from './screens/SystemDiagnosticsScreen';
import { LogsScreen } from './screens/LogsScreen';
import { LogsSystemScreen } from './screens/LogsSystemScreen';
import { LogsCargoScreen } from './screens/LogsCargoScreen';
import { LogsRosterScreen } from './screens/LogsRosterScreen';
import { ShipLayoutScreen } from './screens/ShipLayoutScreen';
import { ControlsScreen } from './screens/ControlsScreen';
import { ControlsDruPowerScreen } from './screens/ControlsDruPowerScreen';
import { ControlsShuttleScreen } from './screens/ControlsShuttleScreen';
import { ControlsSelfDestructScreen } from './screens/ControlsSelfDestructScreen';
import { useTerminalState } from './hooks/useTerminalState';
import { useAudioPlayer } from './hooks/useAudioPlayer';

function App() {
  const { state, updateState, currentScreen, navigateTo, goBack } = useTerminalState();
  const { playSound } = useAudioPlayer();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        if (state.reroute_dru_power) {
          updateState({ is_computer: true });
        }
      } else if (e.key === 't' || e.key === 'T') {
        updateState({ is_computer: false });
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [state.reroute_dru_power, updateState]);

  const handleExit = () => {
    setExiting(true);
    setTimeout(() => {
      window.close();
    }, 2000);
  };

  const handleRedirectDruPower = () => {
    playSound('dru_redirect');
    updateState({
      reroute_dru_power: true,
      life_support_on: true,
    });
    goBack();
  };

  const handleToggleLoadingRamp = () => {
    if (state.loadingramp_open) {
      playSound('ramp_close');
    } else {
      playSound('ramp_open');
    }
    updateState({ loadingramp_open: !state.loadingramp_open });
  };

  const handleStartShuttle = () => {
    playSound('shuttle_start');
    updateState({ shuttle_on: true });
    goBack();
  };

  if (exiting) {
    return (
      <CRTScreen>
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-center animate-pulse">
            Exiting USCC Atlas Control Terminal. Goodbye!
          </div>
        </div>
      </CRTScreen>
    );
  }

  return (
    <CRTScreen>
      {currentScreen === 'main' && (
        <MainScreen state={state} onNavigate={navigateTo} onExit={handleExit} playSound={playSound} />
      )}

      {currentScreen === 'system_diagnostics' && (
        <SystemDiagnosticsScreen state={state} onBack={goBack} playSound={playSound} />
      )}

      {currentScreen === 'logs' && (
        <LogsScreen state={state} onNavigate={navigateTo} onBack={goBack} playSound={playSound} />
      )}

      {currentScreen === 'logs_system' && <LogsSystemScreen state={state} onBack={goBack} playSound={playSound} />}

      {currentScreen === 'logs_cargo' && <LogsCargoScreen state={state} onBack={goBack} playSound={playSound} />}

      {currentScreen === 'logs_roster' && <LogsRosterScreen state={state} onBack={goBack} playSound={playSound} />}

      {currentScreen === 'ship_layout' && <ShipLayoutScreen state={state} onBack={goBack} playSound={playSound} />}

      {currentScreen === 'controls' && (
        <ControlsScreen
          state={state}
          onNavigate={navigateTo}
          onBack={goBack}
          onToggleLoadingRamp={handleToggleLoadingRamp}
          onStartShuttle={handleStartShuttle}
          playSound={playSound}
        />
      )}

      {currentScreen === 'controls_dru_power' && (
        <ControlsDruPowerScreen
          state={state}
          onRedirect={handleRedirectDruPower}
          onBack={goBack}
          playSound={playSound}
        />
      )}

      {currentScreen === 'controls_shuttle' && (
        <ControlsShuttleScreen state={state} onStartShuttle={handleStartShuttle} onBack={goBack} playSound={playSound} />
      )}

      {currentScreen === 'controls_self_destruct' && (
        <ControlsSelfDestructScreen state={state} onExit={handleExit} playSound={playSound} />
      )}

      <div className="mt-8 text-xs opacity-50">
        <div>Press 'C' to switch to Computer mode (requires DRU power)</div>
        <div>Press 'T' to switch to Terminal mode</div>
        <div>Use Arrow Keys and Enter to navigate</div>
        <div>Press ESC to go back</div>
        <div>&nbsp;</div>
        <div>[ © rektifier, all of them times ]</div>
      </div>
    </CRTScreen>
  );
}

export default App;
