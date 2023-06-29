const { Request, Item, User } = require('../models');

const RequestController = {
    
    //Request to borrow an item
    requestBorrow: async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const userId  = req.params.userId; 
    
            const newRequest = await Request.create({
                itemId, 
                userId,
            })
            res.json(newRequest);
    
        } catch (error) {
            res.status(500).json({ message: 'Failed to request borrowing item'})
    
        }
    },

    //Get all requests for an item
    allRequests: async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const requests = await Request.findAll({ where: { itemId }})
            res.json(requests);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get requests' })
        }
    },

    //Approve a request 
    approve:  async (req, res) => {
        try {
            const requestId = req.params.requestId;
    
            const request = await Request.findByPk(requestId);
            if (!request){
                return res.status(404).json({ message: 'Request not found' })
            }
            await request_status.update({ status: 'approved' });
            res.json({ message: 'Request approved!' })
        
        } catch (error) {
            res.status(500).json({ error: 'Failed to approve request' })
        }
    },

    //Reject a request
    reject: async (req, res) => {
        try {
            const requestId = req.params.requestId;
    
            const request = await Request.findByPk(requestId);
            if (!request){
                return res.status(404).json({ message: 'Request not found' })
            }
            await request_status.update({ status: 'rejected' })
            res.json({ message: 'Request rejected! '})
    
        } catch (error) {
            res.status(500).json({ message: 'Failed to reject request' })
        }
    }
}