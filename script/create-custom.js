import { setupNav } from './shared.js';
setupNav();
const form = document.querySelector('#custom-form');
form.addEventListener('submit', event => { event.preventDefault(); const error = document.querySelector('#custom-error'); if (!form.checkValidity()) { error.textContent = 'Please complete the marked details so we understand your idea.'; return; } form.hidden = true; document.querySelector('#custom-success').hidden = false; });
