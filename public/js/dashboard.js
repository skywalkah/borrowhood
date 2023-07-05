document.addEventListener('DOMContentLoaded', async () => {
  // Fetch the pending item requests
  const pendingItemResponse = await fetch('/api/users/requests/pending', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const pendingItemData = await pendingItemResponse.json();
  const pendingItem = pendingItemData || [];

  // Render my pending item requests
  //Check if pending item is array before iterating
  if (Array.isArray(pendingItem)) {
    pendingItem.forEach(async request => {
      const requestStatusElement = document.getElementById(
        `requestStatus-${request.id}`
      );
      if (requestStatusElement) {
        requestStatusElement.textContent = `Request Status: ${request.request_status}`;
      }
    });
  }

  // Accept request button
  document.addEventListener('click', async event => {
    if (event.target.classList.contains('approve-button')) {
      const userId = event.target.getAttribute('data-user-id');
      const requestId = event.target.getAttribute('data-request-id');
      try {
        const response = await fetch(
          `/api/users/${userId}/requests/${requestId}/approve`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.ok) {
          console.log('Request approved!');
          location.reload();
        } else {
          console.error('Failed to approve request');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  // Deny borrow request button
  document.addEventListener('click', async event => {
    if (event.target.classList.contains('deny-button')) {
      const userId = event.target.getAttribute('data-user-id');
      const requestId = event.target.getAttribute('data-request-id');
      try {
        const response = await fetch(
          `/api/users/${userId}/requests/${requestId}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.ok) {
          console.log('Request denied!');
          location.reload();
        } else {
          console.error('Failed to deny request');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
  // Delete item button
  document.addEventListener('click', async event => {
    if (event.target.classList.contains('delete-button')) {
      const itemId = event.target.closest('.feed-card').id.split('-')[1];
      try {
        const response = await fetch(`/api/items/${itemId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          console.log('Item deleted!');
          location.reload();
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  // Add New Item
  const addItemHandler = async event => {
    event.preventDefault();

    const item_name = document.querySelector('#item_name').value.trim();
    const item_description = document
      .querySelector('#item_description')
      .value.trim();
    const item_condition = document
      .querySelector('#item_condition')
      .value.trim();

    if (item_name && item_description && item_condition) {
      const response = await fetch('/api/items', {
        method: 'POST',
        body: JSON.stringify({
          item_name,
          item_description,
          item_condition,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const alert = createAlert('An error occurred. Please try again.');
        appendAlert(alert);
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
    const registrationAlert = document.getElementById('add-item-alert');
    registrationAlert.innerHTML = '';
    registrationAlert.appendChild(alert);
  };

  document
    .getElementsByClassName('add-item-form')[0]
    .addEventListener('submit', addItemHandler);
});
