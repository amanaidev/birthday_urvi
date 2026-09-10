import { templates, occasions } from './data.js';
import { setupNav, templateArt } from './shared.js';

setupNav();
const search = document.querySelector('#template-search');
const filters = document.querySelector('#occasion-filters');
const grid = document.querySelector('#template-grid');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
let selected = 'All';
search.value = new URLSearchParams(window.location.search).get('search') || '';

filters.innerHTML = occasions.map(occasion => `<button class="filter-chip ${occasion === 'All' ? 'selected' : ''}" type="button" data-occasion="${occasion}">${occasion}</button>`).join('');
function render() {
  const term = search.value.trim().toLowerCase();
  const results = templates.filter(item => (selected === 'All' || item.occasion === selected) && `${item.name} ${item.occasion} ${item.description}`.toLowerCase().includes(term));
  count.textContent = `${results.length} ${results.length === 1 ? 'wish' : 'wishes'} to make someone smile`;
  grid.innerHTML = results.map(item => `<a class="catalogue-card" href="template-detail.html?id=${item.id}">${templateArt(item)}<div><p>${item.occasion}</p><h2>${item.name}</h2><span>${item.description}</span><b>Personalize <i class="fa-solid fa-arrow-right"></i></b></div></a>`).join('');
  empty.hidden = results.length !== 0; grid.hidden = results.length === 0;
}
filters.addEventListener('click', event => { const button = event.target.closest('[data-occasion]'); if (!button) return; selected = button.dataset.occasion; filters.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button)); render(); });
search.addEventListener('input', render);
document.querySelector('#clear-filters').addEventListener('click', () => { selected = 'All'; search.value = ''; filters.querySelector('[data-occasion="All"]').click(); });
render();
