import { GenerateRandomString } from "../helperFunctions/helpers"

//DATA
const rooms = [];

/* Room Object Structure
{
  id:
  story: {
    title:
    description:
    scenarios: [{
      author:
      text:
    }]
  }
  creator:
  authors: []
  closed:
  turn: 'whos turn it is'
}
*/

//USER
let loggedUser;

export const GetUser = async () => {

  user = {
    name: 'EpicWriter2000',
    premium: true,
    new: false
  };

  loggedUser = user;

  return user;

}

export const CreateNewUser = async () => {

  user = {
    name: 'FroggyBoy',
    premium: false,
    new: true
  };

  loggedUser = user;

  return user;

}

//STORIES
export const GetAvailableRooms = async () => {

  const availableRooms = rooms.filter(room => (
    room.creator != loggedUser.name
    && !room.authors.includes(loggedUser.name)
    && room.authors.length < 3
  ));

  const newRooms = availableRooms.filter(room => (
    room.story.scenarios.count < 4
  ))

  const ongoingRooms = availableRooms.filter(room => (
    room.story.scenarios.count >= 4
  ))

  return {
    new: newRooms,
    ongoing: ongoingRooms
  }
}

export const GetMyRooms = async () => {

  const myRooms = rooms.filter(room => (
    room.creator == loggedUser.name
    ||
    room.authors.includes(loggedUser.name)
  ));

  const openRooms = myRooms.filter(room => (
    !room.closed
  ));

  const closedRooms = myRooms.filter(room => (
    room.closed
  ));

  return {
    open: openRooms,
    closed: closedRooms
  };

}

export const GetFinishedStories = async () => {
  //should make sure to clean up the data a bit, so that people dont get access to all scenarios when they dont need it
  const finishedStories = rooms.filter(room => room.closed);
  return finishedStories;
}

export const GetStoryKeys = async () => {
  return 4;
}

export const CreateNewRoom = async (title, description, opening) => {
  //add a new story to the database and get back an ID for the story
  const newRoom = {
    story: {
      title: title,
      description: description,
      scenarios: [{
        author: loggedUser.name,
        text: opening
      }]
    },
    creator: loggedUser.name,
    authors: [],
    closed: false,
    id: GenerateRandomString(),
  }
  rooms.push(newRoom);
  return newRoom.id;
}

//HELPERS
const exampleStoryFull = {
  title: 'storyTitle',
  description: 'storyDesc',
  creator: 'creatorUsername',
  authors: ['author1', 'author2', 'author3'],
  turn: 34,
  playersTurn: true,
  id: GenerateRandomString(),
}

const GenerateRandomStoryArray = count => {
  const stories = [];
  for (let i = 0; i < count; i++) {
    stories.push(GenerateRandomStory());
  }
  return stories;
}

const GenerateRandomStory = () => {
  const story = {
    title: PickRandomItem(fakeTitles),
    description: 'An epic tale of an epic adventure',
    creator: PickRandomItem(fakeWriters),
    authors: [PickRandomItem(fakeWriters), PickRandomItem(fakeWriters), PickRandomItem(fakeWriters)],
    turn: Math.floor(Math.random() * 40),
    playersTurn: false,
    id: GenerateRandomString(),
  };
  return story;
}

const GenerateRandomRoom = (authorCount, loggedPlayerIsIn, scenarioCount, closed, ) => {
  //generate and return a room with some random text etc based on the passed info
}

const PickRandomItem = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const fakeTitles = [
  'Changeling With Sins',
  'Duke Without A Goal',
  'Lions Of The World',
  'Blacksmiths Of Yesterday',
  'Traitors And Phantoms',
  'Boys And Traitors',
  'Cause Of Tomorrow',
  'Demise Of The North',
  'Changing The Demons',
  'Searching For Nature',
  'Fox Of Rain',
  'Ghost Of Sunshine',
  'Little Birds In My Town',
  'Bears Of Fantasia',
  'Kings And Little Dragons',
  'Cats And Owls',
  'Hat Of Fire',
  'Cup Of Mystery',
  'Jealous Of Flowers',
  'Amazing Life Of The Mountains',
  'Bear Of Tomorrow',
  'Little Dragon Of Gold',
  'Rabbits Of Miracles',
  'Boys Of Dreams',
  'Kids And Kittens',
  'Goats And Bunnies',
  'House Of Puzzles',
  'Chimney Of My Imagination',
  'Reading With My Friend',
  'Amazing World Of My Best Friend',
  'Boy Of Wonder',
  'Boy Of Utopia',
  'Foxes Of Fantasia',
  'Kings On The Moon',
  'Frogs And Babies',
  'Little Ducks And Kings',
  'Car Of Mysteries',
  'Field Of Wood',
  'Playing With My New Pet',
  'Playing With My Sister',
];

const fakeWriters = [
  'billickin',
  'snittle',
  'tomkinley',
  'jefferson',
  'clarriker',
  'skewton',
  'smike',
  'newman',
  'ninetta',
  'lummy',
  'chollop',
  'sluffen',
  'sownds',
  'tappertit',
  'chevy',
  'chestle',
  'arethusa',
  'spyers',
  'compeyson',
  'defarge',
  'fibbitson',
  'flopson',
  'lavinia',
  'septimus',
  'curdle',
  'skettles',
  'blight',
  'chopkins',
  'gazingi',
  'kibble',
  'slum',
  'mortimer',
  'sleary',
  'brogson',
  'todd',
]