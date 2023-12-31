"use strict";

const input = document.querySelector("#input");
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
let neighbour;
input.focus();

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const countryName = input.value;
    if (countryName) {
      input.value = "";
      countriesContainer.innerHTML = "";
      _getCountry(countryName);
    }
  }
});

const renderCountry = function (data, className) {
  let curr = data.currencies;
  let lang = data.languages;
  // //
  for (const [currkey] of Object.entries(curr)) {
    for (const [langkey] of Object.entries(lang)) {
      const html = `
            <article class="country ${className}">
                <img class="country__img" src=${data.flags.png} />
                <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span></span>${(
                  +data.population / 1000000
                ).toFixed(1)}M people</p>
                <p class="country__row"><span></span>${lang[langkey]}</p>
                <p class="country__row"><span></span>${curr[currkey].name}</p>
              </div>
            </article>
          `;
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
    }
  }
};

function _getCountry(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then(([data]) => {
      renderCountry(data);

      const neighbour = data.borders[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then(([neighbourData]) => renderCountry(neighbourData, "nieghbour"))
    .catch((err) => alert(err));
  }

 
    // .then ( (response) => response.json())
    // .then ( ([neighbour2]) => {
    //   const neighbour2 = data.borders[0];

    //   if(!neighbour2) return
    //   renderCountry(data);
    // })


// function _getCountry(allCountries) {
//   fetch(`https://restcountries.com/v3.1/name/${allCountries}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // Move it inside this block
//       renderCountry(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     if (!data) {
//       countriesContainer.innerHTML = '<p>Country not found</p>';
//       return;
//     }

//     renderCountry(data);

//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//      const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText)
//       console.log(data2)

//       renderCountry(data2, 'neighbour')

//       const neighbour3 = data2.borders[3];
//       if (!neighbour3) return;

//       // Request 3
//       const request3 = new XMLHttpRequest();
//       request3.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour3}`);
//       request3.send();

//       request3.addEventListener("load", function () {
//         const [data3] = JSON.parse(this.responseText);
//         renderCountry(data3, "neighbour");

//         const neighbour4 = data3.borders[3]
//         if(!neighbour4) return
//         console.log(`hello neighbour 4`,neighbour4)
//       // Request 4

//         const request4 = new XMLHttpRequest();
//         request4.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour4}`);
//         request4.send();

//         request4.addEventListener("load", function() {
//           const [data4] = JSON.parse(this.responseText);
//           renderCountry(data4, "neighbour");
//         })
//       })
//     })
//   });
// };
