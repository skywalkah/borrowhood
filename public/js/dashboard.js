document.addEventListener('DOMContentLoaded', async () => {
  // Fetch the items
  const response = await fetch('/api/items', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  const items = data;

  // Update the item cards
  items.forEach(async item => {
    const borrowedUserElement = document.getElementById(
      `borrowedUser-${item.id}`
    );
    if (item.borrowed_by) {
      const userResponse = await fetch(`/api/users/${item.borrowed_by}`);
      const userData = await userResponse.json();
      const borrowedUserFirstName = userData.firstName;
      if (borrowedUserElement) {
        borrowedUserElement.textContent = `Borrowed by ${borrowedUserFirstName}`;
      }
    }
  });
});
