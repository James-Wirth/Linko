import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', // Flask backend URL
});

export const validateWords = async (word1, word2, threshold = 0.2) => {
    try {
        const response = await api.post('/validate', { word1, word2, threshold });
        console.log('[DEBUG] API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('[DEBUG] Error validating words:', error);
        return { valid: false, similarity: null };
    }
};

export const saveChain = async (chain) => {
    try {
        const response = await api.post('/save-chain', { chain });
        return response.data.message;
    } catch (error) {
        console.error('Error saving chain:', error);
        return 'Error saving chain';
    }
};
