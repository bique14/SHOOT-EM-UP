export const LEADERBOARD_LOADED = 'LEADERBOARD_LOADED'
export const LOGGED_IN = 'LOGGED_IN'
export const MOVE_OBJECTS = 'MOVE_OBJECTS'
export const START_GAME = 'START_GAME'

export const leaderboardLoaded = (players) => ({
  // When the real-time service sends the list of players, 
  // you will use this action to update the Redux store with these players.
  type: LEADERBOARD_LOADED,
  players,
})

export const loggedIn = (players) => ({
  type: LOGGED_IN,
  players,
})

export const moveObjects = (mousePosition) => ({
  type: MOVE_OBJECTS,
  mousePosition,
})

export const startGame = () => ({
  type: START_GAME,
})