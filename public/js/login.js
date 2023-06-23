const loginFormHandler = async event => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const { message } = await response.json();
      // eslint-disable-next-line no-undef
      showAlert({ target: 'login-alert', message, type: 'danger' });
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
