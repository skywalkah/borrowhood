const loginFormHandler = async event => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Add the Accept header
      },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/feed');
      }, 0);
    } else {
      const alert = createAlert(
        'Invalid email and/or password. Please try again'
      );
      appendAlert(alert);
    }
  } else {
    const alert = createAlert('Email and/or password required.');
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
  const loginAlert = document.getElementById('login-alert');
  loginAlert.innerHTML = '';
  loginAlert.appendChild(alert);
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
