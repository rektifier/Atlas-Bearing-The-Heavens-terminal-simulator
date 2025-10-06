import curses
import time
import sys
from dataclasses import dataclass
import pygame  # Import pygame for audio playback

@dataclass
class GlobalState:
    reroute_dru_power: bool = False
    shuttle_on: bool = False
    life_support_on: bool = False
    is_computer: bool = False
    loadingramp_open: bool = False

state = GlobalState()

# Initialize pygame for audio playback
pygame.mixer.init()

def play_audio(file_path):
    # Play an MP3 file.
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()
    
def render_header(stdscr, title):
    # Renders the header with the given title.
    dru_power = "[ REDIRECTED ]" if state.reroute_dru_power else "[:▓▓        :] 14 %"
    life_support = "[:▓         :] 01 %" if state.life_support_on else "[  OFFLINE   ]"
    connected_device = "CONNECTED DEVICE: COMPUTER" if state.is_computer else "CONNECTED DEVICE: TERMINAL"

    header_lines = [
        "╔═══════════════════╦═════════════╦═══════════════════════╗",
        "║ MS SYSTEM CONSOLE ║ VER. 0.5.12 ║ DRU POWER             ║",  
        f"╠═══════════════════╩═════════════╣ {dru_power:<21} ║",
        f"║  {title:<31}║ LIFE SUPPORT          ║",
        f"║  {connected_device:<31}║ {life_support:<21} ║",
        "╚═════════════════════════════════╩═══════════════════════╝"
    ]
    for i, line in enumerate(header_lines):
        stdscr.addstr(i + 1, 2, line)  # Add some padding

def create_menu(stdscr, title, options, body=None, animate_body=False, parent=None):
    # Helper function to create a Menu instance.
    return Menu(
        stdscr=stdscr,
        title=title,
        options=options,
        parent=parent,
        body=body,
        animate_body=animate_body
    )

class Menu:
    def __init__(self, stdscr, title, options, parent=None, body=None, animate_body=False):                 
        self.stdscr = stdscr
        self.title = title
        self.body = body
        self.options = options
        self.parent = parent
        self.current_option = 0
        self.animate_body = animate_body

    def display_message(self, stdscr, message):
        # Displays a temporary message to the user.
        stdscr.clear()
        lines = message.strip().splitlines()
        for i, line in enumerate(lines):
            stdscr.addstr(5 + i, 5, line)
        stdscr.refresh()
        time.sleep(2)


    def display_body(self, start_y):
        # Displays the body of the menu.
        if self.body:
            if callable(self.body):
                self.body(self.stdscr)
            else:
                body_lines = self.body.strip().splitlines()
                for i, line in enumerate(body_lines):
                    self.stdscr.addstr(start_y + i, 2, line)
                    if self.animate_body:
                        time.sleep(0.13)
                        self.stdscr.refresh()
                return len(body_lines) + 1
        return 0

    def display_options(self, start_y):
        # Displays the menu options.
        for idx, (option, _) in enumerate(self.options):
            x = 4
            y = start_y + idx
            if idx == self.current_option:
                self.stdscr.attron(curses.color_pair(1))
                self.stdscr.addstr(y, x, option)
                self.stdscr.attroff(curses.color_pair(1))
            else:
                self.stdscr.addstr(y, x, option)

    def display(self):

        self.stdscr.clear()

        height, width = self.stdscr.getmaxyx()        
        if width < 120 or height < 36:  # Ensure terminal width and height are sufficient
            self.stdscr.addstr(0, 0, "Terminal size is too small. Try resizing the window or using a smaller font size.")


        # Renders the menu.
        # self.stdscr.clear()
        render_header(self.stdscr, self.title)
        options_start_y = 8  # Starting Y position for body and options

        # Display Body
        body_length = self.display_body(options_start_y)
        options_start_y += body_length if body_length else 0

        # Display Options
        self.display_options(options_start_y)

        self.stdscr.refresh()

    def navigate(self):
        #Handles user navigation within the menu.
        while True:
            self.display()
            key = self.stdscr.getch()

            if key == curses.KEY_UP:
                play_audio('sounds//ABTH_terminal_UI.mp3')
                self.current_option = (self.current_option - 1) % len(self.options)
            elif key == curses.KEY_DOWN:
                play_audio('sounds//ABTH_terminal_UI.mp3')
                self.current_option = (self.current_option + 1) % len(self.options)

            # activate computer mode if the letter 'c' is pressed ( c for Computer )
            elif chr(key).lower() == 'c':
                if state.reroute_dru_power == True:
                    state.is_computer = True
                    main(self.stdscr) 
            
            # deactivate computer mode if the letter 't' is pressed ( t for Terminal)
            elif chr(key).lower() == 't':
                state.is_computer = False
                main(self.stdscr) 
                
            elif key in [curses.KEY_ENTER, 10, 13]:
                play_audio('sounds//ABTH_terminal_UI.mp3')
                _, action = self.options[self.current_option]
                if action:
                    try:
                        action(self.stdscr)
                    except Exception as e:
                        self.display_message(self.stdscr, f"Error: {e}")
                else:
                    break
            elif key == 27:  # ESC key to go back
                if self.parent:
                    return

    def run(self):
        # Starts the menu navigation.
        self.navigate()

def system_diagnostics(stdscr):
    # Displays the System Diagnostics menu.
    life_support_status = "Online - limited processing capacity due to low power supply." if state.life_support_on else "Offline - life support power terminated."
    body = f""" 
+------------------------+-----------------------------------------------------------------------------+
| SYSTEM COMPONENT       | STATUS                                                                      |
+------------------------+-----------------------------------------------------------------------------+
| OVERALL STATUS         | Critical failure - ship broken in two sections.                             |
|------------------------|-----------------------------------------------------------------------------|
| POWER STATUS           | Main power offline. Auxiliary power designated for DRU operational at 14%.  |
| LIFE SUPPORT STATUS    | {life_support_status:<76}|
| COMMUNICATIONS STATUS  | Damaged - limited internal comms only.                                      |
| NAVIGATION SYSTEM      | Inoperable - navigation system damaged beyond repair.                       |
| STRUCTURAL INTEGRITY   | Compromised - major breaches in several sections.                           |
| CRYO SYSTEMS           | Partially functional - damaged beyond repair.                               |
| ENVIRONMENTAL SENSORS  | Partially operational - detecting hostile conditions outside.               |
| AI CORE STATUS         | Corrupted - limited processing capacity, autonomous behavior unstable.      |
+------------------------+-----------------------------------------------------------------------------+
    """
    menu = create_menu(
        stdscr,
        "SYSTEM DIAGNOSTICS",
        [("BACK", None)],
        body=body,
        animate_body=True
    )
    menu.run()

def logs(stdscr):
    # Displays the Logs menu.
    menu = create_menu(
        stdscr,
        "LOGS",
        [
            ("SYSTEM", logs_system),
            ("CARGO", logs_cargo),
            ("ROSTER", logs_roster),
            ("BACK", None)
        ]
    )
    menu.run()

def logs_system(stdscr):
    # Displays the System Logs menu.
    body = f"""                                                            
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
               """
    menu = create_menu(
        stdscr,
        "LOGS » SYSTEM",
        [("BACK", None)],
        body=body,
        animate_body=True
    )
    menu.run()

def logs_cargo(stdscr):
    # Displays the Cargo Logs menu.
    body = r"""                                                            
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
    """
    menu = create_menu(
        stdscr,
        "LOGS » CARGO",
        [("BACK", None)],
        body=body,
        animate_body=True
    )
    menu.run()

def logs_roster(stdscr):
    # Displays the Roster Logs menu.
    body = r"""                                                            
+--------------------------+--------------------------+--------------------------+
| NAME                     | POSITION                 | AFFILIATION              |
+--------------------------+--------------------------+--------------------------+
| Kyle Mendez              | Corporate representative | Tokugawa Enterprises     |
| Riley Harris             | Flight commander         | Tokugawa Enterprises     |
| Jaxon "Brick" Steele     | Security officer         | Tokugawa Enterprises     |
| Miriam Winters           | Chief medical officer    | Tokugawa Enterprises     |
| Darwin GPP-7.3           | Corporate android        | Tokugawa Enterprises     |
+--------------------------+--------------------------+--------------------------+
| DISASTER RECOVERY UNIT   | Classified               | Classified               |
| PASSANGERS: 1200 souls   |                          |                          |
+--------------------------+--------------------------+--------------------------+
            """
    menu = create_menu(
        stdscr,
        "LOGS » ROSTER",
        [("BACK", None)],
        body=body,
        animate_body=True
    )
    menu.run()

def ship_layout(stdscr):
    # Displays the Ship Layout 
    body = f"""+---------------------------------------+
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
    └─────────┘  └───────┘"""
    menu = create_menu(
        stdscr,
        "SHIP LAYOUT",
        [("BACK", None)],
        body=body,
        animate_body=True
    )
    menu.run()

def controls(stdscr):
    # Displays the Controls menu with dynamic options.
    loadingramp_option = "CLOSE LOADING RAMP" if state.loadingramp_open else "OPEN LOADING RAMP"

    body = f"""
+----------------+----------------------+
| SYSTEM CONTROL | STATE                |
+----------------+----------------------+
| LOADING RAMP   | {"Open  " if state.loadingramp_open else "Closed"}               |
| DRU POWER      | {"Online      " if state.reroute_dru_power else "Online      "}         |
| LIFE SUPPORT   | {"Online              " if state.life_support_on else "Offline             "} |
| SHUTTLE ONE    | ---                  |
| SHUTTLE TWO    | ---                  |
| SHUTTLE THREE  | ---                  |
| SHUTTLE FOUR   | {"Online              " if state.shuttle_on else "Offline             "} |
+----------------+----------------------+
    """
    menu_items = []

    # Conditionally add the "REDIRECT DRU POWER" option
    if state.reroute_dru_power == False:
        menu_items.append(("REDIRECT DRU POWER", controls_dru_power))

    # Conditionally add the "CONTROLS" option
    if state.is_computer == True:
        menu_items.extend([
            (loadingramp_option, control_toggle_loadingramp)
        ])

        # Conditionally add the "START SHUTTLE" option
        if state.shuttle_on == False:
            menu_items.append(("START SHUTTLE FOUR", controls_shuttle))

        menu_items.append(("SELF DESTRUCT", controls_self_destruct))
        

    # Add the common menu items
    menu_items.append(
        ("BACK", main)
    )
    
    menu = create_menu(
        stdscr,
        "CONTROLS",
        menu_items,
        body=body,
        animate_body=False  
    )
    menu.run()

def controls_dru_power(stdscr):
    # Displays the Dru Power Controls menu.
    message = (
        "Once DRU power is redirected it cannot be altered."
        if state.reroute_dru_power 
        else f"""Redirect power from Disaster Recovery Unit. This action cannot be undone. 
        
Select 'REDIRECT DRU POWER' to accept.

"""
    )
    body = message
    menu = create_menu(
        stdscr,
        "CONTROLS » DRU POWER",
        [
            ("REDIRECT DRU POWER", controls_toggle_dru_power),
            ("BACK", None)
        ],
        body=body,
        animate_body=False
    )
    menu.run()

def controls_shuttle(stdscr):
    
    message = (

"Shuttle 4 is already online."
if state.shuttle_on 
else 
f""" 
+------------------------------------------------------------------------------------------+
| This can only be done with the Warden's consent. Is there anyone operating shuttle four? |
+------------------------------------------------------------------------------------------+

Select 'START SHUTTLE FOUR' to accept.
"""
    )
    body = message
    menu = create_menu(
        stdscr,
        "CONTROLS » LIFE SUPPORT",
        [
            ("START SHUTTLE FOUR", control_toggle_shuttle_start),
            ("BACK", None)
        ],
        body=body,
        animate_body=False
    )
    menu.run()    

def control_toggle_shuttle_start(stdscr):
    # Toggles the shuttle state.
    state.shuttle_on = not state.shuttle_on

    play_audio('sounds//ABTH_start_shuttle.mp3')

    controls(stdscr)

def control_toggle_loadingramp(stdscr):
    # Toggles the loading ramp state.
    state.loadingramp_open = not state.loadingramp_open

    if state.loadingramp_open == True :
        play_audio('sounds//ABTH_Loading_ramp_open.mp3')
    else:   
        play_audio('sounds//ABTH_loading_ramp_closed.mp3')
    
    controls(stdscr)

def controls_toggle_dru_power(stdscr):
    # Toggles the reroute life support state.
    state.reroute_dru_power = True  # It's a one-way toggle
    state.life_support_on = True

    play_audio('sounds/ABTH_DRU_redirected_120_minutes.mp3')

    controls(stdscr)

def controls_self_destruct(stdscr):
    # Initiates the self-destruct sequence.
    stdscr.clear()
    messages = [
        "WARNING: Destruction of corporate property is a violation of company policy #2778-B.",
        "TOKUGAWA ENTERPRISES assumes no responsibilities or liabilities resulting from the improper use of this feature.",
        "This will initiate a 10-minute ship self-destruct sequence.",
        "Immediate evacuation suggested."
    ]
    for i, msg in enumerate(messages):
        stdscr.addstr(2 + i * 2, 2, msg)
    stdscr.refresh()

    play_audio('sounds//ABTH_Self_destruct_10_minutes.mp3')
    time.sleep(30)  # Waiting period before self-destruct
    sys.exit()

def exit_program(stdscr):
    # Exits the program gracefully.
    stdscr.clear()
    stdscr.addstr(10, 20, "Exiting USCC Atlas Control Terminal. Goodbye!")
    stdscr.refresh()
    time.sleep(2)
    sys.exit()

def main(stdscr):
    # Main function to initialize the application.
    menu_items = []

    # Add the common menu items
    menu_items.extend([
                ("SYSTEM DIAGNOSTICS", system_diagnostics),
                ("LOGS", logs),
                ("SHIP LAYOUT", ship_layout),
                ("CONTROLS", controls),                           
                ("EXIT", exit_program)
    ])

    try:
        curses.curs_set(0)  # Hide cursor
        init_colors()
        intro_menu = create_menu(
            stdscr,
            "USCC ATLAS CONTROL",
            menu_items,
            body= f"""
TOKUGAWA ENTERPRISES SYSTEMS © 4803 - REBEL LICENSE
---------------------------------------------------

            """
        )
        
        intro_menu.run()
    except KeyboardInterrupt:
        # Handle user-initiated exit (Ctrl+C)
        exit_program(stdscr)
    except Exception as e:
        # Display the exception message for unexpected errors
        stdscr.clear()
        stdscr.addstr(10, 10, f"An unexpected error occurred: {e}")
        stdscr.refresh()
        stdscr.getch()

def init_colors():
    # Initializes color pairs for the curses application.
    curses.start_color()
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)  # Highlighted option
    curses.init_pair(2, curses.COLOR_YELLOW, curses.COLOR_BLACK) # (Unused in current script)

if __name__ == "__main__":
    curses.wrapper(main)
