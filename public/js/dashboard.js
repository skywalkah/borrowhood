document.addEventListener('DOMContentLoaded', async () => {
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
        const response = await fetch(`api/items/${itemId}`, {
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

  // // Add Review
  const addReviewHandler = async event => {
    event.preventDefault();

    if (event.target.classList.contains('review-form')) {
      const ratings = document.querySelectorAll('.rating input');
      let rating = 0;
      ratings.forEach((selectedRating, index) => {
        if (selectedRating.checked) {
          rating = index + 1;
        }
      });

      const itemId = event.target.getAttribute('data-item-id');
      const review_text = document.querySelector(`.add-review-txtarea`).value;
      try {
        const response = await fetch(`/api/reviews`, {
          method: 'POST',
          body: JSON.stringify({
            rating,
            review_text,
            itemId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Review submitted!');
          location.reload();
        } else {
          console.error('Failed to submit review');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  document
    .getElementsByClassName('review-form')[0]
    .addEventListener('submit', addReviewHandler);

  //Initiating a return
  const returnButtons = document.querySelectorAll('.return-button');

  returnButtons.forEach(function (button) {
    button.addEventListener('click', async function () {
      const itemId = button.getAttribute('data-item-id');
      try {
        const response = await fetch(`api/users/items/${itemId}/return`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        });

        if (!response.ok) {
          throw new Error('Failed to initiate return');
        }

        console.log('Return initiated successfully');
      } catch (error) {
        console.error('Failed to initiate return:', error);
      }
    });
  });
});
