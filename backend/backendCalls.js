const API_ENDPOINT = "https://unwritten-backend.herokuapp.com";
//const API_ENDPOINT = "http://localhost:5000";

//Headers
let authToken;
export const setAuthToken = (newToken) => {
  authToken = newToken;
}
export const hasToken = () => {
  return (authToken && authToken != '');
}
export const backendCallToken = () => {
  return authToken;
}

const AuthHeader = () => {
  return new Headers({
    'Authorization': authToken
  })
}
const GetFetch = () => {
  if (!authToken) {
    console.error('no auth token to fetch with');
  }
  return { headers: AuthHeader(authToken) };
}
const PostFetch = () => {
  return {
    method: "POST",
    headers: AuthHeader(authToken)
  };
}

//USER
export const GetUser = async () => {

  const response = await fetch(`${API_ENDPOINT}/user`, GetFetch());
  if (!response.ok) {
    console.error('failed to fetch user from the backend');
    return null;
  }
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
  else {
    return { ok: false, message: 'fail', token: null }
  }

}
export const signUp = async (email, password, name, pushToken) => {

  const response = await fetch(
    `${API_ENDPOINT}/user/create?email=${email}&password=${password}&name=${name}&pushToken=${pushToken}`,
    PostFetch()
  );

  const jsonResponse = await response.json();
  jsonResponse.ok = response.ok;

  return jsonResponse;

}

//ROOMS
export const GetAvailableRooms = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/available`, GetFetch());
  const availableRooms = await response.json();
  return { new: availableRooms.new, ongoing: availableRooms.old };

}
export const GetAvailableRoomsAsSingleList = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/available`, GetFetch());
  const rooms = await response.json();
  const list = rooms.new.concat(rooms.old);
  return list;

}
export const GetMyRooms = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/user`, GetFetch());
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

  const response = await fetch(`${API_ENDPOINT}/room/archive`, GetFetch());
  const finishedStories = await response.json();
  return finishedStories;

}
export const GetOngoingCamps = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/ongoing`, GetFetch());
  const camps = await response.json();
  return camps;

}
export const CreateRoom = async (title, description, opening) => {

  const querystring = `title=${title}&description=${description}&scenario=${opening}`
  const response = await fetch(`${API_ENDPOINT}/room/?${querystring}`, PostFetch());
  const jsonResponse = await response.json();
  return jsonResponse;

}
export const GetRoomData = async (roomId) => {

  const response = await fetch(`${API_ENDPOINT}/room/data/${roomId}`, GetFetch());
  if (response.ok == false) {
    return false;
  }
  const room = await response.json();

  // if (room.turn_end) {
  //   console.log('room returned turn end that is: ', room.turn_end);
  //   const now = new Date();
  //   const diff = now.getTimezoneOffset();
  //   console.log('the diff is: ', diff);
  //   if (diff != 0) {
  //     room.turn_end = new Date(new Date(room.turn_end).getTime() - (diff * 60 * 1000));
  //     console.log('so setting the new turn_end to ', room.turn_end);
  //   }
  // }

  return room;

}
export const JoinRoom = async (roomId) => {

  const response = await fetch(`${API_ENDPOINT}/room/join?room_id=${roomId}`, PostFetch());
  return response.ok;

}
export const GetChars = async (roomId, userId) => {

  const response = await fetch(
    `${API_ENDPOINT}/room/user/chars?roomId=${roomId}&userId=${userId}`,
    GetFetch()
  );
  const jsonResponse = await response.json();

  if (!jsonResponse.ok) {
    console.error(jsonResponse.message);
    return null;
  }

  return jsonResponse.chars;

}
export const GetRoomDeadline = async (roomId) => {

  const response = await fetch(
    `${API_ENDPOINT}/room/deadline?roomId=${roomId}`,
    GetFetch()
  );
  const jsonResponse = await response.json();

  if (!jsonResponse.ok) {
    console.error(jsonResponse.message);
    return null;
  }

  return jsonResponse.deadline;

}

//SCENARIOS
export const UploadScenario = async (text, roomId) => {
  const response = await fetch(`${API_ENDPOINT}/scenario/?roomId=${roomId}&text=${text}`, PostFetch());
  const jsonResponse = await response.json();
  return jsonResponse;
}
export const UploadEnding = async (text, roomId) => {
  const response = await fetch(
    `${API_ENDPOINT}/scenario/?roomId=${roomId}&text=${text}&end=true`,
    PostFetch()
  );
  const jsonResponse = await response.json();
  return jsonResponse;
}


