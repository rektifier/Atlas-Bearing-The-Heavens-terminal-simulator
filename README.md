# Atlas Bearing The Heavens - Terminal Simulator

### Web version -> [https://rektifier.github.io/Atlas-Bearing-The-Heavens-terminal-simulator/](https://rektifier.github.io/Atlas-Bearing-The-Heavens-terminal-simulator/)  
  
A console-based simulation program designed for use alongside the [Atlas Bearing the Heavens](https://www.drivethrurpg.com/en/product/504925/atlas-bearing-the-heavens-a-mothership-pamphlet) adventure module for the TTRPG Mothership. The program replicates interactions with a terminal or computer aboard the USCC Atlas, where the players can explore logs, diagnostics, and interact with the ship's systems through a retro-style interface, adding depth and immersion through interactive menus and sound effects.

## Features

- **Dynamic Interface**: Navigate a fully operational ship console with evolving system statuses.
- **Audio Integration**: Plays sounds for key actions, enhancing immersion.
- **Interactive System Simulation**:
  - Redirect power to critical systems.
  - Enter **"Computer Mode"** for advanced operations after rerouting DRU power.
  - Explore detailed ship logs and system diagnostics.
- **Keyboard Controls**:
  - Use arrow keys to navigate menus.
  - Press `C` to activate **Computer Mode** (after rerouting power).
  - Press `T` to return to **Terminal Mode**.

## Requirements

To run the program, you’ll need the following:

- **Python 3.7 or higher**: Ensure Python is installed on your system.
- **Dependencies**:
  - `pygame` for audio playback.
  - `curses` (built into most Python installations on Linux and macOS; may require additional setup on Windows).
- **Sound Files**: Ensure the required sound files (e.g., `ABTH_terminal_UI.mp3`) are in a `sounds` directory.

## Gameplay Highlights
Here are some things to discover while running the program:

- **Redirecting Power:** Start by rerouting DRU power. Once done, key systems like the computer will come online, unlocking new interactions.
- **Computer Mode (C):** After redirecting DRU power, press C to enter Computer Mode, which offers a more advanced interface.
- **Logs and Diagnostics:**
  - Explore system logs to uncover the ship's tragic history and critical failures.
  - Access system diagnostics to check ship integrity and operational statuses.
- **Immersive Sound Design:** Every interaction is accompanied by retro-style sound effects, providing an engaging tactile experience.

## Remarks
This terminal concept is inspired by several iterations of the console mechanic used in the Mothership RPG adventure Haunting of Ypsilon-14.  
[Tuesday Knight Games](https://www.tuesdayknightgames.com/)  
[TRAASH](https://www.traaa.sh/the-ypsilon-14-terminal)
