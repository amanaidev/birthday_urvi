document.addEventListener('DOMContentLoaded', () => {
    
    // Fill search bar when trending tags are clicked
    const tags = document.querySelectorAll('.tag');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            const tagText = e.target.innerText;
            searchInput.value = tagText;
            
            // Add a small visual feedback animation to the input
            searchInput.parentElement.style.transform = 'scale(0.98)';
            setTimeout(() => {
                searchInput.parentElement.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Simulate search action
    searchBtn.addEventListener('click', () => {
        if(searchInput.value.trim() !== '') {
            window.location.href = `templates.html?search=${encodeURIComponent(searchInput.value)}`;
        }
    });

    // Handle pressing Enter in the search bar
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Optional: Smooth scroll for 'Explore' or primary buttons
    const browseBtn = document.querySelector('.cta-section .btn-primary');
    const featuredSection = document.querySelector('.featured');
    
    if (browseBtn && featuredSection) {
        browseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) menuToggle.addEventListener('click', () => {
        const open = nav.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
    });

    document.querySelectorAll('.category-item').forEach(category => {
        category.setAttribute('role', 'link');
        category.setAttribute('tabindex', '0');
        const openCategory = () => window.location.href = `templates.html?search=${encodeURIComponent(category.querySelector('span').textContent)}`;
        category.addEventListener('click', openCategory);
        category.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCategory(); } });
    });
});
