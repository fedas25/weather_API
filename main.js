import { storage } from "./storage.js"

const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let list_city = [];

let clear_display = () => {
  document.querySelector(".now").classList.add("dis_none");
  document.querySelector(".details").classList.add("dis_none");
  document.querySelector(".forecast").classList.add("dis_none");
}

let update_data_now = (data) => {
  let temp = document.querySelector(".temperature");
  let city = document.querySelector(".month");
  let icon_weather = document.querySelector(".icon-weather");
  icon_weather.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  temp.innerHTML = Math.round(data.main.temp) + "&deg;";
  city.innerHTML = data.name;
  storage.update_selected_city(data.name);
}

let update_data_details = (data) => {
  let city = document.querySelector(".details > .month");
  city.innerText = data.name;

  let temperature = document.querySelector('[name="Temperature"]');
  temperature.innerHTML = `${temperature.getAttribute("name")}: ${Math.round(data.main.temp)}&deg`;

  let feels_like = document.querySelector('[name="Feels_like"]');
  feels_like.innerHTML = `${feels_like.getAttribute("name")}: ${Math.round(data.main.feels_like)}&deg`;

  let weather = document.querySelector('[name="Weather"]');
  weather.innerText = `${weather.getAttribute("name")}: ${data.weather[0].description}`;

  let date_sunrise = new Date(Number(data.sys.sunrise + "000"));
  let sunrise = document.querySelector('[name="Sunrise"]');
  sunrise.innerText = `${sunrise.getAttribute("name")}: ${(date_sunrise.getHours().toString().length == 1) ? ("0" + date_sunrise.getHours()) : date_sunrise.getHours()}:${(date_sunrise.getMinutes().toString().length == 1) ? ("0" + date_sunrise.getMinutes()) : date_sunrise.getMinutes()}`;

  let date_sunset = new Date(Number(data.sys.sunset + "000"));
  let sunset = document.querySelector('[name="Sunset"]');
  sunset.innerText = `${sunset.getAttribute("name")}: ${(date_sunset.getHours().length == 1) ? "0" + date_sunset.getHours() : date_sunset.getHours()}:${(date_sunset.getMinutes().toString().length == 1) ? "0" + date_sunset.getMinutes() : date_sunset.getMinutes()}`;
}

let get_city_data = (city) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.ok ? res : Promise.reject(res.status))
    .then(res => res.json())
    .then(data => {
      update_data_now(data);
      update_data_details(data);
      get_city_data_forecast(city);
    })
    .catch(err => alert("Ошибка " + err));
}

let get_city_data_forecast = (city) => {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.ok ? res : Promise.reject(res.status))
    .then(res => res.json())
    .then(data => {
      update_data_forecast(data);
    })
    .catch(err => alert("Ошибка " + err));
}

let city_search = () => {
  let input_form = document.querySelector(".input_form > input");
  get_city_data(input_form.value);
  input_form.value = "";
}

let add_city_to_list = (city_name) => {
  list_city.push(city_name);
}

let remove_city_from_list = (city) => {
  list_city = list_city.filter(city_list => city_list !== city);
  show_city_list();
}

let clear_screen_forecast = () => {
  let hourly_forecasts = document.querySelector(".hourly_forecasts");
  hourly_forecasts.innerHTML = "";
}

let update_data_forecast = (data) => {
  clear_screen_forecast();

  let p_name_month = document.querySelector(".forecast > .month");
  p_name_month.innerText = data.city.name;

  data.list.forEach((item_list) => {

    let container_forecast_for_hour = document.createElement("div");
    container_forecast_for_hour.classList.add("forecast_for_hour");

    let container_forecast_left_group = document.createElement("div");
    container_forecast_left_group.classList.add("left_group");

    let p_data = document.createElement("p");
    let p_temperature = document.createElement("p");
    let p_feels_like = document.createElement("p");
    p_data.classList.add("data");
    p_temperature.classList.add("temperature");
    p_feels_like.classList.add("feels_like");

    let date = new Date(item_list.dt_txt);
    p_data.innerText = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
    p_temperature.innerHTML = `Temperature: ${Math.round(item_list.main.temp)}&deg`;
    p_feels_like.innerHTML = `Feels like: ${Math.round(item_list.main.feels_like)}&deg`;

    container_forecast_left_group.append(p_data);
    container_forecast_left_group.append(p_temperature);
    container_forecast_left_group.append(p_feels_like);

    let container_forecast_right_group = document.createElement("div");
    container_forecast_right_group.classList.add("right_group");

    let time = document.createElement("p");
    let rainfall = document.createElement("p");
    let icon_weather = document.createElement("img");
    time.classList.add("time");
    time.innerText = `${date.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }).substring(0, 5)}`
    rainfall.classList.add("rainfall");
    icon_weather.src = `http://openweathermap.org/img/wn/${item_list.weather[0].icon}@4x.png`;

    container_forecast_right_group.append(time);
    container_forecast_right_group.append(rainfall);
    container_forecast_right_group.append(icon_weather);

    container_forecast_for_hour.prepend(container_forecast_left_group);
    container_forecast_for_hour.append(container_forecast_right_group);

    let tab_forecast = document.querySelector(".hourly_forecasts");
    tab_forecast.append(container_forecast_for_hour);
  });
}

let clear_screen_added_location = (screen_added_location) => {
  screen_added_location.innerHTML = "";
}

let show_city_list = () => {
  storage.update_list_city(list_city);

  let screen_added_location = document.querySelector(".location");
  clear_screen_added_location(screen_added_location);
  list_city.forEach((item) => {
    let delete_icon = document.createElement('img');
    delete_icon.src = "./img/delete_icon.svg";
    delete_icon.onclick = (event) => {
      let city = event.target.previousSibling.innerText;
      remove_city_from_list(city);
    }

    let p = document.createElement('p');
    p.textContent = item;
    p.onclick = (event) => {
      let city = event.target.innerText;
      get_city_data(city);
    }

    let div = document.createElement('div');
    div.prepend(p);
    div.append(delete_icon);
    screen_added_location.prepend(div);
  });
}

let pre_work_actions = () => {
  document.addEventListener("keydown", (key) => {
    if (key.code == "Enter") city_search()
  });

  let search_icon = document.querySelector(".input_form > img");
  search_icon.onclick = city_search;

  let menu_items = document.querySelectorAll(".menu_item");

  for (const item of menu_items) {
    item.onclick = function (event) {
      clear_display();
      let teg_atr_name = event.target.getAttribute("name");
      document.querySelector(`.${teg_atr_name}`).classList.remove("dis_none");

      for (const menu_item of menu_items) {
        menu_item.classList.remove("selected");
      }

      item.classList.add("selected");
    }
  }

  let edit_list_icon = document.querySelector('img[alt="edit_list_icon"]');
  edit_list_icon.onclick = (event) => {
    let city_name = event.target.previousElementSibling.innerText;
    if (!list_city.includes(city_name)) {
      add_city_to_list(city_name);
      show_city_list();
    }
  }

  clear_display();

  document.querySelector(".now").classList.remove("dis_none");
  document.querySelector('[name="now"]').classList.add("selected");

  if ((storage.get_selected_city()) && (storage.get_selected_city() !== 'null')) {
    get_city_data(storage.get_selected_city());
  } else get_city_data("Moscow");

  if ((storage.get_list_city()) && (storage.get_list_city() !== 'null')) {
    list_city = storage.get_list_city();
    show_city_list();
  }
}
  debugger
pre_work_actions();
