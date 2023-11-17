let input = document.getElementById("input");
let btnSearch = document.getElementById("btn");
let infoContent = document.querySelector(".info");

btnSearch.onclick = () => {
  if (input.value != "") {
    infoContent.innerHTML = "";
    getDataCountry();
  } else {
    infoContent.innerHTML = `<div class="error">Please Enter Country Name !</div>`;
  }
};

function getDataCountry() {
  let url = `https://restcountries.com/v2/name/${input.value}?fullText=true`;
  fetch(url, { method: "GET" })
    .then((result) => result.json())
    .then((data) => {
      createInfoElement(data);
    }).catch(() => {
      infoContent.innerHTML = `<div class="error">Check Country Name ! </div>`;
    });
}

function createInfoElement(data) {
  let content = `
  <div class="content bg-dark">
            <div class="header">
                <img src="${data[0].flags.png}" alt="">
                <h2 class="text-white">${data[0].name}</h2>
            </div>
            
          <table class="table table-dark table-striped">
            <tbody>
              <tr>
                <td>Capital</td>
                <td>${data[0].capital}</td>
              </tr>
              <tr>
                <td>Continent</td>
                <td>${data[0].region}</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>${data[0].currencies[0].name} - ${data[0].currencies[0].code}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>${data[0].languages[0].name}</td>
              </tr>
              <tr>
                <td>Country Key</td>
                <td>+${data[0].callingCodes}</td>
              </tr>
            </tbody>
          </table>

        </div>`;
  infoContent.innerHTML = content;
}

function getAllCountryName() {
  let url = `https://restcountries.com/v2/all`;
  fetch(url, { method: "GET" })
    .then((result) => result.json())
    .then((data) => {
      let content = "";
      let select = document.getElementById("select");
      for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].name}">${data[i].name}</option>`;
      }
      content += `<option value="" disabled selected hidden>Choose Country</option>`;
      select.innerHTML = content;
      select.onchange = () => {
        input.value = select.value;
      };
    });
}

getAllCountryName();
