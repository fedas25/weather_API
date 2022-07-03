let data_weather;

let clear_display = () => { // добавить очистку document.querySelectorAll(".weather_information > div")
  document.querySelector(".now").classList.add("dis_none");
  document.querySelector(".details").classList.add("dis_none");
  // document.querySelector(".forecast").classList.add("dis_none");
}

let update_data = () => {
  let temp = document.querySelector(".temperature");
  let city = document.querySelector(".month");
  temp.innerHTML = Math.round(data_weather.main.temp) + "&deg;";
  city.innerHTML = data_weather.name;
}

const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';

let get_city_data = (city) => {
  let url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.ok ? res : Promise.reject(res.status))
    .then(res => res.json())
    .then(data => {
      data_weather = data;
      update_data();
    })
    .catch(err => alert("Ошибка " + err));
}

document.addEventListener("keydown", (key) => {
  if (key.code == "Enter") city_search()
});

let city_search = () => {
  let input_form = document.querySelector(".input_form > input");
  get_city_data(input_form.value);
  input_form.value = "";
}

let search_icon = document.querySelector(".input_form > img");
search_icon.onclick = city_search;

let menu_items = document.querySelectorAll(".menu_item");

for (const item of menu_items) {
  item.onclick = function (event) {
    clear_display();
    let teg_atr_name = event.target.getAttribute("name"); // уйдёт if снизу + кое что добавится
    if (teg_atr_name !== "forecast") document.querySelector(`.${teg_atr_name}`).classList.remove("dis_none");

    for (const menu_item of menu_items) {
      menu_item.classList.remove("selected");
    }

    item.classList.add("selected");
  }
}

let list_city = [];

let add_city_to_list = (city_name) => {
  list_city.push(city_name);
}

let remove_city_from_list = (city) => {
  list_city = list_city.filter(city_list => city_list !== city);
  clear_screen_added_location();
  show_city_list();
}

let screen_added_location = document.querySelector(".location");

let clear_screen_added_location = () => {
  screen_added_location.innerHTML = "";
}

let show_city_list = () => {
  list_city.forEach((item) => {
    let delete_icon = document.createElement('img');
    delete_icon.src = "./img/delete_icon.svg";
    delete_icon.onclick = (event) => {
      let city = event.target.previousSibling.nodeValue;
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
  })
}

let edit_list_icon = document.querySelector('img[alt="edit_list_icon"]');

edit_list_icon.onclick = (event) => {
  let city_name = event.target.previousElementSibling.innerText;
  if (!list_city.includes(city_name)) {
    add_city_to_list(city_name);
    clear_screen_added_location();
    show_city_list();
  }
}


// функция, которая обновляет данные с таба по нажатию на поиск +
//  ТУТ НУЖНО ДОРАБАТЫВАТЬ ОПИСАНИЕ, ТАК КАК ОНО НЕ ОЧ УНИВЕРСАЛЬНО
// переписать clear_display через удаление всех дочерних элементов DIV c классом weather_information
// добавить функцию clear_display обнуление всех пунктов меню
// добавить функцию, которая будет отображать таб + закрашивать нужный пункт меню по его названию в аргументе
// (это поможет оптимизировать переход между табами + сделает код более читаемым + фунуция в item.onclick будет совсем короткой)
// добавить переменную, которая будет содержать в себе текущий таб


clear_display();
document.querySelector(".now").classList.remove("dis_none");
document.querySelector('[name="now"]').classList.add("selected");
get_city_data("Moscow");