import React, { useState } from 'react';

function WordInput({ onAddWord }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onAddWord(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a word"
            />
            <button type="submit">Add Word</button>
        </form>
    );
}

export default WordInput;
