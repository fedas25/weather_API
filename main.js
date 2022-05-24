let formValue = document.querySelector("input"); 
let firstName = 'artem';
const serverUrl = 'https://api.genderize.io';
let url = `${serverUrl}?name=${firstName}`;

formValue.addEventListener("keydown", function(key) {
  if (key.code == "Enter") {
    firstName = formValue.value;
    url = `${serverUrl}?name=${firstName}`;
    fetch(url)
      .then((res) => {
        return res.json()}
        )
      .then((commits) => {
      if (commits.gender !== undefined && commits.gender !== null) {
        alert(firstName + " is " + commits.gender)
      } else {
        alert("Чёт не то");
      }});
      
      formValue.value = "";
  }
});