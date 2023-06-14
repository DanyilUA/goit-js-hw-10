
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const loaderEl = document.querySelector('.loader');
const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');


fetchBreeds(selectEl)
  .then(data => {
    return data.forEach(breed => {
      let option = document.createElement('option');

      option.value = breed.id;
      option.textContent = breed.name;

      selectEl.appendChild(option);
    //   loaderEl.classList.remove('hidden');
    });
  })
  .catch(error => console.log(error));;

selectEl.addEventListener('change', loadCat);

function loadCat(e) {
    let breedID = e.target.value;
    loaderEl.classList.remove('hidden');
    catInfo.innerHTML = '';
    fetchCatByBreed(breedID)
        .then(data => {
            if (data.length > 0) {
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
            }
            else {
                errorEl.classList.remove('hidden');
            }
        loaderEl.classList.add('hidden');

      })
      .catch(error => {
        handleError(error);
        loaderEl.classList.add('hidden');
      });
    
    
}

function handleError(error) {
    console.error(error);
    errorEl.textContent = 'Oops! Something went wrong. Please try again.';
}