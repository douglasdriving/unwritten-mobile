const API_ENDPOINT = "https://unwritten-backend.herokuapp.com";
//const API_ENDPOINT = "http://localhost:5000";

//TEST CODE
console.log('backend call script started at' + new Date());

//Headers
let authToken;
export const setAuthToken = (newToken) => {
  authToken = newToken;
}

const AuthHeader = () => {
  return new Headers({
    'Authorization': authToken
  })
}
const GetFetch = () => {
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
    return { ok: false, message: 'wrong email or password', token: null }
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

  // const newRooms = availableRooms.filter(room => (
  //   room.scenario_count < 4
  // ))
  // const roomWithLeavers = availableRooms.filter(room => (
  //   room.scenario_count >= 4
  // ))

  return { new: availableRooms.new, ongoing: availableRooms.old };

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

export const CreateRoom = async (title, description, opening) => {

  const querystring = `title=${title}&description=${description}&scenario=${opening}`
  const response = await fetch(`${API_ENDPOINT}/room/?${querystring}`, PostFetch());
  const jsonResponse = await response.json();
  return jsonResponse;

}

export const GetRoomData = async (roomId) => {

  const response = await fetch(`${API_ENDPOINT}/room/data/${roomId}`, GetFetch());
  const room = await response.json();
  return room;

}

export const JoinRoom = async (roomId) => {

  const response = await fetch(`${API_ENDPOINT}/room/join?room_id=${roomId}`, PostFetch());
  return response.ok;

}

//SCENARIOS
export const UploadScenario = async (text, roomId) => {
    const response = await fetch(`${API_ENDPOINT}/scenario/?roomId=${roomId}&text=${text}`, PostFetch());
    return response.ok;
}


