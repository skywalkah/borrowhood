# API Documentation
## Users:

To register a new user: **PUT** | http://localhost:3001/api/register  
```code
{
  "firstName": "Matt",
  "lastName": "Damon",
  "email": "matt@gmail.com",
  "password": "mattdamon"
}
```
To login: **PUT** | http://localhost:3001/api/login  
```code
{
  "email": "matt@gmail.com",
  "password": "mattdamon"
}
```  
To logout: **PUT** | http://localhost:3001/api/logout  

---

## Items:

To get all items: **GET** | http://localhost:3001/api/items/  
To get all items and their reviews: **GET** | http://localhost:3001/api/items/reviews/  
To get an item by ID: **GET** | http://localhost:3001/api/items/:id  
To get an item by ID and with its reviews: **GET** | http://localhost:3001/api/items/reviews/:id  
To create an item: **PUT** | http://localhost:3001/api/items/  
```code
{
  "item_name": "New Item",
  "item_description": "Add description",
  "item_condition": "Add item condition",
  "user_id": 2
}
```
To update an item: PUT | http://localhost:3001/api/items/:id  
```code
{
  "item_name": "Updated name",
  "item_description": "Updated description",
  "item_condition": "updated condition",
  "user_id": 2 // Assigned to a different owner
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
  "itemId": 1
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
