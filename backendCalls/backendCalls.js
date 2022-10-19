import { GenerateRandomString, PickRandomFromArray, GetRandomInt } from "../helperFunctions/helpers"
import { fakeWriters, fakeTitles, scenarioTextPlaceholder } from "./fakeData";
import { AsyncStorage } from 'react-native';
import { GenerateRandomRoomArray, GenerateRandomRoom, maxScenarioCount } from './dataGeneration.js';

console.log('backend started ' + new Date());

//VARS
let rooms;
export let loggedUser = user = {
  name: PickRandomFromArray(fakeWriters),
  premium: true,
  new: false
};;
let storyKeys = 4;

//LOAD DATA FROM ASYNC FILE STORAGE
const LoadRoomData = async () => {

  // rooms = GenerateRandomRoomArray(10, 20, 6, 3)
  // await AsyncStorage.setItem('rooms', JSON.stringify(rooms));

  const loadedRoomsData = await AsyncStorage.getItem('rooms');

  if (loadedRoomsData) {
    rooms = JSON.parse(loadedRoomsData);
  }
  else {
    rooms = GenerateRandomRoomArray(10, 20, 6, 3)
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
  };
}

//USER
export const GetLoggedUserName = () => {
  if (!loggedUser) return false;
  if (!loggedUser.name) return false;
  return loggedUser.name;
}

export const GetUser = async () => {

  user = {
    name: PickRandomFromArray(fakeWriters),
    premium: true,
    new: false
  };

  loggedUser = user;

  return user;

}

export const CreateNewUser = async () => {

  user = {
    name: PickRandomFromArray(fakeWriters),
    premium: false,
    new: true
  };

  loggedUser = user;

  return user;

}

//ROOMS
const UserIsInRoom = (room, name) => {

  let isInRoom = false;
  if (room.creator == name) isInRoom = true;
  room.authors.forEach(author => {
    if (author.name == name) isInRoom = true;
  })
  return isInRoom

}

export const GetAvailableRooms = async () => {

  const availableRooms = rooms.filter(room => (
    !UserIsInRoom(room, loggedUser.name)
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
    UserIsInRoom(room, loggedUser.name)
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

export const CreateNewRoom = async (title, description, opening) => {

  const room = {
    title: title,
    description: description,
    creator: loggedUser.name,
    authors: [],
    turnsTaken: 1,
    nextPlayer: null,
    id: GenerateRandomString(),
    scenarios: [{
      author: loggedUser.name,
      text: opening
    }]
  };

  rooms.push(room);
  await AsyncStorage.setItem('rooms', rooms);
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

//RUN ON START
LoadRoomData();
loggedUser = GetUser();