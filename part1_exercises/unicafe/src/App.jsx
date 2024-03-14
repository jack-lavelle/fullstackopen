import { useState } from "react";

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
    if (text == "positive") {
        return <div>text {value}%</div>;
    }
    return (
        <div>
            {text} {value}
        </div>
    );
};

const StatisticRow = ({ text, value }) => {
    if (text == "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        );
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    if (all == 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback has been given yet</p>
            </div>
        );
    }
    const average = (good - bad) / all || 0;
    const percentPositive = (good / all) * 100;
    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticRow text="good" value={good} />
                    <StatisticRow text="bad" value={bad} />
                    <StatisticRow text="neutral" value={neutral} />
                    <StatisticRow text="all" value={all} />
                    <StatisticRow text="average" value={average} />
                    <StatisticRow text="positive" value={percentPositive} />
                </tbody>
            </table>
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
