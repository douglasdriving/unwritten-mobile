export const GetUser = async () => {
  return {
    name: 'Smogg',
    premium: true,
    newUser: false
  }
}

export const GetAvailableRooms = async () => {
  //returns available rooms to jump into
  //max 3 new ones
  //max 3 ongoing ones
  //draws from the room queue
  //filters out those that the player is already part of
  return {
    new: [
      {
        title: 'Little Red Riding Hood',
        description: 'A dark tale about a little girl venturing into a forest',
        author: 'noobalot',
      },
      {
        title: 'Lost in Space',
        description: 'A spaceship goes afloat into the void',
        author: 'carlsagan',
      },
      {
        title: 'Prevail',
        description: 'A lousy tale of a bunch of random stuff',
        author: 'hickory73',
      }
    ],
    ongoing: [
      {
        title: 'Far From Home',
        description: 'Charles rides his horse of the beaten path',
        author: 'mrAway',
      },
      {
        title: 'Cruel World',
        description: 'A tale of suecidal thoughts',
        author: 'dreamer',
      }
    ]
  }
}

export const GetMyRooms = async () => {
  //returns all rooms I am a part of - gets info from backend
  return {
    open: [
      {
        title: 'Shitty Day',
        description: 'A spaceship goes afloat into the void',
        author: 'carlsagan',
        turn: false,
      },
      {
        title: 'Without Hesitation',
        description: 'A lousy tale of a bunch of random stuff',
        author: 'hickory73',
        turn: true,
      }
    ],
    closed: [
      {
        title: 'Far From Home',
        description: 'Charles rides his horse of the beaten path',
        author: 'mrAway',
      },
      {
        title: 'Cruel World',
        description: 'A tale of suecidal thoughts',
        author: 'dreamer',
      },
      {
        title: 'Green Fruits',
        description: 'Charles rides his horse of the beaten path',
        author: 'mrAway',
      },
    ]
  }
}

export const GetFinishedStories = async () => {
  //returns all finished stories from backend
  return [
    {
      title: 'Failing Fast',
      description: 'A story about a startup',
      creator: 'Smogg',
      authors: ['Seb', 'Goobstaf', 'Killer32'],
    },
    {
      title: 'The Red Car',
      description: 'Jonas buys a brand new car, only to have it stolen!',
      creator: 'BurnDownTheDisco',
      authors: ['GoatPoet', 'Amadeus', 'StevenKing'],
    },
    {
      title: 'Forgotten Planes',
      description: 'A desserted svanna with no animals',
      creator: 'hunter69',
      authors: ['Seb', 'Amadeus', 'Smogg'],
    },
  ]
}

const exampleStoryFull = {
  title: 'storyTitle',
  description: 'storyDesc',
  creator: 'creatorUsername',
  authors: ['author1', 'author2', 'author3'],
  turn: false,
}

export const GetStoryKeys = async () => {
  //return the number of story keys for the logged player from the backend
  return 4;
} 