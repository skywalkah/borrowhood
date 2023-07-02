# API Documentation
## Users:

To register a new user: **PUT** | http://localhost:3001/api/users/register  
```code
{
  "firstName": "Matt",
  "lastName": "Damon",
  "email": "matt@gmail.com",
  "password": "mattdamon"
}
```
To login: **PUT** | http://localhost:3001/api/users/login  
```code
{
  "email": "matt@gmail.com",
  "password": "mattdamon"
}
```  
To logout: **PUT** | http://localhost:3001/api/users/logout  
To get user by id: **GET** | http://localhost:3001/api/users/:id
To get all users: **GET** | http://localhost:3001/api/users/   
To get all users and their associated items:  **GET** | http://localhost:3001/api/users/items   

---

## Items:

To get all items: **GET** | http://localhost:3001/api/items/  
To get my (the logged in user) items: **GET** | http://localhost:3001/api/items/me  
To get items I borrowed: **GET** | http://localhost:3001/api/borrows/mine
To get borrowed items by ID: **GET** | http://localhost:3001/api/borrows/:userId
To get all items and their reviews: **GET** | http://localhost:3001/api/items/reviews/  
To get an item by ID: **GET** | http://localhost:3001/api/items/:id  
To get an item by ID and with its reviews: **GET** | http://localhost:3001/api/items/reviews/:id  
To create an item: **PUT** | http://localhost:3001/api/items/  
```code
{
  "item_name": "New Item",
  "item_description": "Add description",
  "item_condition": "Add item condition"
}
```
To update an item: PUT | http://localhost:3001/api/items/:id/update
```code
{
  "item_name": "Updated name",
  "item_description": "Updated description",
  "item_condition": "updated condition",
  "user_id": id // Assigned to a different owner
}
```
To delete an item: **DELETE** | http://localhost:3001/api/items/:id

---
## Reviews

To get a review by id: **GET** | http://localhost:3001/api/reviews/:id  
To get all reviews: **GET** | http://localhost:3001/api/reviews/  
To create a review: **PUT** | http://localhost:3001/api/reviews/  
```code
{
  "rating": 4,
  "comment": "This item is great!",
  "itemId": id
}
```
To update a review: PUT | http://localhost:3001/api/reviews/:id  
```code
{
  "rating": 2, // updated rating
  "review_text": "Updated text"
}
```
To delete a review: **DELETE** | http://localhost:3001/api/reviews/:id  

---
## Borrow requests
Create borrow request: **POST** | http://localhost:3000/api/users/requests/create
```code
{
	"item_id": id
}
```
Get all borrow requests for a user: **GET** | http://localhost:3001/api/users/:userId/requests  
Approve borrow request: **PUT** | http://localhost:3001/api/users/:userId/requests/:requestId/approve  
Reject borrow request: **PUT** | http://localhost:3001/api/users/:userId/requests/:requestId/reject  
Cancel borrow request: **DELETE** | http://localhost:3001/api/users/:userId/requests/:requestId

## Return requests
Return request: **Post** | http://localhost:3001/api/users/items/:itemId/return  
Approve return request: **Put** | http://localhost:3001/api/users/items/:itemId/return/approve  