import { GenerateRandomString } from "../helperFunctions/helpers"

export const GetUser = async () => {
  return {
    name: 'Smogg',
    premium: false,
    new: true
  }
}

const exampleStoryFull = {
  title: 'storyTitle',
  description: 'storyDesc',
  creator: 'creatorUsername',
  authors: ['author1', 'author2', 'author3'],
  turn: 34,
  playersTurn: true,
  id: GenerateRandomString(),
}

export const GetAvailableRooms = async () => {
  //returns available rooms to jump into
  //max 3 new ones
  //max 3 ongoing ones
  //draws from the room queue
  //filters out those that the player is already part of
  return {
    new: [exampleStoryFull, exampleStoryFull, exampleStoryFull],
    ongoing: [exampleStoryFull, exampleStoryFull]
  }

  // return {
  //   new: [
  //     {
  //       title: 'Little Red Riding Hood',
  //       description: 'A dark tale about a little girl venturing into a forest',
  //       creator: 'noobalot',
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Lost in Space',
  //       description: 'A spaceship goes afloat into the void',
  //       creator: 'carlsagan',
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Prevail',
  //       description: 'A lousy tale of a bunch of random stuff',
  //       creator: 'hickory73',
  //       id: GenerateRandomString(),
  //     }
  //   ],
  //   ongoing: [
  //     {
  //       title: 'Far From Home',
  //       description: 'Charles rides his horse of the beaten path',
  //       creator: 'mrAway',
  //       authors: ['Seb', 'Goobstaf', 'Killer32'],
  //       turn: 21,
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Cruel World',
  //       description: 'A tale of suecidal thoughts',
  //       creator: 'dreamer',
  //       id: GenerateRandomString(),
  //     }
  //   ]
  // }
}

export const GetMyRooms = async () => {
  //returns all rooms I am a part of - gets info from backend
  return {
    open: [exampleStoryFull, exampleStoryFull, exampleStoryFull],
    closed: [exampleStoryFull, exampleStoryFull]
  }

  // return {
  //   open: [
  //     {
  //       title: 'Shitty Day',
  //       description: 'A spaceship goes afloat into the void',
  //       creator: 'carlsagan',
  //       turn: false,
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Without Hesitation',
  //       description: 'A lousy tale of a bunch of random stuff',
  //       creator: 'hickory73',
  //       turn: true,
  //       id: GenerateRandomString(),
  //     }
  //   ],
  //   closed: [
  //     {
  //       title: 'Far From Home',
  //       description: 'Charles rides his horse of the beaten path',
  //       creator: 'mrAway',
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Cruel World',
  //       description: 'A tale of suecidal thoughts',
  //       creator: 'dreamer',
  //       id: GenerateRandomString(),
  //     },
  //     {
  //       title: 'Green Fruits',
  //       description: 'Charles rides his horse of the beaten path',
  //       creator: 'mrAway',
  //       id: GenerateRandomString(),
  //     },
  //   ]
  // }
}

export const GetFinishedStories = async () => {
  //returns all finished stories from backend
  return [exampleStoryFull, exampleStoryFull, exampleStoryFull, exampleStoryFull, exampleStoryFull];

  // return [
  //   {
  //     title: 'Failing Fast',
  //     description: 'A story about a startup',
  //     creator: 'Smogg',
  //     authors: ['Seb', 'Goobstaf', 'Killer32'],
  //     id: GenerateRandomString(),
  //   },
  //   {
  //     title: 'The Red Car',
  //     description: 'Jonas buys a brand new car, only to have it stolen!',
  //     creator: 'BurnDownTheDisco',
  //     authors: ['GoatPoet', 'Amadeus', 'StevenKing'],
  //     id: GenerateRandomString(),
  //   },
  //   {
  //     title: 'Forgotten Planes',
  //     description: 'A desserted svanna with no animals',
  //     creator: 'hunter69',
  //     authors: ['Seb', 'Amadeus', 'Smogg'],
  //     id: GenerateRandomString(),
  //   },
  // ]
}

export const GetStoryKeys = async () => {
  //return the number of story keys for the logged player from the backend
  return 4;
} 