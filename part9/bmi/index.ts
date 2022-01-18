import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight: Number(weight), height: Number(height), bmi: bmi });
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target ) {
    return res.json({ error: "parameters missing" });
  }
  const target = Number(req.body.target);
  const daily_exercises: Array<any> = req.body.daily_exercises;
  if (isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});