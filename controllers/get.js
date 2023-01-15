const express = require('express');
const mongoose = require('mongoose');
const { exerciseUsers, exercises } = require('../schemas');
const {parseDate} = require('../dateParser');

async function log(req, res)
{
    try{

        const _id = req.params['_id'];
        const user = await exerciseUsers.findOne({_id: _id});

        let allUserExercises;
        
        allUserExercises = await exercises.find({id: _id}, {_id: 0, id: 0, __v: 0});
        
        //Filtering with 'from' and 'to' queries
            let start, end;

            start = req.query.hasOwnProperty('from') ? Date.parse(parseDate(req.query.from)) : NaN;
            end = req.query.hasOwnProperty('to') ? Date.parse(parseDate(req.query.to)) : NaN;

            if(!isNaN(start) || !isNaN(end)) allUserExercises = allUserExercises.filter((data) => 
            {
                let registeredDate = Date.parse(data.date);

                if(!isNaN(start) && !isNaN(end)) return registeredDate >= start && registeredDate <= end;
                else if(!isNaN(start)) return registeredDate >= start;
                else if(!isNaN(end)) return registeredDate <= end;
            })

        //Limiting results
            if(req.query.hasOwnProperty('limit'))
            {
                let counter = 0;
                allUserExercises = allUserExercises.filter((data) => 
                {
                    counter++;
                    return counter <= req.query.limit
                })
            }
        
        const count = allUserExercises.length;

        res.json(
            {
                username: user.username,
                count: count,
                _id: _id,
                log: allUserExercises
            });
    }catch(error)
    {
        console.log(`There was an error loading logs: ${error}`);
        res.status(404).json({msg: 'error'});
    }
}

async function getAllUsers(req, res)
{
    try{
        res.json(await exerciseUsers.find({}, {__v: 0}));
    }
    catch(error)
    {
        console.log(`There was an error getting all users: ${error}`);
        res.status(400).json({msg: `There was an error getting all users`})
    }
}

module.exports = {log, getAllUsers};