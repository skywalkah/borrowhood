const { User, Request, Item } = require('../models');

// CREATE new user
module.exports = {
  register: async (req, res) => {
    const {
      body: { firstName, lastName, email, password },
    } = req;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        res.status(200).json(user);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    const {
      body: { email, password },
    } = req;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['createdAt, updatedAt'] },
      });

      if (!user) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        res.status(200).json({
          user,
          message: 'You are now logged in!',
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  logout: (req, res) => {
    if (req.session.isAuthenticated) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Get user by ID
  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        // Exclude password from the user
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get all users with their associated items
  getAllUsersWithItems: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: {
          model: Item,
          as: 'items',
        },
      });

      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Create a borrow request
  createRequest: async (req, res) => {
    try {
      const { userId } = req.params;
      const { item_id, request_status } = req.body;

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user already has a request for the same item
      const existingRequest = await Request.findOne({
        where: { user_id: userId, item_id },
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: 'You already have a request for this item' });
      }

      // Create the request
      const request = await Request.create({
        user_id: userId,
        item_id,
        request_status,
      });

      return res.status(201).json(request);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Get all borrow requests for a user
  getAllBorrowRequests: async (req, res) => {
    try {
      const requests = await Request.findAll({
        where: { user_id: req.params.userId },
        include: [{ model: Item, as: 'item' }],
      });

      if (requests.length === 0) {
        return res
          .status(404)
          .json({ message: 'This user has no borrow requests' });
      }

      return res.json(requests);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Approve a borrow request
  approveBorrowRequest: async (req, res) => {
    try {
      const request = await Request.findByPk(req.params.requestId, {
        include: [{ model: Item, as: 'item' }],
      });

      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Ensure that the authenticated user is the owner of the item
      if (req.session.currentUser.id !== request.item.user_id) {
        return res
          .status(403)
          .json({ message: 'Only the owner can approve this request' });
      }

      if (request.request_status !== 'pending') {
        return res.status(400).json({ message: 'Request is not pending' });
      }

      await request.update({ request_status: 'approved' });
      await Item.update(
        { is_available: false, borrowed_by: request.user_id },
        { where: { id: request.item_id } }
      );

      return res.json(request);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Reject a borrow request
  rejectBorrowRequest: async (req, res) => {
    try {
      const request = await Request.findByPk(req.params.requestId, {
        include: [{ model: Item, as: 'item' }],
      });

      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Ensure that the authenticated user is the owner of the item
      if (req.session.currentUser.id !== request.item.user_id) {
        return res
          .status(403)
          .json({ message: 'Only the owner can reject this request' });
      }

      if (request.request_status !== 'pending') {
        return res.status(400).json({ message: 'Request is not pending' });
      }

      await request.update({ request_status: 'rejected' });
      return res.json(request);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Cancel a borrow request
  cancelRequest: async (req, res) => {
    try {
      const { requestId } = req.params;

      // Find the request
      const request = await Request.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Cancel the request
      await request.destroy();

      return res.status(200).json({ message: 'Request canceled' });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
