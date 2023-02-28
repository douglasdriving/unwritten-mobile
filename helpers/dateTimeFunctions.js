export const TimeToHms = milliSeconds => {
  const seconds = Number(milliSeconds) / 1000;
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);
  return h + 'h ' + m + 'm ' + s + 's';
}

export const TwoDaysFromNowInMs = () => {
  return (new Date().getTime() + 172800000);
}

export const extractTimestamp = (dateTime) => {

  const dateTimeObj = new Date(dateTime);
  const now = new Date();

  if (dateTimeObj.getFullYear() != now.getFullYear()) return dateAndTimeStringWithYear(dateTimeObj);
  else if (dateTimeObj.getDate() != now.getDate()) return dateAndTimeString(dateTimeObj);
  else if (dateTimeObj.getMonth() != now.getMonth()) return dateAndTimeString(dateTimeObj);
  else return timeString(dateTimeObj);
}

export function dateAndTimeStringWithYear(dateTimeObj) {
  const date = dateTimeObj.getDate();
  const month = dateTimeObj.getMonth();
  const monthName = getMonthName(month);
  const year = dateTimeObj.getFullYear();
  const time = timeString(dateTimeObj)
  return date + ' ' + monthName + ' ' + year + ' at ' + time;
}

export function dateAndTimeString(dateTimeObj) {
  const date = dateTimeObj.getDate();
  const month = dateTimeObj.getMonth();
  const monthName = getMonthName(month);
  const time = timeString(dateTimeObj)
  return date + ' ' + monthName + ' at ' + time;
}

export function timeString(dateTimeObj) {
  const h = dateTimeObj.getHours();
  const m = dateTimeObj.getMinutes();
  return (h + ':' + (m < 10 ? '0' : '') + m);
}

export function getMonthName(n) {

  switch (n) {
    case 0: return 'Jan'
    case 1: return 'Feb'
    case 2: return 'Mar'
    case 3: return 'Apr'
    case 4: return 'May'
    case 5: return 'Jun'
    case 6: return 'Jul'
    case 7: return 'Aug'
    case 8: return 'Sep'
    case 9: return 'Oct'
    case 10: return 'Nov'
    case 11: return 'Dec'
  }

}

export function getTimeDifferenceInMinutes(date) {
  const refDate = new Date(date);
  var currentDate = new Date();
  var differenceInMilliseconds = currentDate - refDate;
  var differenceInMinutes = differenceInMilliseconds / 1000 / 60;
  return differenceInMinutes;
}

export function addMinutes(date, minutes) {
  const dateObj = new Date(date);
  var twentyMinutesInMilliseconds = minutes * 60 * 1000;
  var newDate = new Date(dateObj.getTime() + twentyMinutesInMilliseconds);
  return newDate;
}

export function addedInLastMinutes(date, minutes) {

  const diff = getTimeDifferenceInMinutes(date);
  return (diff < minutes);

}

export function convertGMTToLocalTime(gmtDate) {
  const gmtDateObj = new Date(gmtDate);
  const timezoneOffset = new Date().getTimezoneOffset();
  const localDate = new Date(gmtDateObj.getTime() - (timezoneOffset * 60000));
  return localDate;
}
