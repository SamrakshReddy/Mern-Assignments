1. Generate package.JSON
    npm init -y    //npm-node package manager

2. create server.js file

3.Install , import "express" and create HTTP server , Assign port number

### connect MongoDB database 

REST API ---> MongoDB native driver ----> MongoDB server
REST API ---> MongoDB ODM tool[Mongoose]----> MongoDB server

a. Install Mongoose and connect to MongoDB database server.
b.create schema of resources 
c. create model of that schema
d. perform DB operations on that model


### Product APIs
product onj schema :{pid,productName,price}
1.POST /products
2.GET /products
3.GET /products/<pid>
4.PUT /products/<pid>


