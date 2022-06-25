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
    .catch(err => alert("Ошибка с запросом"));
}

let city_search = () => {
  let input_form = document.querySelector(".input_form > input");
  get_city_data(input_form.value);
  input_form.value = "";
}

document.addEventListener("keydown", (key) => {
  if (key.code == "Enter") city_search()
});

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

let show_city_list = () => {
  list_city.forEach((item) => {

  })
}

let add_city_to_list = () => {
  list_city.push = data_weather.name;
}

let edit_list_icon = document.querySelector('img[alt="edit_list_icon"]');

edit_list_icon.onclick = () => {
  if (edit_list_icon.getAttribute("favourites") !== "true") {
    edit_list_icon.setAttribute("favourites", "true");
    add_city_to_list();
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