document.addEventListener('DOMContentLoaded', async () => {
  // Fetch the pending item requests
  const pendingItemResponse = await fetch('/api/users/requests/pending', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const pendingItemData = await pendingItemResponse.json();
  const pendingItem = pendingItemData || [];

  // Render my pending item requests
  pendingItem.forEach(async request => {
    const requestStatusElement = document.getElementById(
      `requestStatus-${request.id}`
    );
    if (requestStatusElement) {
      requestStatusElement.textContent = `Request Status: ${request.request_status}`;
    }
  });

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
});
