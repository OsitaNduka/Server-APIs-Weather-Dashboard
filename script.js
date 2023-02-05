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
 function compare(a,b) {
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







 // The URL to query the database
 var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" +
 APIKey;

 // create an AJAX call

    $.ajax({
       url: queryURL,
       method: "GET",
     }).then(function (response) {
     console.log(queryURL);
     console.log(response);
    
    
    });






});