document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch your items
    const myItemsResponse = await fetch('/api/items/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const myItemsData = await myItemsResponse.json();
    const myItems = myItemsData || [];

    // Fetch the items you have borrowed
    const borrowedItemsResponse = await fetch('/api/borrows/mine', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const borrowedItemsData = await borrowedItemsResponse.json();
    const borrowedItems = borrowedItemsData || [];

    // Fetch the pending item requests
    const pendingItemResponse = await fetch('/api/users/requests/pending', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const pendingItemData = await pendingItemResponse.json();
    const pendingItem = pendingItemData || [];

    // Render my items
    myItems.forEach(item => {
      // Render your item cards using the 'item' variable
      const borrowedByElement = document.getElementById(
        `borrowedBy-${item.id}`
      );
      if (borrowedByElement) {
        if (item.borrowed_by) {
          fetch(`/api/users/${item.borrowed_by}`)
            .then(response => response.json())
            .then(user => {
              borrowedByElement.textContent = `Borrowed by ${user.firstName}`;
            })
            .catch(error => {
              console.error('2', error);
              borrowedByElement.textContent = `Borrowed by unknown user`;
            });
        } else {
          borrowedByElement.textContent = `Available for borrowing`;
        }
      }
    });

    // Render my borrowed items
    if (Array.isArray(borrowedItems)) {
      borrowedItems.forEach(async item => {
        // Render borrowed item cards using the 'item' variable
        const borrowedFromElement = document.getElementById(
          `borrowedFrom-${item.id}`
        );
        if (borrowedFromElement) {
          if (item.borrowedBy) {
            fetch(`/api/users/${item.borrowedBy}`)
              .then(response => response.json())
              .then(user => {
                borrowedFromElement.textContent = `Borrowed from: ${user.firstName}`;
              })
              .catch(error => {
                console.error('1', error);
                borrowedFromElement.textContent = `Borrowed from: Unknown user`;
              });
          } else {
            borrowedFromElement.textContent = `Borrowed from: Unknown user`;
          }
        }
      });
    }

    // Render my pending item requests
    pendingItem.forEach(async request => {
      const requestStatusElement = document.getElementById(
        `requestStatus-${request.id}`
      );
      if (requestStatusElement) {
        requestStatusElement.textContent = `Request Status: ${request.request_status}`;
      }
    });

  } catch (error) {
    console.error(error);
  }
});
