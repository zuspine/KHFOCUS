const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}));

document.querySelectorAll('.accordion button').forEach(button => button.addEventListener('click', () => {
  const item = button.closest('article');
  const open = !item.classList.contains('open');
  document.querySelectorAll('.accordion article').forEach(row => {
    row.classList.remove('open'); row.querySelector('button').setAttribute('aria-expanded', 'false');
  });
  if (open) { item.classList.add('open'); button.setAttribute('aria-expanded', 'true'); }
}));

const form = document.querySelector('#enquiry');
const status = document.querySelector('#formstatus');
const rules = [
  ['name', v => v.trim().length >= 2, 'Please enter your name.'],
  ['email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Please enter a valid email.'],
  ['service', v => v !== '', 'Please choose a service.'],
  ['message', v => v.trim().length >= 10, 'Please describe your project in at least 10 characters.']
];
form.addEventListener('submit', e => {
  e.preventDefault();
  let first = null;
  rules.forEach(([id, test, msg]) => {
    const field = document.getElementById(id), error = field.nextElementSibling;
    const valid = test(field.value);
    field.classList.toggle('invalid', !valid);
    error.textContent = valid ? '' : msg;
    if (!valid && !first) first = field;
  });
  if (first) { first.focus(); status.textContent = 'Please correct the highlighted fields.'; return; }
  const d = new FormData(form);
  const subject = encodeURIComponent('Project enquiry from ' + d.get('name'));
  const body = encodeURIComponent('Name: ' + d.get('name') + '\nEmail: ' + d.get('email') + '\nService: ' + d.get('service') + '\n\nProject details:\n' + d.get('message'));
  status.textContent = 'Your email application will open with the enquiry prepared. Review it and press Send there.';
  window.location.href = 'mailto:zuspine@gmail.com?subject=' + subject + '&body=' + body;
});
rules.forEach(([id]) => document.getElementById(id).addEventListener('input', e => {
  e.target.classList.remove('invalid'); e.target.nextElementSibling.textContent = '';
}));
document.getElementById('year').textContent = new Date().getFullYear();
