
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const loaderEl = document.querySelector('.loader');
const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');


fetchBreeds(selectEl);

selectEl.addEventListener('change', loadCat);

function loadCat(e) {
    let breedID = e.target.value;
    loaderEl.classList.remove('hidden');

    fetchCatByBreed(breedID)
      .then(data => {
        const catData = {
          image: data[0].url,
          breed: data[0].breeds[0].name,
          description: data[0].breeds[0].description,
          temperament: data[0].breeds[0].temperament,
        };

        catInfo.innerHTML = `
            <img src="${catData.image}" alt="Cat Image">
            <h2>${catData.breed}</h2>
            <p><strong>Description:</strong> ${catData.description}</p>
            <p><strong>Temperament:</strong> ${catData.temperament}</p>
        `;
        loaderEl.classList.add('hidden');
      })
      .catch(error => handleError());
    
}

function handleError() {
  alert('error');
}