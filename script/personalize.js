import { getTemplate } from './data.js';
import { getQuery, escapeHtml, templateArt } from './shared.js';
const template = getTemplate(getQuery('id')) || getTemplate('birthday-confetti');
const form = document.querySelector('#wish-form');
const photo = document.querySelector('#photo');
const fields = ['recipient', 'sender', 'message'].map(id => document.querySelector(`#${id}`));
const preview = document.querySelector('#preview-card');
const count = document.querySelector('#message-count');
let photoUrl = '';
function render() { const [recipient, sender, message] = fields.map(field => field.value); count.textContent = message.length; preview.innerHTML = `${templateArt(template, 'preview-art')}<div class="wish-copy"><p>Dear ${escapeHtml(recipient || 'someone special')},</p><blockquote>${escapeHtml(message || 'Your heartfelt message will appear here.')}</blockquote><small>With love, ${escapeHtml(sender || 'you')}</small>${photoUrl ? `<img src="${photoUrl}" alt="Your selected memory">` : ''}</div>`; }
fields.forEach(field => field.addEventListener('input', render));
photo.addEventListener('change', () => { const file = photo.files[0]; if (!file) return; if (file.size > 3 * 1024 * 1024) { document.querySelector('#form-error').textContent = 'Please choose an image under 3 MB.'; photo.value = ''; return; } photoUrl = URL.createObjectURL(file); render(); });
form.addEventListener('reset', () => setTimeout(() => { photoUrl = ''; document.querySelector('#form-error').textContent = ''; render(); }, 0));
form.addEventListener('submit', event => { event.preventDefault(); if (!form.checkValidity()) { document.querySelector('#form-error').textContent = 'Please add a recipient, your name and a short message.'; return; } sessionStorage.setItem('itsyourday-wish', JSON.stringify({ templateId: template.id, recipient: fields[0].value, sender: fields[1].value, message: fields[2].value, photoUrl })); window.location.href = template.experienceUrl || 'wish/index.html'; });
render();
