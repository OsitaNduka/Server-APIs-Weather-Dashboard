$(document).ready(function () {

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


  
  //Search button click event
 $("#search-button").on("click", function (event){
    event.preventDefault();
    console.log("Submitted City")
    let city = searchInputEl.val().trim();
    console.log("City: ", city)
    city = city.replace(' ' , '%20');
    console.log("City: ", city)

    //Clear the search input
    searchInputEl.val('');
    //if (city){
      //let queryURL = buildURLFromInputs(city);
    searchWeather(city);
   // }else{
      //let queryURL = buildURLFromId(id)
    //}


    // first make a API call to the GEOCODE endpoint   --> This gives us back the LAT and LON of our FORCAST REQUEST
   //$.ajax()
    //fetchForcast(city)
 });

 
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

  //Async Operations are NON-BLOCKING Operations

  // Define our API ENDPOINTS
  // Each ENDPOINT that we define here requires some DATA (this case VARIABLES) to be input into the URL ADDRESS (ENDPOINT)
  let cityName = "London";
  let APIkey = "f632d71609c01815c6dc91d63186fe2a";
  let lat = '';  // we are starting out with no data in the variable
  let lon = '';  // we are starting out with no data in the variable
  
  //                                        (ENDPOINT) 
  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`;
  //                                           ^
  //                                                           (ENDPOINT) 
  let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  //                                                               ^
  
  //                                                (ENDPOINT) 
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${51.5073219}&lon=${0.1276474}&appid=${APIkey}&units=metric`;

  //   
  
  
  
  console.log(" I am code BEFORE the ASYNC operations (API call)")
  // this kicks off our FIRST ASYNC Request

function searchWeather(cityName) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}&units=metric`)
  .then(response => response.json())
  .then(data => {
      console.log(" I am code INSIDE the FIRST ASYNC operations (API call)")
      console.log(data)   // --< HERE we have DATA that came back from our API request to the ENDPOINT 
      // this Data ^ is ONLY available inside of thie CALLBACK function (the opening and closing { } )
      
      // dig into the returned data object and assign it to the LAT and LON variable we declared above
      lat = data[0].lat;
      lon = data[0].lon;
      // These two pieces of DATA we NEED to make the NEXT ASYNC CALL
      
      // SECOND API CALL (Different *** ENDPOINT ***)
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
      .then(response => response.json())
      .then(data => { 
         // console.log(" I am code INSIDE the SECOND ASYNC operations (API call)")
          
          console.log(data)   // --< HERE we have DATA that came back from our API request to the ENDPOINT 
          // this Data ^ is ONLY available inside of thie CALLBACK function (the opening and closing { } )
  
          // Let's Dig into the data that comes back
          let cityName = data.city.name;
          cityEl.text(cityName);
          let windSpeed = data.list[0].wind.speed
          //console.log("Wind: ", windSpeed);
          windEl.text(windSpeed)

          let todayDate = data.list[0].dt_txt.split(" ");
          dateEl.text(todayDate[0]);
          console.log("Date: ", todayDate);

          let todayTemperature = data.list[0].main.temp;
          temperatureEl.text(todayTemperature);
          //console.log("Temp: ", todayTemperature);

          let mainHumidity = data.list[0].main.humidity;
          humidityEl.text(mainHumidity);

          let weatherIcon = data.list[0].weather[0].icon;
          weatherIconEl.attr('src', `http://openweathermap.org/img/wn/${weatherIcon}.png`);
          
          // THIS IS THE POINT WHERE THE FORECAST DATA WE WANT TO DISPLAY EXISTS, MEANING this is where we want to UPDATE the values on the DOM (HTML page)
           // Transfer content to HTML
          //$("#city").html("<h2>" + data.city.name + " Weather Details</h2>");
          //$("#date").html("<h3>" + data.date + "Today date</h3>");
          //$("#wind").text("Wind Speed: " + data.list[0].wind.speed);
          //$("#humidity").text("Humidity: " + data.list[0].humidity);
          
          // Convert the temp to Celsius
          //let tempC = data.main.temp - 273.15;

          // add temp content to html
          //$("#temp").text("Temperature (K) " + data.main.temp);
          //$("#tempC").text("Temperature (C) " + tempC.toFixed(2));
          
          

          // WE need to sort through the data.list ARRAY
         let forcastData = [];  // we want to endup with 5 RECORDS
          for(let i = 0; i < data.list.length; i++) {
              // filter through our list
             //console.log(data.list[i]);

             //console.log(data.list[i].dt_txt);
              // add the ones we want to our forscastData ARRAY
              // I want to pull out each OBJECT in the list with a dt_txt of "03:00:00"

              // Do some data conversion  (STRING.split(' '))  STRING --> ARRAY
              // "date time"  --> String data type 
             //["date", "time"]  --> Array (Object) Data type  // Array[1]
          }

      });
  });
}
  
  
  console.log("I am code AFTER the ASYNC operations (API call)");

  


 // The URL to query the database
 //var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" +
 //APIKey;
 
 // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=" +
  //APIKey;

 //var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;
 // URL for the OpenWeather API call
  //function buildURLFromInputs(city) {
   //if(!city) {
     // console.log("no city entered")
     // return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`;


    //if (city) {
      //return `https://api.openweathermap.org/data/2.5/forecast?lat=${51.5073219}&lon=${0.1276474}&appid=${APIkey}`;
   //}


 //}


  function buildURLFromId(id) {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
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
 function fetchforcast(city) {
  let cityChoice = (city);
  console.log(`Fetching data for ${cityChoice}`);

 $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}}&lon=${lon}&appid=${APIkey}`,
   method: "GET"
   }).then(function(response) {
    // We store all of the retrieved data inside of an object called "response"


    // Log the queryURL
    console.log(forecastUrl);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $("#city").html("<h2>" + response.name + " Weather Details</h2>");
    $("#date").html("<h3>" + response.date + "Today date</h3>");
    $("#wind").text("Wind Speed: " + response.wind.speed);
    $("#humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to Celsius
    var tempC = response.main.temp - 273.15;

    // add temp content to html
    $("#temp").text("Temperature (K) " + response.main.temp);
    $("#tempC").text("Temperature (C) " + tempC.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (C): " + tempC);
  });

    
   
   // Remove duplicate cities
    if (searchedCities[0]) {
       searchedCities = $.grep(searchedCities, function (storedCity){
         return id !== storedCity.id;

        });
        searchedCities.unshift({city, id});
        storedCities();
        displayCities(searchedCities);
    }



  //Current weather in DOM elements
  cityEl.text(response.name);
  let formattedDate = moment.unix(response.dt).format("L");
  console.log("date: ", formattedDate);
  dateEl.text(formattedDate);
  let weatherIcon = response.weather[0].icon;
  console.log(weatherIcon);
  weatherIconEl.attr("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`).attr("alt", response.weather[0].description);
  temperatureEl.html(((response.main.temp - 273.15) *1.8 + 32).toFixed(1));
  humidityEl.text(response.main.humidity);
  windEl.text((response.wind.speed * 2.237).toFixed(1));


  //Five Day forecast in DOM elements

   for (var i  = 0; i <=5; i++){
      var currDay = fiveDay[i];
      $("div.day-${i}. card-title").text(moment.unix(currDay.dt).format("L"));
      $("div.day-${i}.fiveDay-img").attr("src",`http://openweathermap.org/img/wn/${weatherIcon}.png`).attr("alt", response.weather[0].description);
      $("div.day-${i}.fiveDay-temp").text(((currDay.temp.day - 273.15) *1.8 + 32).toFixed(1));
      $("div.day-${i}.fiveDay-humid").text(currDay.humidity);

    }
      
  //});

// }


   // $(document).on("click","button.city-btn", function (event){
    //let clickedCity = $(this).text();
    //let foundCity = $.grep(searchedCities, function(storedCity){
    //return clickedCity === storedCity.city;
    //})
    //let queryURL = buildURLFromInputs(foundCity[0].id);
   //searchWeather(currentWeather);
 //})
 

};

});