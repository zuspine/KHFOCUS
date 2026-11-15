const menuButtons = document.querySelectorAll('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('.site-header');

function toggleMenu(forceClose = false) {
  const open = forceClose ? false : !mobileNav.classList.contains('open');
  mobileNav.classList.toggle('open', open);
  header.classList.toggle('menu-open', open);
  menuButtons.forEach((button) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

menuButtons.forEach((button) => button.addEventListener('click', () => toggleMenu()));
mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => toggleMenu(true));
});

// Filter the portfolio by discipline.
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;

    projects.forEach((project) => {
      const visible = category === 'all' || project.dataset.category === category;
      project.classList.toggle('hidden', !visible);
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
