const Header = ({ name }) => {
    return <h2>{name}</h2>;
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
};

const Total = ({ total }) => {
    return (
        <p>
            <b>There is a total of {total} exercises.</b>
        </p>
    );
};

const Course = ({ course }) => {
    const name = course.name;
    const parts = course.parts;
    const total = parts.reduce((currSum, part) => currSum + part.exercises, 0);

    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
    );
};

export default Course;
