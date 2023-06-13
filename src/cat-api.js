import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY ='live_drnxfc75jyNi39wLV94Sn91p7Brtn240VYEJOHrSJFdNx89OkWpqBLCqcdQ5Ueud';
const IMAGE_SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds(selectEl) {

  return fetch(`${BASE_URL}?api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
          throw new Error(resp.statusText);
      }
      return resp.json();
    })
      .then(data => {
        
      return data.forEach(breed => {
        let option = document.createElement('option');

        option.value = breed.id;
        option.textContent = breed.name;

          selectEl.appendChild(option);
          
      });
    })
    .catch(error => console.log(error));
}

export function fetchCatByBreed(breedID) {

  return fetch(`${IMAGE_SEARCH_URL}?api_key=${API_KEY}&breed_ids=${breedID}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })  
}

