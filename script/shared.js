export function getQuery(name) { return new URLSearchParams(window.location.search).get(name); }

export function escapeHtml(value = '') {
  const node = document.createElement('div');
  node.textContent = value;
  return node.innerHTML;
}

export function setupNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
  });
}

export function templateArt(template, extra = '') {
  return `<div class="card-art art-${template.palette} ${extra}" aria-hidden="true"><i class="fa-solid ${template.icon}"></i><span>${template.name}</span><b>✦</b></div>`;
}
