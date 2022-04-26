export const ytinfo = {
  url: "N/A",
  set: function (url) {
    this.url = url;
  },
  getInfo: function () {
    return "http://www.youtube.com/oembed?url=" + this.url + "&format=json";
  }
}
