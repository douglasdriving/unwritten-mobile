import Constants from 'expo-constants'

let API_ENDPOINT;
const isRunningInExpoGo = Constants.appOwnership === 'expo'
if (isRunningInExpoGo) {
  console.log('app is running in expo go! Setting route to andys');
  // API_ENDPOINT = "http://192.168.1.141:5000"; // manawa
  API_ENDPOINT = "http://192.168.0.58:5000"; // andys
}
else {
  console.log('app is not is expo go, setting route to heroku');
  API_ENDPOINT = "https://unwritten-backend.herokuapp.com";
}

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
export const Login = async () => {

  const response = await fetch(`${API_ENDPOINT}/user/login`, PostFetch());
  const jsonResponse = await response.json();
  if (!jsonResponse.ok) {
    console.log(jsonResponse.message);
    return null;
  }
  const user = jsonResponse.data.player;
  return user;

}
export const GetUser = async () => {

  const response = await fetch(`${API_ENDPOINT}/user`, GetFetch());
  if (!response.ok) {
    console.error('failed to fetch user from the backend: ', response);
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
export const GetPlayerStats = async (id) => {

  const response = await fetch(`${API_ENDPOINT}/user/stats?userId=${id}`, GetFetch());
  if (!response.ok) {
    console.error('failed to fetch user stats from the backend');
    return null;
  }
  const stats = await response.json();
  return stats;

}
export const SetDisplayName = async (name) => {

  const response = await PostCall(`user/name?name=${name}`);
  return response;

  // const response = await fetch(
  //   `${API_ENDPOINT}/user/name?name=${name}`,
  //   PostFetch()
  // );

  // const jsonResponse = await response.json();
  // jsonResponse.ok = response.ok;

  // return jsonResponse;

}

//idea - put all functionality here?
const PostCall = async (route) => {

  const response = await fetch(
    `${API_ENDPOINT}/${route}`,
    PostFetch()
  );

  // console.log('respo was: ', response);
  const jsonResponse = await response.json();
  // console.log('json respo was: ', jsonResponse)

  return jsonResponse;

}

//ROOMS
export const GetAvailableRooms = async () => {

  const response = await fetch(`${API_ENDPOINT}/room/available`, GetFetch());
  const availableRooms = await response.json();
  return { new: availableRooms.new, ongoing: availableRooms.old };

}
export const GetAvailableRoomsAsSingleList = async () => {

  const response = await fetch(`${API_ENDPOINT}/camp/active`, GetFetch());
  const jsonResponse = await response.json();
  const camps = jsonResponse.data;
  return camps;

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
export const GetMyRoomsAsSingleList = async () => {

  const response = await fetch(`${API_ENDPOINT}/camp/player`, GetFetch());
  const responseJson = await response.json();
  if (responseJson.ok) {
    return responseJson.data;
  }
  else return null;
}
export const GetFinishedStories = async () => {

  const response = await fetch(`${API_ENDPOINT}/camp/finished`, GetFetch());
  const responseJson = await response.json();
  const camps = responseJson.data;
  return camps;

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
export const GetCampData = async (campId) => {

  const response = await fetch(`${API_ENDPOINT}/camp/data/${campId}`, GetFetch());
  if (response.ok == false) {
    return false;
  }
  const camp = await response.json();

  return camp;

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
export const Like = async (nodeId) => {

  const response = await fetch(
    `${API_ENDPOINT}/node/like?nodeId=${nodeId}`,
    PostFetch()
  );
  const jsonResponse = await response.json();
  return jsonResponse;

}

export const Dislike = async (nodeId) => {

  const response = await fetch(
    `${API_ENDPOINT}/node/dislike?nodeId=${nodeId}`,
    PostFetch()
  );
  const jsonResponse = await response.json();
  return jsonResponse;

}

//SCENARIOS
export const UploadScenario = async (text, campId, end) => {

  const response = await fetch(
    `${API_ENDPOINT}/node/scenario?campId=${campId}&text=${text}&end=${end}`,
    PostFetch()
  );
  const jsonResponse = await response.json();
  return jsonResponse;

}
export const AddNode = async (campId) => {

  const response = await fetch(
    `${API_ENDPOINT}/node?campId=${campId}`,
    PostFetch()
  );
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
export const GetFeed = async () => {

  const response = await fetch(
    `${API_ENDPOINT}/node/feed`,
    GetFetch()
  );
  const jsonResponse = await response.json();
  if (jsonResponse.ok) return jsonResponse.data;
  else return null;

}
export const GetRandomPrompt = async () => {

  const response = await fetch(
    `${API_ENDPOINT}/scenario/prompt`,
    GetFetch()
  );

  if (response.ok) {
    const jsonResponse = await response.json();
    if (jsonResponse.ok) return jsonResponse.data.prompt;
    else return null;
  }
  else {
    return null;
  }

}

//INFO
export const GetNews = async () => {

  const response = await fetch(
    `${API_ENDPOINT}/info/news`,
    GetFetch()
  );

  if (response.ok) {
    const jsonResponse = await response.json();
    if (jsonResponse.ok) return jsonResponse.data;
    else return null;
  }
  else {
    return null;
  }

}

