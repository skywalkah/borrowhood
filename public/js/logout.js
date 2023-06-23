const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const { message } = await response.json();
    // eslint-disable-next-line no-undef
    showAlert({ message, type: 'danger' });
  }
};

document.querySelector('#logout').addEventListener('click', logout);
