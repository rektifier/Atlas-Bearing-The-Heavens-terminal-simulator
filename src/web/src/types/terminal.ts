export interface GlobalState {
  reroute_dru_power: boolean;
  shuttle_on: boolean;
  life_support_on: boolean;
  is_computer: boolean;
  loadingramp_open: boolean;
}

export interface MenuOption {
  label: string;
  action: () => void;
}

export type MenuScreen =
  | 'main'
  | 'system_diagnostics'
  | 'logs'
  | 'logs_system'
  | 'logs_cargo'
  | 'logs_roster'
  | 'ship_layout'
  | 'controls'
  | 'controls_dru_power'
  | 'controls_shuttle'
  | 'controls_self_destruct';
