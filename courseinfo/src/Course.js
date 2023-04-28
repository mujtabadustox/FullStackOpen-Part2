import React from "react";

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <div>
      <p>
        {part} {exercise}
      </p>
    </div>
  );
};

const Total = ({ courses }) => {
  return (
    <div>
      <strong>
        {"total of "}{" "}
        {courses.reduce((sum, course) => (sum += course.exercises), 0)}
        {" exercises"}{" "}
      </strong>
    </div>
  );
};

const Content = ({ name, contents }) => {
  return (
    <div>
      <Header header={name} />
      {contents.map((content) => (
        <Part
          key={content.id}
          part={content.name}
          exercise={content.exercises}
        />
      ))}
      <Total courses={contents} />
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      <Header header={"Web development curriculum"} />
      {courses.map((course) => (
        <Content key={course.id} name={course.name} contents={course.parts} />
      ))}
    </div>
  );
};

export default Course;
