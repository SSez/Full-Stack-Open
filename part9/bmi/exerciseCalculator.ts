interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface arrValues {
  arr: Array<number>;
  value: number;
}

const parseArgs = (args: Array<string>): arrValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const newArgs : Array<string> = args.slice(3);
  const val = Number(args[2]);
  if (newArgs.every(v => (!isNaN(Number(v)))) && !isNaN(Number(val))) {
    return {
      arr : newArgs.map(v => Number(v)),
      value : val
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (arr: Array<number>, target: number): Result => {
  const average = arr.reduce((a, b) => a + b, 0) / arr.length;
  const ratings = {
    0: 'you did nothing, your lazy shit',
    1: 'you can do more',
    2: 'not too bad but could be better',
    3: 'good job'
  };
  const rating = average == 0 ? 0 : average < (target * 0.75) ? 1 : average < target ? 2 : 3;
  return {
    periodLength: arr.length,
    trainingDays: arr.filter(b => b > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratings[rating],
    target,
    average
  };
};

try {
  const { arr, value } = parseArgs(process.argv);
  const res = calculateExercises(arr, value);
  console.log(res);
} catch (e) {
  console.log('Error, something bad happened, message: ', e);
}