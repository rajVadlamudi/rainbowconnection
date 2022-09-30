# rainbowconnection
The Rainbowconnection application has been developed entirely in Javascript and Typescript following the *MERN stack principle.

I have implemented the application based on MVC architecture.

The V-View has been implemented with the React+Typescript+Material-ui libraries(code base:./frontend folder)

The M-Model has been built on MongoDB and data hosted on MongoDB atlas

The C-Controller has been built on nodejs and express following REST API principles


//Backend

The routes for CRUD functions are here (code base:./backend/routes/mainrouter.ts)

The user data model is defined here (code base:./backend/models/datamodel.ts)

The CRUD functions are defined here (code base:./backend/controllers/maincontroller.ts)


//Frontend

The routes to navigate to the intial view & user view are defined here (code base:./frontend/src/Main.ts)

The initial view page component are defined here (code base:./frontend/src/components/MainView.ts)

The user view page component are defined here (code base:./frontend/src/components/UserView.ts)



Trade off:
- This application currently runs locally and is not hosted in AWS or docker

- I have fixed maximum 2 connections to be picked randomly for each user



# Requirements:

Nodejs: v14.17.0 or higher

npm: 6.14.13

# How to run the application

1. Clone the rainbowconnection repository from https://github.com/rajVadlamudi/rainbowconnection/tree/master
2. Open code editor e.g VS Code and open project rainbowconnection
3. open terminal from rainbowconnection folder
4. Command: git checkout master
5. The rainbowconnection folder will contain 2 subfolders /backend and /frontend
6. In code editor open ./backend/.env file, then update MONGO_URI with db credentials sent in email and save changes
7. Open 2 more terminals
8. In terminal 1, cd ./backend
9. In terminal 2, cd ./frontend
10. In terminal 1, command: npm i
11. In terminal 2, command: npm i
12. In terminal 1, command: npm link typescript
13. In terminal 2, command: npm link typescript
14. In terminal 1, command: npm run dev
15. In terminal 2, command: npm run start
16. In terminal 1, the following message will display
server started on PORT 8000
MongoDB connected
17. In terminal 2, the front end UI will launch in the browser, if not open http://localhost:3000


# Test Endpoint to Generate Random User e.g 500 users

http://localhost:8000/api/projects/random/500

# Endpoint to load a user

http://localhost:8000/api/projects/6336973385148c6fe51fd48b


*(MongoDB, Express, React, Nodejs)
