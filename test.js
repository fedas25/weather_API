//                 // f660a2fb1e4bad108d6160b7f58c555f
// const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
// const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
                   
// let ser = 'https://pro.openweathermap.org/data/2.5/forecast/hourly'

// let get_city_data = (city) => {
//   let url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
//   fetch(url)
//     .then(res => res.ok ? res : Promise.reject(res.status))
//     .then(res => res.json())
//     .then(data => {
//         debugger
//         lat = data.coord.lat;
//         lon = data.coord.lon;
//         console.log(data);
        
//     })
//     .catch(err => alert("Ошибка " + err));
// }             
//               // http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${apiKey}
//               //https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}
//               // https://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=f660a2fb1e4bad108d6160b7f58c555f
// let get_city = () => {
//   //  debugger   
//   let url = `http://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=${apiKey}`;
//   fetch(url)
//     .then(res => res.ok ? res : Promise.reject(res.status))
//     .then(res => res.json())
//     .then(data => {
//         debugger
//         console.log(data);
//     })
//     .catch(err => alert("Ошибка " + err));
// }

// get_city();
// // get_city_data("Novosibirsk");
// // get_city_data_hor();


