document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch your items
    const myItemsResponse = await fetch('/api/items/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const myItemsData = await myItemsResponse.json();
    console.log('My Items:', myItemsData); // Log the response data to check its structure
    const myItems = myItemsData || []; // Use an empty array as a fallback if myItemsData is undefined

    // Fetch the items you have borrowed
    const borrowedItemsResponse = await fetch('/api/borrows/mine', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const borrowedItemsData = await borrowedItemsResponse.json();
    console.log('Borrowed Items:', borrowedItemsData); // Log the response data to check its structure
    const borrowedItems = borrowedItemsData || []; // Use an empty array as a fallback if borrowedItemsData is undefined

    // Render my items
    myItems.forEach(item => {
      // Render your item cards using the 'item' variable
      const borrowedByElement = document.getElementById(
        `borrowedBy-${item.id}`
      );
      console.log('borrowBy>>>>', borrowedByElement);
      if (borrowedByElement) {
        if (item.borrowed_by) {
          fetch(`/api/users/${item.borrowed_by}`)
            .then(response => response.json())
            .then(user => {
              borrowedByElement.textContent = `Borrowed by: ${user.firstName}`;
            })
            .catch(error => {
              console.error(error);
              borrowedByElement.textContent = `Borrowed by: Unknown user`;
            });
        } else {
          borrowedByElement.textContent = `Available for borrowing`;
        }
      }
    });

    // Render my borrowed items
    borrowedItems.forEach(async item => {
      // Render borrowed item cards using the 'item' variable
      const borrowedFromElement = document.getElementById(
        `borrowedFrom-${item.id}`
      );
      console.log('borrowFrom>>>>', borrowedFromElement);
      if (borrowedFromElement) {
        if (item.borrowedBy) {
          fetch(`/api/users/${item.borrowedBy}`)
            .then(response => response.json())
            .then(user => {
              borrowedFromElement.textContent = `Borrowed from: ${user.firstName}`;
            })
            .catch(error => {
              console.error(error);
              borrowedFromElement.textContent = `Borrowed from: Unknown user`;
            });
        } else {
          borrowedFromElement.textContent = `Borrowed from: Unknown user`;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
});
