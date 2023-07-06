document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const passwordForm = document.getElementById('password-form');

  // Handle profile form submission
  profileForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(profileForm);
    const payload = Object.fromEntries(formData.entries()); // Convert FormData to plain object

    const response = await fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Profile updated successfully!');
      location.reload();
    } else {
      alert('Failed to update profile. Please try again.');
    }
  });

  // Handle password form submission
  passwordForm.addEventListener('submit', async event => {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    const data = {
      currentPassword,
      newPassword,
    };

    const response = await fetch('/api/users/reset', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Password reset successful!');
    } else {
      alert('Failed to reset password. Please try again.');
    }
  });
});
