document.addEventListener('DOMContentLoaded', async () => {
  const updateBorrowedUserNames = async () => {
    const borrowedByElements = document.getElementsByClassName('borrowed-by');
    for (const element of borrowedByElements) {
      const userId = element.textContent; // User ID is stored as text content

      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          const borrowedUserFirstName = user.firstName;
          element.textContent = borrowedUserFirstName || 'User not found';
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (error) {
        console.error(error);
        element.textContent = 'User not found';
      }
    }
  };

  // Call the function to update the borrowed user names
  await updateBorrowedUserNames();
});
