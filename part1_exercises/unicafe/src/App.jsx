import { useState } from "react";

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all || 0;
    const percentPositive = (good / all) * 100;
    return (
        <div>
            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {all}</div>
            <div>average {average}</div>
            <div>positive {percentPositive}%</div>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const incrementMap = {
        good: function () {
            setGood(increment(good));
        },
        neutral: function () {
            setNeutral(increment(neutral));
        },
        bad: function () {
            setBad(increment(bad));
        },
    };

    const increment = (variable) => {
        return function () {
            let value = variable + 1;
            return value;
        };
    };

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={incrementMap["good"]} text="good" />
            <Button handleClick={incrementMap["neutral"]} text="neutral" />
            <Button handleClick={incrementMap["bad"]} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
