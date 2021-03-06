const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const asyncMiddleware=require('../middleware/async-errors')
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const role=require('../middleware/role');

router.get('/', asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
}));

router.post('/',auth, asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
}));

router.put('/:id', asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
}));

router.delete('/:id',[auth,role], asyncMiddleware(async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(404).send('Invalid id');

  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));

module.exports = router;