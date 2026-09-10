import { getTemplate } from './data.js';
import { escapeHtml, templateArt } from './shared.js';
const root = document.querySelector('#wish-root');
let wish;
try { wish = JSON.parse(sessionStorage.getItem('itsyourday-wish')); } catch { wish = null; }
if (!wish || !getTemplate(wish.templateId)) {
  root.innerHTML = `<section class="wish-missing"><i class="fa-solid fa-gift"></i><h1>This wish is waiting to be made.</h1><p>Choose a template and add your personal message to see the magic here.</p><a class="btn btn-primary" href="../templates.html">Choose a template</a></section>`;
} else {
  const template = getTemplate(wish.templateId);
  root.innerHTML = `<section class="wish-experience"><button class="replay-button" type="button" aria-label="Replay celebration"><i class="fa-solid fa-rotate-right"></i> Replay</button><div class="wish-confetti" aria-hidden="true">✦ ♥ ✦ • ✦ ♥</div><div class="wish-stage">${templateArt(template, 'wish-art')}<article class="wish-message"><p class="wish-greeting">Dear ${escapeHtml(wish.recipient)},</p><h1>A little something just for you</h1><blockquote>${escapeHtml(wish.message)}</blockquote>${wish.photoUrl ? `<img src="${wish.photoUrl}" alt="A shared memory">` : ''}<p class="wish-signoff">With all my love,<br><strong>${escapeHtml(wish.sender)}</strong></p></article></div><a class="create-own" href="../templates.html">Create a wish of your own <i class="fa-solid fa-arrow-right"></i></a></section>`;
  document.querySelector('.replay-button').addEventListener('click', () => { root.classList.remove('replaying'); void root.offsetWidth; root.classList.add('replaying'); });
}
