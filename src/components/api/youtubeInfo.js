export const getYTInfoURL = (url) => {
  return "http://www.youtube.com/oembed?url=" + url + "&format=json";
}

export const getYTTreatedUrl = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  var treatedURL = (match && match[7].length == 11) ? "https://www.youtube.com/watch?v=" + match[7] : false
  return treatedURL
}