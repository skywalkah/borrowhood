const registrationHandler = async event => {
  event.preventDefault();

  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password && firstName && lastName) {
    if (password.length < 8) {
      const alert = createAlert('Password must be at least 8 characters long.');
      appendAlert(alert);
    } else {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setTimeout(() => {
          console.log('success');
          window.location.href = '/feed'; // Redirect to /feed with full page refresh
        }, 0);
      } else {
        const alert = createAlert('An error occurred. Please try again.');
        appendAlert(alert);
      }
    }
  } else {
    const alert = createAlert('Please make sure all fields are filled out.');
    appendAlert(alert);
  }
};

const createAlert = message => {
  const alert = document.createElement('div');
  alert.className = 'alert alert-error';
  alert.innerHTML = `
    <svg xmlns='http://www.w3.org/2000/svg' class='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
      <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
    </svg>
    <span>${message}</span>
  `;

  return alert;
};

const appendAlert = alert => {
  const registrationAlert = document.getElementById('registration-alert');
  registrationAlert.innerHTML = '';
  registrationAlert.appendChild(alert);
};

document
  .querySelector('.registration-form')
  .addEventListener('submit', registrationHandler);
