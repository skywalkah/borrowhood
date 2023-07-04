document.addEventListener('DOMContentLoaded', () => {
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
});
