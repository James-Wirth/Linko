import React, { useState } from 'react';
import './WordInput.css';

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
        <form className="word-input-form" onSubmit={handleSubmit}>
            <input
                className="word-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a word"
            />
            <button className="add-word-button" type="submit">Add Word</button>
        </form>
    );
}

export default WordInput;
