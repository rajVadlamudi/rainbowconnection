import { Response, Request } from 'express';
import mongoose from "mongoose";

const Q = require('q');

const asyncHandler = require('express-async-handler');

const DataModel = require('../models/dataModel')

const primaryColors:String[] = ['red', 'green', 'blue', 'black']

interface User {
    _id: string;
    fullname: string;
    color: string;
    connections: Array<User>;
};

//create list of usernames (firstname lastname)
const createUserNames = (count: Number) => {
    const randomNames = require('random-name')
    let namesList:String[] = [];
    for (let i = 0; i < count; i++) {
        namesList.push(randomNames());
    }
    return namesList
}

//Clear the database rainbowconnections
const deleteAllUsers = asyncHandler(async () => {
    let cleanDB = await DataModel.deleteMany({})
})

//create list of users with random primary color and maximun 2 connections
const setUsers = asyncHandler(async (req: Request, res: Response) => {
    const count = Number(req.params.usercount)
    if (count && count > 0 && count < 1000000) {
        //clear database
        await deleteAllUsers();

        //create users with fullname, color and no connections
        let userNamesList = createUserNames(count);
        let usersList = [];
        for (let i = 0; i < count; i++) {
            usersList.push({
                fullname: userNamesList[i],
                color: primaryColors[Math.floor(Math.random() * 4)],
                connections: []
            });
        }
        const deferred = Q.defer();
        let promises = [];
        for (const r in usersList) {
            const promise = await DataModel.create(usersList[r]);
            promises.push(promise);
        }
        Q.all(promises).then((results: any) => {
            console.log('Finished create user Promises');
            deferred.resolve(results);
        });

        //now add random 2 connections to users
        let allRecords = await DataModel.find()
        console.log('allRecords', allRecords.length)
        let randomIndexes: number[] = [];
        let randomIndex = 0;
        promises = [];
        for (const r in allRecords) {
            randomIndexes = []
            //if more than 2 total users then max 2 connections, if 2 users then max 1 connection, if 1 user then no connections
            const numConnection:Number = allRecords.length > 2 ? 2 : allRecords.length === 1 ? 0 : 1;
            while (randomIndexes.length < numConnection) {
                randomIndex = Math.floor(Math.random() * allRecords.length)
                while (randomIndex === Number(r) || randomIndexes.indexOf(randomIndex) >= 0) {
                    randomIndex = Math.floor(Math.random() * allRecords.length)
                }
                randomIndexes.push(randomIndex)
            }
            let connection: User;
            for (const c in randomIndexes) {
                connection = allRecords[randomIndexes[c]]
                allRecords[r].connections.push({ "_id": connection._id, "fullname": connection.fullname, "color": connection.color })
            }
            const promise = await DataModel.findByIdAndUpdate(allRecords[r]._id, allRecords[r], { new: true })
            promises.push(promise);
        }
        Q.all(promises).then((connections: any) => {
            console.log('Finished connection Promises');
            deferred.resolve(connections);
            res.status(200).json(connections);
        });
    } else {
        res.status(200).json({"error":"invalid userCount should be between 1 and 1000000"});
    }
});

//Methods returns all users
const getData = asyncHandler(async (req: Request, res: Response) => {
    try {
        const projects = await DataModel.find()
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).send({ 'error': 'error trying to getData', 'err': err });
    }
});

//Method returns user data based on id
const getInfo = asyncHandler(async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    let dataResult = await DataModel.findById(req.params.id)
    if (!dataResult) {
        res.status(400);
        throw new Error(`Data not found for ${req.params.id}`);
    }
    //Update connections
    let connection: User;
    let connectionResult:User;
    for (const c in dataResult.connections) {
        connection = dataResult.connections[c]
        connectionResult = await DataModel.findById(connection._id)
        dataResult.connections[c].color = connectionResult.color
    }
    res.status(200).json(dataResult);
});

//Method to add a new user
const createData = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.fullname) {
        res.status(400);
        throw new Error("Name is required");
    }
    const newData = await DataModel.create(req.body)
    if (!newData) {
        res.status(400);
        throw new Error("Data not added");
    }
    res.status(201).json(newData);
});

//Method to update user based on id
const updateData = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.fullname) {
        res.status(400);
        throw new Error("Name is required");
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    const updateResult = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateResult) {
        res.status(400);
        throw new Error(`Data not found for ${req.params.id} to update`);
    }
    res.status(200).json(updateResult);
});

//Delete user based on id
const deleteData = asyncHandler(async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    const deleteResult = await DataModel.findByIdAndDelete(req.params.id)
    if (!deleteResult) {
        res.status(400);
        throw new Error(`Data not found for ${req.params.id} to delete`);
    }
    res.status(200).json({ message: `Data deleted for ${req.params.id}` });
});

module.exports = {
    getData,
    getInfo,
    createData,
    updateData,
    deleteData,
    setUsers
}