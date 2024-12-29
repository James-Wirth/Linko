import React, { useState } from 'react';
import { validateWords } from '../api';
import WordInput from './WordInput';
import './GameBoard.css';

function GameBoard() {
    const [chain, setChain] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [similarityScore, setSimilarityScore] = useState(null);

    const addWord = async (newWord) => {
        const previousWord = chain[chain.length - 1] || null;

        if (previousWord) {
            const response = await validateWords(previousWord, newWord, 0.2);

            if (response.valid) {
                setChain([...chain, newWord]);
                setFeedback('Word added successfully!');
                setSimilarityScore(response.similarity);
            } else {
                setFeedback('Invalid connection. Try again!');
                setSimilarityScore(response.similarity);
            }
        } else {
            setChain([newWord]);
            setFeedback('First word added!');
            setSimilarityScore(null);
        }
    };

    return (
        <div className="game-board">
            <div className="word-chain">
                <strong>Word Chain:</strong>
                <span className="chain-display">
                    {chain.join(' → ') || 'Start your chain!'}
                </span>
            </div>
            <WordInput onAddWord={addWord} />
            <div className="feedback-section">
                <p className="feedback">{feedback}</p>
                {similarityScore !== null && (
                    <p className="similarity-score">
                        <strong>Similarity Score:</strong> {similarityScore.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default GameBoard;
