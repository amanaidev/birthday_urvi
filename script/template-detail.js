import { templates, getTemplate } from './data.js';
import { getQuery, setupNav, templateArt } from './shared.js';

setupNav();
const template = getTemplate(getQuery('id'));
const root = document.querySelector('#template-detail');
if (!template) {
  root.innerHTML = `<section class="not-found"><i class="fa-regular fa-face-sad-tear"></i><h1>That wish has wandered off.</h1><p>It may have moved, or the link may not be quite right.</p><a class="btn btn-primary" href="templates.html">Browse all templates</a></section>`;
} else {
  const related = templates.filter(item => item.occasion === template.occasion && item.id !== template.id).slice(0, 3);
  root.innerHTML = `<a class="back-link" href="templates.html"><i class="fa-solid fa-arrow-left"></i> All templates</a><section class="detail-hero"><div class="detail-art">${templateArt(template, 'large-art')}</div><div class="detail-copy"><p class="eyebrow">${template.occasion}</p><h1>${template.name}</h1><p>${template.description}</p><ul><li><i class="fa-solid fa-check"></i> Make it personal in a few minutes</li><li><i class="fa-solid fa-check"></i> Preview before you share</li><li><i class="fa-solid fa-check"></i> No account needed for this prototype</li></ul><a class="btn btn-primary" href="personalize.html?id=${template.id}">Personalize this wish <i class="fa-solid fa-arrow-right"></i></a></div></section>${related.length ? `<section class="related"><div class="section-header"><div><h2>More for this moment</h2><p>Another lovely way to say it.</p></div></div><div class="catalogue-grid">${related.map(item => `<a class="catalogue-card" href="template-detail.html?id=${item.id}">${templateArt(item)}<div><p>${item.occasion}</p><h2>${item.name}</h2><b>View template <i class="fa-solid fa-arrow-right"></i></b></div></a>`).join('')}</div></section>` : ''}`;
}
