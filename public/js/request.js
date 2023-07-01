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

    // Check if the request is approved
    if (request.request_status === 'approved') {
      // Disable the borrow button and update the text
      button.disabled = true;
      button.textContent = 'Borrowed';

      // Update the item's borrowed_by field
      const itemResponse = await fetch(`/api/items/${itemId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ borrowed_by: userId }),
      });

      if (!itemResponse.ok) {
        throw new Error('Error updating item');
      }

      // Process the item response
      const item = await itemResponse.json();
      console.log('Item updated:', item);
    }
  } catch (error) {
    console.error('Error creating borrow request:', error.message);
  }
}

const borrowButtons = document.querySelectorAll('.borrow-button');
borrowButtons.forEach(button => {
  button.addEventListener('click', handleBorrowRequest);
});
