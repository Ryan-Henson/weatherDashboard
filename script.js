let appID = "a11a01cd130954eda60a77225c0c9093";
let city = "Dallas";
let current_date = moment().format("L");

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

    function lookOutSide() {
      let temp = (response.main.temp - 273.15) * (9 / 5) + 32;
      let windspeed = response.wind.speed * 2.237;

      console.log(temp);

      $("#current-city").text(response.name + " " + current_date);
      $("#weather-img").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      $("#temperature").text(temp.toFixed(2) + "°F");
      $("#humidity").text(response.main.humidity + "%");
      $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
    }

    $(".btn").click(lookOutSide);
  });
