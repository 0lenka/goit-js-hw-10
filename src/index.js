import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix';
import templateList from './list-template.hbs';
import templateInfo from './info-template.hbs';
import './css/styles.css';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch() {
   let countryName = refs.input.value.trim()
    fetchCountries(countryName)
        .then(country => {
            renderCountries(country);
           
        })
        .catch(onError());   
}

function renderCountries(country) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    if (country.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    };
    if (country.length > 1) {
        const markupList = templateList(country);
        refs.list.innerHTML = markupList;
    };
    if (country.length === 1) {
        const makrupInfo = templateInfo(country);
        refs.info.innerHTML = makrupInfo;
    }
     
}
 
function clearList() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
};
 
function onError(country) {
     return Notify.failure("Oops, there is no country with that name")   
 }