// get info from application
class AjaxWeather {
  constructor() {
    this.apiKey = "d73d3f12a42e2f5717f5dbb1d311362e";
  }
  async getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    return weather;
  }
}
// display info
class Display {
  constructor() {
    this.results = document.querySelector(".results");
    this.cityName = document.getElementById("cityName");
    this.cityCountry = document.getElementById("cityCountry");
    this.cityIcon = document.getElementById("cityIcon");
    this.cityTemp = document.getElementById("cityTemp");
    this.cityHumidity = document.getElementById("cityHumidity");
  }
  showWeather(data) {
    // console.log(data);
    const {
      name,
      sys: { country },
      main: { temp, humidity },
    } = data;
    const { icon } = data.weather[0];
    this.results.classList.add("showItem");
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}
(function () {
  const form = document.getElementById("wheatherForm");
  const cityInput = document.getElementById("cityInput");
  const feedback = document.querySelector(".feedback");
  //   class instance
  const ajax = new AjaxWeather();
  const display = new Display();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city.length === 0) {
      console.log(feedback);
      showFeedback("city value can't be empty");
    } else {
      ajax.getWeather(city).then((data) => {
        if (data.message === "city not found") {
          showFeedback("City with this name cannot be found");
        } else {
          display.showWeather(data);
        }
      });
    }
  });

  function showFeedback(text) {
    feedback.classList.add("showItem");
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 2500);
  }
})();
