import { useState } from "react";

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ votes, text }) => {
    return (
        <div>
            <p>This anecdote has {votes} votes.</p>
            <p>{text}</p>
        </div>
    );
};

const AnecdoteOfTheDay = ({ votes, text }) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote votes={votes} text={text} />
        </div>
    );
};

const MostVotedAnecdote = ({ votes, text }) => {
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <Anecdote votes={votes} text={text} />
        </div>
    );
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
    const [mostVotesIndex, setMostVotesIndex] = useState(0);

    const handleVotes = () => {
        const newVotes = { ...votes };
        newVotes[selected] += 1;
        setVotes(newVotes);

        if (newVotes[selected] > newVotes[mostVotesIndex]) {
            setMostVotesIndex(selected);
        }
    };

    const getVotes = (index) => {
        if (typeof index == "undefined") {
            return votes[selected] || 0;
        }

        return votes[index] || 0;
    };

    const getRandomAnecdoteIndex = () => {
        function getRandomNumber() {
            return Math.floor(Math.random() * anecdotes.length);
        }

        let randomIndex = getRandomNumber();
        while (randomIndex == selected) {
            randomIndex = getRandomNumber();
        }
        return randomIndex;
    };

    const handleAnecdoteIndex = () => {
        let newIndex = getRandomAnecdoteIndex();
        setSelected(newIndex);
    };

    return (
        <div>
            <AnecdoteOfTheDay votes={getVotes()} text={anecdotes[selected]} />
            <Button onClick={handleAnecdoteIndex} text="next anecdote" />
            <Button onClick={handleVotes} text="vote for this anecdote" />
            <MostVotedAnecdote
                votes={votes[mostVotesIndex]}
                text={anecdotes[mostVotesIndex]}
            />
        </div>
    );
};

export default App;
