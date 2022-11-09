export const GenerateRandomString = () => {
  return Math.random().toString(16).slice(2);
}

export const PickRandomFromArray = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export const GetRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TimeToHms = milliSeconds => {
  const seconds = Number(milliSeconds)/1000;
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);
  return h + 'h ' + m + 'm ' + s + 's'; 
}

export const GetNextPlayerName = (room) => {
  if(room.nextPlayer == null) return null;
  if (room.nextPlayer == 0) return room.creator.name;
  if (room.nextPlayer > room.authors.length) return null;
  return room.authors[room.nextPlayer - 1].name;
}

export const TwoDaysFromNowInMs = () => {
  return (new Date().getTime() + 172800000);
}