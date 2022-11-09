const API_ENDPOINT = "https://unwritten-backend.herokuapp.com";

//TEST CODE
console.log('backend call script started at' + new Date());

//USER
export const GetUser = async () => {

  const response = await fetch(`${API_ENDPOINT}/user`);
  const user = await response.json();
  return user;

}
export const GetLoggedUserName = async () => {
  const user = await GetUser();
  return user.name;
}
export const GetStoryKeys = async () => {
  const user = await GetUser();
  return user.room_keys;
}
export const signIn = async (email, password) => {

  const response = await fetch(
    `${API_ENDPOINT}/user/login?email=${email}&password=${password}`,
    { method: "POST" }
  );

  if (response.ok) {
    const jsonResponse = await response.json();
    return { ok: true, message: jsonResponse.message, token: jsonResponse.token };
  }
  else{
    return{ok: false, message: 'wrong email or password', token: null}
  }

}

//ROOMS
export const GetAvailableRooms = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/available`);
  const availableRooms = await response.json();

  const newRooms = availableRooms.filter(room => (
    room.scenario_count < 4
  ))
  const roomWithLeavers = availableRooms.filter(room => (
    room.scenario_count >= 4
  ))

  return { new: newRooms, ongoing: roomWithLeavers };

}

export const GetMyRooms = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/user`);
  const myRooms = await response.json();

  const openRooms = myRooms.filter(room => (
    (!room.finished)
  ));
  const closedRooms = myRooms.filter(room => (
    (room.finished)
  ));

  return { open: openRooms, closed: closedRooms };
}

export const GetFinishedStories = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/archive`);
  const finishedStories = await response.json();
  return finishedStories;

}

export const CreateRoom = async (title, description, opening) => {

  const querystring = `title=${title}&description=${description}&scenario=${opening}`
  const response = await fetch(`${API_ENDPOINT}/room/?${querystring}`, {
    method: "POST"
  });
  const roomId = await response.json().roomId;
  return roomId;

}

export const GetRoomData = async roomId => {

  const response = await fetch(`${API_ENDPOINT}/room/data/${roomId}`);
  const room = await response.json();
  return room;

}

export const JoinRoom = async (roomId) => {

  const response = await fetch(`${API_ENDPOINT}/room/join?room_id=${roomId}`, {
    method: "POST"
  });
  return response.ok;

}

//SCENARIOS
export const UploadScenario = async (text, roomId) => {

  const response = await fetch(`${API_ENDPOINT}/scenario/?room_id=${roomId}&text=${text}`, {
    method: "POST"
  });
  return response.ok;

}


