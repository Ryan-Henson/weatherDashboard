let appID = "a11a01cd130954eda60a77225c0c9093";
let city = "Dallas";

var rainyBoi =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  appID;

var req = new Request(rainyBoi);
fetch(req)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  });
