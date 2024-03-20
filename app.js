// https://restcountries.com/v3/all

let countries = "";

window.onload = function () {
  fetchAllCountries();
};

// const getCountries = async () => {
//     const BASE_URL = `https://restcountries.com/v3/all`
// }

const URL = `https://restcountries.com/v3/all`;

const fetchAllCountries = async () => {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`Something went wrong.Try later ${res.status}`);
    }

    const data = await res.json();
    getCountriesNames(data);
  } catch (error) {
    console.log(error);
  }
};

getCountriesNames = (data) => {
  countries = data;

  countries.forEach((country) => {
    const select = document.querySelector(".form-select");

    select.innerHTML += `<option value='${country.name.common}'> ${country.name.common}</option>`;
  });
};

//? Dropdown menudeki ulke ismi degistiginde secilen ulkenin bilgilerini
//? Card olarak DOM'a bas
document.querySelector(".form-select").addEventListener("change", () => {
  const countryName = document.querySelector(".form-select").value;

  //?Eger countryName varsa (true) getCountry metotunu cagir.
  if (countryName) {
    const selectedCountry = countries.filter(
      (country) => country.name.common === countryName
    );

    renderCountry(selectedCountry[0]);
  }
});

const renderCountry = ({
    name: { common },
    capital,
    region,
    flags,
    languages,
    currencies,
    population,
    borders,
    maps,
  }) => {
    const countries = document.querySelector(".countries");
  
    countries.innerHTML = `
      <div class="card shadow-lg" style="width: 22rem">
        <img src="${flags[0]}" class="card-img-top shadow" alt="..." />
        <div>
          <h5 class="p-2 text-center">${common}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-landmark"></i>
            <span class="fw-bold"> Capitals:</span> ${capital}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-comments"></i>
            <span class="fw-bold"> Languages:</span> ${Object.values(languages)}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-money-bill-wave"></i>
            <span class="fw-bold"> Currencies:</span> ${Object.values(currencies)[0].name},
            ${Object.values(currencies)[0].symbol}
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-people-group"></i>
            <span class="fw-bold"> Population:</span> ${population.toLocaleString("en-US")}
          </li>
          <li class="list-group-item">
            <i class="fa-sharp fa-solid fa-road-barrier"></i>
            <span class="fw-bold"> Borders:</span> ${borders ? borders : "None"}
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=${maps.googleMaps} target='_blank'> Go to google map</a>
          </li>
        </ul>
      </div>
    `;
  };
  