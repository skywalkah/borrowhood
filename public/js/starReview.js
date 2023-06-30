document.addEventListener('DOMContentLoaded', () => {
    const starLabels = document.querySelector('label[for^="star"]')

    starLables.forEach((label, index) => {
        label.addEventListener('click', async () => {
            const rating = parseInt(index) + 1; 

        for (let i = 0; i <= index; i++){
            starLabels[i].classList.add('selected');
        }

        for (let i = index + 1; i < starLabels.length; i++){
            starLabels[i].classList.remove('selected');
        }

        const ratingNumber = {
            rating: rating
        }

        try {
            const response = await fetch ('/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ratingNumber)
            })
            if (response.ok) {
                console.log('Rating submitted');
            } else{
                console.log('Error entering rating', response.status)
            }
        } catch (error) {
            console.log('Error entering rating', error)
        }
        });
    });
});