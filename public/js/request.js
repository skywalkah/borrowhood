// Function to handle the borrow request
async function handleBorrowRequest(event) {
  try {
    const button = event.target;
    const itemId = button.dataset.itemId;
    const userId = button.dataset.userId;

    // Create the request payload
    const payload = {
      item_id: parseInt(itemId),
      request_status: 'pending',
    };

    // Send the POST request to create the borrow request
    const response = await fetch(`/api/users/${userId}/requests/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Error creating borrow request');
    }

    // Process the response
    const request = await response.json();
    console.log('Borrow request created:', request);
  } catch (error) {
    console.error('Error creating borrow request:', error.message);
  }
}

const borrowButtons = document.querySelectorAll('.borrow-button');
borrowButtons.forEach(button => {
  button.addEventListener('click', handleBorrowRequest);
});
