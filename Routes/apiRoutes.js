const router = require("express").Router();
const { Workout } = require("../models");
const db = require("../models")

router.get("/api/workouts", (req,res) => {
  db.Workout.aggregate([{
    $addFields: {
      totalDuration: {$sum: "$exercises.duration"}
    }
  }])
  .then(dbExercise => {
    res.json(dbExercise);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

router.post("/api/workouts", (req,res) => {
  db.Workout.create(req.body)
  .then (dbExercise => {
    res.json(dbExercise);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.put("/api/workouts/:id", (req,res) => {
  Workout.findOneAndUpdate({
    _id: req.params.id
  },
    {$push: {exercises: req.body}}
  )
  .then (dbExercise => {
    res.json(dbExercise);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})





module.exports = router;