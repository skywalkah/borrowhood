document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/reviews');
    if (response.ok) {
      const reviews = await response.json();
      const ratings = reviews.map(review => review.rating);
      const averageRating = calculateAverageRating(ratings);
      const starRating = convertToStarRating(averageRating);

      displayStarRating(starRating);
    } else {
      console.log('Error retrieving reviews:', response.status);
    }
  } catch (error) {
    console.log('Error retrieving reviews:', error);
  }
});

function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
}

function convertToStarRating(rating) {
  const roundedRating = Math.round(rating);
  return '*'.repeat(roundedRating);
}

function displayStarRating(starRating) {
  const starRatingElement = document.querySelector('#starRating');
  starRatingElement.textContent = starRating;
}
