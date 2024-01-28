const loadCountries = async () => {
  try {
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    displayCountries(data);
    return data;
  } catch (error) {
    console.error("Error loading countries:", error);
  }
};

const displayCountries = (countries) => {
  
  const countriesHTML = countries.map(
    (country) => `
    <div id="cardDetails" class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
      <div class="card h-100">
        <div class="card-header text-center bg-black text-white"><h4>${country.name.common}</h4></div>
        <div class="card-body text-center">
          <img src="${country.flags.png}" class="card-img-top">
          <div class="card-text">
            <ul class="list-group bg-transparent text-white mt-2 border border-0">
              <li class="list-group-item card-text bg-transparent text-white border border-0"><b>Capital: ${country.capital}</b></li>
              <li class="list-group-item card-text bg-transparent text-white border border-0"><b>Region: ${country.region}</b></li>
              <li class="list-group-item card-text bg-transparent text-white border border-0"><b>Country Code: ${country.cca3}</b></li>
            </ul>
          </div>
          <button type="button" class="btn btn-primary bg-transparent border-white mt-3 mb-3" data-country="${country.name.common}">Click for weather</button>
        </div>
      </div>
    </div>
  `
  );

  const countriesData = document.querySelector(".row");
  countriesData.innerHTML = countriesHTML.join(" ");

  let btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      let countryName = btn.getAttribute("data-country");
      try {
        let weatherAPI = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=acd5e6e4dbda454627441ee591860a3a&units=metric`
        );
        let weatherData = await weatherAPI.json();
        btn.innerHTML = `Weather: ${weatherData.weather[0].description}<br>Temp: ${weatherData.main.temp}°C<br>Pressure: ${weatherData.main.pressure} hPa<br>Longitude: ${weatherData.coord.lon}<br>Latitude: ${weatherData.coord.lat}`;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        btn.innerHTML = "Failed to fetch weather";
      }
    });
  });
};

loadCountries();


