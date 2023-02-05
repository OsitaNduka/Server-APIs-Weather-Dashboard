$(document).ready(function (){

 // My API Key
 var APIKey =  "f632d71609c01815c6dc91d63186fe2a";

 //Selectors for Html Elements
 var formHeadingEl = $("#form-heading");
 var searchFormEl = $("#search-form");
 var searchInputEl = $("#search-input");
 var searchButtonEl = $("#search-button");
 var historyEl = $("#history");
 var todayEl = $("#today");
 var forecast = $("#forecast");
 var cityEl = $("#city");
 var dateEl = $("#date");
 var weatherIconEl = $("#weather-icon");
 var temperatureEl = $("#temperature");
 var windEl = $("#wind");
 var humidityEl = $("#humidity");

 //Store searched Cities

 let searchedCities = [];

 //Function to compare Cities and sort them by name alphabetically: (https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/)
 function compare(a, b) {
    const cityA = a.city.toUpperCase();
    const cityB = b.city.toUpperCase();
    
    let comparison = 0;
    if (cityA > cityB) {
        comparison = 1;
    } else if (cityA < cityB) {
        comparison = -1;
    }
    return comparison;
 }

  //Function for local storage of searched cities

  function loadCities() {
    const storedCities = JSON.parse(localStorage.getItem("searchedCities"));
    if (storedCities) {
        searchedCities = storedCities;
    }
  }

  //Searched cities store in local storage

  function storedCities() {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

  }




 // The URL to query the database
 var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" +
 APIKey;
 
 var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=" +
 APIKey;

 // URL for the OpenWeather API call
 function buildURLFromInputs(city) {
    if (city) {
        return "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}";
    }
 }
  function buildURLFromId(id) {
    return "https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}";
  }


  // Function for past 5 searched cities

  function displayCities(searchedCities) {
    historyEl.empty();
    searchedCities.splice(5);
    let sortedCities = [...searchedCities];
    sortedCities.sort(compare);
    sortedCities.forEach(function(location) {
        let cityDiv = $("<div>").addClass("col-12 city");
        let cityBtn = $("<button>").addClass("btn btn-light city-btn").text(location.city);
        cityDiv.append(cityBtn);
        historyEl.append(cityDiv);
    });
  }
 //Function for calling the OpenWeather API for weather conditions
 

 // create an AJAX call

 $.ajax({
    url: queryURL,
    method: "GET"
 }).then(function (response){
    // create code here to Log the queryUrl
    console.log(queryURL);
    // create code here to log the resulting object
    console.log(response);
    // Create code to calculate the temperature (converted from Kelvin)
    // to convert from Kelvin to Celsius: C = K -273.15
    //var tempC = response.main.temp - 273.15;
    //store current city in searched cities
    var city = response.name;
    var id = response.id;

    //Remove duplicate cities
    if (searchedCities[0]{
        searchedCities = $.grep(searchedCities, function (storedCity){
            return id !== storedCity.id;

        })
        searchedCities.unshift({city, id});
        storedCities();
        displayCities(searchedCities);
    }

 });

  //Current weather in DOM elements
  cityEl.text(response.name);
  let formattedDate = moment.unix(response.dt).format("L");
  dateEl.text(formattedDate);
  let weatherIcon = response.weather[0].icon;
  weatherIconEl.attr("src", "http://openweathermap.org/img/wn/${weatherIcon}.png").attr("alt", response.weather[0].description);
  temperatureEl.html(((response.main.temp - 273.15) *1.8 + 32).toFixed(1));
  humidityEl.text(response.main.humidity);
  windEl.text((response.wind.speed * 2.237).toFixed(1));

  
 
    






});