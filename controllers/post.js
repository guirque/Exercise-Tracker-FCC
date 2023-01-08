const express = require('express');

function createUser(req, res)
{
    //Insert new user if one with that name doesn't already exist
}

function addExercises(req, res)
{
    //Check if user exists
    //username and id

    //Insert data contained within body
    const {username, description, duration, date, _id} = req.body;

}

module.exports = {createUser, addExercises};