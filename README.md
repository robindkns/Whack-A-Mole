Whack-a-Mole Game

Description

Whack-a-Mole is an adaptation of the popular game where the player must hit randomly appearing moles to score points. The game is built using React, Redux, and TypeScript for state management and interactions. Instructions asked for the datas to be handled by mocking them, so I also used Axios Mock. The goal is to score as many points as possible within 2 minutes, with a leaderboard displaying the top 10 scores.

Features

- Game Grid Display: A 3-row grid with 4 moles in each row.
- Time Limit: The player has 2 minutes to hit the moles.
- Dynamic Sounds: Opening music, game music, click sound effects, and hit sound effects.
- Leaderboard: Displays the top scores with the current player's score visible.
- Variable Difficulty: The moles appear at adjustable speeds depending on the selected difficulty level.
- Volume Control: The player can adjust the game's volume.
- Game Animations: Visual effects are triggered when a mole is successfully hit.

Technologies Used

- React for the user interface management.
- Redux for managing global game state (score, active mole, timer, etc.).
- TypeScript for type safety and maintainability of the code.
- SASS for styling management.
- Axios for simulating API calls (e.g., retrieving scores).
- React Icons for volume icons and the back button.
- Audio for managing music and sound effects.

Installation / Prerequisites

Make sure you have Node.js and npm installed on your machine.

Installation Steps

Clone the repository:

git clone https://github.com/username/whack-a-mole.git
cd whack-a-mole

Install dependencies:

npm install

Start the development server:

npm start
This will open the application in your default browser at http://localhost:3000.

How It Works

- Start the game: The player starts the game by clicking the "Start" button in the main menu.
- Difficulty : The player has to choice a difficulty (Hard mode is locked by default, the player has to play at least one game)
- Mole appearance: Moles appear randomly on the screen at a speed determined by the difficulty level.
- Hit the moles: The player must click on the appearing moles to score points.
- Timer: The game ends after 2 minutes, and the player's final score is displayed.
- Leaderboard: At the end of the game, the player can enter his username (3 capital letters), then a leaderboard shows the top 10 highest scores.

Additional Features

- Difficulty Mode: The player can select different difficulty levels, which adjust the number of moles and the time between their appearances.
- Music and Sound Effects: The player can enable/disable background music and adjust the volume using a turn ON/OFF button.
- Impact Animation: When a mole is hit, a visual/sound effect is triggered to indicate a successful hit.

Author

Robin Lefèvre