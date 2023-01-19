const express = require('express');
const mongoose = require('mongoose');
const { exerciseUsers, exercises } = require('../schemas');
const {parseDate} = require('../dateParser');

async function createUser(req, res)
{
    try{
        const {username} = req.body;

        //Save User
        const newUser = new exerciseUsers({username: username});
        await newUser.save();
        res.json({username: newUser.username, _id: newUser._id});
    }
    catch(error)
    {
        console.log(`An error occurred while saving new user: ${error}`);
        res.status(400).json({username: 'error', id: 'error', message: `There was a problem saving the user.` });
    }
}

async function addExercises(req, res)
{
    try{
        const {description, duration, date} = req.body;

        let numberDuration = Number(duration);
        let dateObj = parseDate(date);

        const _id = req.params['_id'];
        
        //Check if user exists
        if(await exerciseUsers.count({_id: _id}) == 1)
        {
            const user = await exerciseUsers.findOne({_id: _id});
            const username = user.username;
            let exercise = 
            {
                //63bf39bbc0afcca14fbd2b56 (for testing)
                id: _id,
                username: username,
                description: description,
                duration: numberDuration,
                date: dateObj.toDateString()
            };
            let newExercise = new exercises(exercise);
            await newExercise.save();

            //Response
            let response = {_id: _id, username: username, description: description, duration: numberDuration, date: dateObj.toDateString()}
            res.json(response);
        }
        else res.status(404).json(
            {
            username: 'error', 
            id: 'error', 
            message: `There is no user with such id.`
            });
    }
    catch(error)
    {
        console.log(`An error occurred while saving new exercise: ${error}`);
        res.status(400).json({username: 'error', id: 'error', message: `There was a problem saving the exercise.` });
    }
}

module.exports = {createUser, addExercises};