## Store Manager

Projects developed at the end of block 23 at Trybe, in which I studied _Node.js, software architecture, and unitary tests_.

![thunder-client-result](https://user-images.githubusercontent.com/99998543/189990778-b0fc5313-5815-4056-ab52-b781304d5fa4.png)

### How it works

This project consisted of creating routes, with the methods POST, PUT, GET and DELETE to access a database, creating a backend application. Also, I worked with Joi to create validations and mocha, chai, and sinon to create unit tests.

### Endpoints

<details>
<summary><h4>POST</h4></summary>

- **`/products`**: to register a new product.
	- requisition body model:
```json
{
  "name": "product",
}
```
- **`/sales`**: to register a new sale.
	- requisition body model:
```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```
</details>

<details>
<summary><h4>GET</h4></summary>

- **`/products`**: to list all products.
- **`/products/:id`**: to find a product by its id.
- **`/sales`**: to list all sales.
- **`/sales/:id`**: to find a sale by its id.
- **`/products/search`**: using a `q` query on the endpoint, you can search by a word, and find all products that have this word in their name.
	- example: `.../products/search?q=searchTerm`.
</details>

<details>
<summary><h4>DELETE</h4></summary>

- **`/products/:id`**: to delete a product. 
- **`/sales/:id`**: to delete a sale. 
</details>

<details>
<summary><h4>PUT</h4></summary>

- **`/products/:id`**: to update a product.
 	- requisition body model:
```json
{
  "name": "product",
}
```
- **`/sales`**: to update a sale.
	- requisition body model:
```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```
</details>

----------

If you see something that can be improved, don’t hesitate to get in touch with me! All feedback is very welcome.✨
