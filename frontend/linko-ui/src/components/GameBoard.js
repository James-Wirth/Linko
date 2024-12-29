import React, { useState } from 'react';
import { validateWords } from '../api';
import WordInput from './WordInput';

function GameBoard() {
    const [chain, setChain] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [similarityScore, setSimilarityScore] = useState(null);

    const addWord = async (newWord) => {
        const previousWord = chain[chain.length - 1] || null;

        if (previousWord) {
            const response = await validateWords(previousWord, newWord, 0.2);
            console.log('[DEBUG] Frontend Response:', response);

            if (response.valid) {
                setChain([...chain, newWord]);
                setFeedback('Word added successfully!');
                setSimilarityScore(response.similarity);
                console.log('[DEBUG] Similarity Score Set (Valid):', response.similarity);
            } else {
                setFeedback('Invalid connection. Try again!');
                setSimilarityScore(response.similarity);
                console.log('[DEBUG] Similarity Score Set (Invalid):', response.similarity);
            }
        } else {
            setChain([newWord]);
            setFeedback('First word added!');
            setSimilarityScore(null);
        }

        console.log('[DEBUG] Current Chain:', chain);
        console.log('[DEBUG] Current Feedback:', feedback);
        console.log('[DEBUG] Current Similarity Score:', similarityScore);
    };

    return (
        <div>
            <div>
                <strong>Word Chain:</strong> {chain.join(' → ')}
            </div>
            <WordInput onAddWord={addWord} />
            <div>
                <p>{feedback}</p>
                {/* Display the similarity score */}
                {similarityScore !== null && (
                    <p>
                        <strong>Similarity Score:</strong> {similarityScore.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default GameBoard;
