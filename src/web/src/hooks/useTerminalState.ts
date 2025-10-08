import { useState } from 'react';
import { GlobalState, MenuScreen } from '../types/terminal';

export const useTerminalState = () => {
  const [state, setState] = useState<GlobalState>({
    reroute_dru_power: false,
    shuttle_on: false,
    life_support_on: false,
    is_computer: false,
    loadingramp_open: false,
  });

  const [currentScreen, setCurrentScreen] = useState<MenuScreen>('main');
  const [screenHistory, setScreenHistory] = useState<MenuScreen[]>([]);

  const updateState = (updates: Partial<GlobalState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const navigateTo = (screen: MenuScreen) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const previous = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previous);
    }
  };

  return {
    state,
    updateState,
    currentScreen,
    navigateTo,
    goBack,
    screenHistory,
  };
};
