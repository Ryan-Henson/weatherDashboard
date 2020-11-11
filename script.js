$(document).ready(function () {
  let appID = "a11a01cd130954eda60a77225c0c9093";
  let city = " ";
  let today = moment().format("L");
  let pastCitySearch =
    JSON.parse(localStorage.getItem("cities")) === null
      ? []
      : JSON.parse(localStorage.getItem("cities"));

  pastHistory();

  function lookOutSide() {
    if ($(this).attr("id") === "submit-city") {
      city = $("#city").val();
    } else {
      city = $(this).text();
    }
    let rainyBoi =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=" +
      appID;

    if (pastCitySearch.indexOf(city) === -1) {
      pastCitySearch.push(city);
    }

    localStorage.setItem("cities", JSON.stringify(pastCitySearch));
    $.getJSON(rainyBoi, function (response) {
      let temp = (response.main.temp - 273.15) * (9 / 5) + 32;
      let windspeed = response.wind.speed * 2.237;

      $("#current-city").text(response.name + " " + today);
      $("#weather-img").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      $("#temperature").text(temp.toFixed(2) + "°F");
      $("#humidity").text(response.main.humidity + "%");
      $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
    });
  }

  function rainyWeek() {
    let rainyForcast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      ",us&APPID=" +
      appID;
    let dayTracker = 1;
    $.ajax({
      url: rainyForcast,
      method: "GET",
    }).then(function (response) {
      for (let i = 0; i < response.list.length; i++) {
        let rightNow = response.list[i].dt_txt;
        let date = rightNow.split(" ")[0];
        let time = rightNow.split(" ")[1];
        if (time === "15:00:00") {
          let year = date.split("-")[0];
          let month = date.split("-")[1];
          let day = date.split("-")[2];
          $("#day-" + dayTracker)
            .children(".card-date")
            .text(month + "/" + day + "/" + year);
          $("#day-" + dayTracker)
            .children(".weather-icon")
            .attr(
              "src",
              "https://api.openweathermap.org/img/w/" +
                response.list[i].weather[0].icon +
                ".png"
            );
          $("#day-" + dayTracker)
            .children(".weather-temp")
            .text(
              "Temp: " +
                ((response.list[i].main.temp - 273.15) * (9 / 5) + 32).toFixed(
                  2
                ) +
                "°F"
            );
          $("#day-" + dayTracker)
            .children(".weather-humidity")
            .text("Humidity: " + response.list[i].main.humidity + "%");
          dayTracker++;
        }
      }
    });
  }

  function pastHistory() {
    $("#search-history").empty();
    pastCitySearch.forEach(function (city) {
      let history_item = $("<li>");
      history_item.addClass("list-group-item btn btn-light");
      history_item.text(city);
      $("#search-history").prepend(history_item);
    });

    $(".btn").click(lookOutSide);
    $(".btn").click(rainyWeek);
  }

  function trashPast() {
    $("#search-history").empty();
    pastCitySearch = [];
    localStorage.setItem("cities", JSON.stringify(pastCitySearch));
  }

  $("#clear-history").click(trashPast);
  $("#submit-city").click(pastHistory);
});
