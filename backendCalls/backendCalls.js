import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";
import { GenerateRandomRoomArray, GenerateRandomRoom, maxScenarioCount } from './dataGeneration.js';
import {AsyncStorage} from 'react-native';

console.log('backend started ' + new Date());

//VARS
let rooms;
let storyKeys = 4;

//LOAD DATA FROM ASYNC FILE STORAGE
const LoadRoomData = async () => {

  // console.log('regenerated rooms');
  // rooms = GenerateRandomRoomArray(10, 20, 6, 3)
  // await AsyncStorage.setItem('rooms', JSON.stringify(rooms));

  const loadedRoomsData = await AsyncStorage.getItem('rooms');

  if (loadedRoomsData) {
    console.log('loaded rooms data successfully!');
    rooms = JSON.parse(loadedRoomsData);
  }
  else {
    console.log('created new room data');
    rooms = GenerateRandomRoomArray(10, 20, 6, 3)
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
  };
}

//USER
export const GetLoggedUserName = () => {
  return 'flopson'
}

export const GetUser = async () => {
  return {
    name: 'flopson',
    premium: true,
    new: false
  };
}

// export const CreateNewUser = async () => {

//   console.log('new user created');

//   user = {
//     name: PickRandomFromArray(fakeWriters),
//     premium: false,
//     new: true
//   };

//   loggedUser = user;

//   return user;

// }

//ROOMS
const UserIsInRoom = (room, name) => {

  let isInRoom = false;
  if (room.creator.name == name) isInRoom = true;
  room.authors.forEach(author => {
    if (author.name == name) isInRoom = true;
  })

  // if (room.creator.name == 'flopson') console.log('flopson is in room with title: ', room.title);
  // room.authors.forEach(author => {
  //   if (author.name == 'flopson') console.log('flopson is in room with title: ', room.title);
  // })

  
  return isInRoom

}

export const GetAvailableRooms = async () => {

  const availableRooms = rooms.filter(room => (
    !UserIsInRoom(room, GetLoggedUserName())
    && (room.authors.length < 3)
  ));

  const newRooms = availableRooms.filter(room => (
    room.scenarios.length < 4
  ))
  const roomWithLeavers = availableRooms.filter(room => (
    room.scenarios.length >= 4
  ))

  return { new: newRooms, ongoing: roomWithLeavers };
}

export const GetMyRooms = async () => {

  const myRooms = rooms.filter(room => (
    UserIsInRoom(room, GetLoggedUserName())
  ));

  const openRooms = myRooms.filter(room => (
    (room.scenarios.length < maxScenarioCount)
  ));
  const closedRooms = myRooms.filter(room => (
    (room.scenarios.length == maxScenarioCount)
  ));

  return { open: openRooms, closed: closedRooms };
}

export const GetFinishedStories = async () => {
  const finishedStories = rooms.filter(room => (room.scenarios.length == maxScenarioCount));
  return finishedStories;
}

export const GetStoryKeys = async () => {
  return storyKeys;
}

export const CreateRoom = async (title, description, opening) => {

  console.log('creating a new room');

  const room = {
    title: title,
    description: description,
    creator: GetUser(),
    authors: [],
    turnsTaken: 1,
    nextPlayer: null,
    id: GenerateRandomString(),
    scenarios: [{
      author: GetUser(),
      text: opening
    }],
    deadline: (new Date().getTime() + 172800000) //2 days from now
  };

  rooms.push(room);
  await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
  return room.id;
}

export const GetRoomData = async roomId => {
  let roomToReturn = null;
  rooms.forEach((room, i) => {
    if (room.id == roomId) {
      roomToReturn = room;
    }
  })
  return roomToReturn;
}

export const LogAllRooms = async () => {

  console.log('ALL ROOMS:')
  rooms.forEach((room, i) => {
    console.log(room.title, " ", room.id);
  })

}

//SCENARIOS
export const UploadScenario = async (text, roomId) => {

  //MAKE A SHITLOAD OF CHECKS TO MAKE SURE THIS UPLOAD IS LEGIT

  //SETUP THE ROOM
  room = await GetRoomData(roomId);
  room.scenarios.push({
    text: text,
    author: GetUser(),
    id: GenerateRandomString()
  })
  room.turnsTaken++;
  room.nextPlayer++;
  room.nextPlayer > room.authors.length && (room.nextPlayer=0);
  room.deadline = new Date().getTime() + 172800000; //turn into helper function ?

  //UPLOAD THE FULL ROOMS OBJECT TO THE DB
  await AsyncStorage.setItem('rooms', JSON.stringify(rooms));

  return true;

}

//RUN ON START
LoadRoomData();