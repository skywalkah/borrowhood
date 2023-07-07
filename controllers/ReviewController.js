const { Review } = require('../models');

const ReviewController = {
  // Get all reviews
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.findAll();
      return res.json(reviews);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get a specific review by ID
  getReview: async (req, res) => {
    try {
      const review = await Review.findByPk(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      return res.json(review);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Create a new review
  createReview: async (req, res) => {
    try {
      const { rating, review_text, itemId } = req.body;
      const review = await Review.create({
        rating,
        review_text,
        item_id: itemId,
      });
      res.status(200).json(review);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a specific review by ID
  updateReview: async (req, res) => {
    try {
      await Review.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      const updatedReview = await Review.findByPk(req.params.id);
      if (!updatedReview)
        return res.status(404).json({ message: 'Review not found' });
      return res.json(updatedReview);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a specific review by ID
  deleteReview: async (req, res) => {
    try {
      const result = await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) return res.status(404).json({ message: 'Review not found' });
      res.status(200).json({ message: 'Bye bye review! Biased much?' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Get the review Partial
  getPartial: async (req, res) => {
    try {
      const reviewsPartial = await generateReviewsPartial(req.params.itemId);
      res.send(reviewsPartial);
    } catch (error) {
      console.error('Failed to generate reviews partial:', error);
      res.status(500).send('Failed to generate reviews partial');
    }

    function generateReviewsPartial(id) {
      return new Promise(resolve => {
        setTimeout(() => {
          const reviewsPartial = `
          <div class='collapse'>
            <input type='checkbox' class='peer' /> 
            <div class='collapse-title'>
              Would you like to leave a review?
            </div>
            <div class='collapse-content'> 
              <form id='review-form-${id}' class='space-y-4 review-form' data-item-id=${id}>
                <div class='form-control'>
                  <label for='review-form' class='add-review-input'>
                    <div class='rating'>
                      <input type='radio' name='rating-2' class='mask mask-star-2 bg-orange-400 stars' checked />
                      <input type='radio' name='rating-2' class='mask mask-star-2 bg-orange-400 stars' />
                      <input type='radio' name='rating-2' class='mask mask-star-2 bg-orange-400 stars'/>
                      <input type='radio' name='rating-2' class='mask mask-star-2 bg-orange-400 stars' />
                      <input type='radio' name='rating-2' class='mask mask-star-2 bg-orange-400 stars' />
                    </div>
                  </label>
                  <label for='review-form' class='add-review-text'>
                    <textarea placeholder='Comment' class='textarea textarea-bordered textarea-md add-review-txtarea' ></textarea>
                  </label>
                </div>
                <div class ='add-review-button-div'>
                  <button type='submit' class='btn mt-4 add-review-button'>Add Review</button>
                </div>
              </form>
            </div>
          </div>
        `;
          resolve(reviewsPartial);
        }, 1000);
      });
    }
  },
};

module.exports = ReviewController;
