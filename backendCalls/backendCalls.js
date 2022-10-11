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
    new:[
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
    open:[
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