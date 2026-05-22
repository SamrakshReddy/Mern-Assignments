

***STEPS TO CREATE A BACKEND***

1.Generate package.JSON
       npm init -y    //npm-node package manager

2. Create HTTP Server
        a.Install and Import "express" module
                npm install express
        b.Import express module
                create server.js file
                   . //create express module
                    import exp from 'express'
                    .//create express app
                     const app = exp(); 
                    .//assign port number
                     app.listen(3000,()=>{
                        console.log("Server is running on port 3000")
                     })



***HTTP REQUEST TYPES***[CURD OPERATIONS]

GET -Read a resource
POST -Create a resource
PUT -Update a resource
DELETE -Delete a resource

USER API
GET   http://127.0.0.1:3000/users
POST  http://127.0.0.1:3000/users
PUT   http://127.0.0.1:3000/users/<id>
DELETE http://127.0.0.1:3000/users/<id>

get and delete do not have the body.

###
create products API in the same file
 description of products obj:
                {
                    productId,
                    name,
                    price,
                    brand
                }