import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface Course {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts } : { courseParts: Array<CoursePart> } ) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  return (
    <div>
      {courseParts.map(part => {
        switch (part.type) {
          case "normal":
            return (
            <div key={part.name} >
              <b>{part.name} {part.exerciseCount}</b><p><i>{part.description}</i></p>
            </div>
            )
          case "groupProject":
            return (
            <div key={part.name} >
              <b>{part.name} {part.exerciseCount}</b><p>project exercises {part.groupProjectCount}</p>
            </div>
            )
          case "submission":
            return (
              <div key={part.name} >
                <b>{part.name} {part.exerciseCount}</b>
                <p><i>{part.description}</i></p>
                <p>submit to {part.exerciseSubmissionLink}</p>
              </div>
            )
          case "special":
            return (
              <div key={part.name} >
                <b>{part.name} {part.exerciseCount}</b>
                <p><i>{part.description}</i></p>
                <p>required skils: {part.requirements.join(', ')}</p>
              </div>
            )
          default:
            return assertNever(part);
        }
      })}
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: Array<Course> } ) => {
  const sum = courseParts.reduce((x, part) => x + part.exerciseCount, 0);
  return (
    <p>Number of exercises: {sum}</p>
  )
}

const Header = ({ courseName }: { courseName: string }) => <h1>{courseName}</h1>

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    },
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;