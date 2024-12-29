# Linko

Linko is a word association game built with the `Word2Vec` model. Each word is represented by a 300-dimensional vector, with each component representing a learned feature. The "similarity" between two words is defined as the normalized dot product $\mathrm{sim}(\mathbf{v}, \mathbf{w}) := \hat{\mathbf{v}} \cdot \hat{\mathbf{w}}$.

![image](https://github.com/user-attachments/assets/b2491f3a-b0b6-4c7b-9dc0-38b2f565b811)

## Setup

### Clone the repository

```bash
git clone https://github.com/James-Wirth/Linko
cd Linko
```

### Run the setup script

```
bash start_servers.sh
```

1. Install backend dependencies using `pip` and setup a virtual environment.
2. Install frontend dependencies using `npm install`
3. Start the backend (Flask) server on port `5000`
4. Start the frontend (React) server on port `3000`

## How to play

1. Open the game in your browser at http://localhost:3000
2. Enter a starting word to begin the chain. Add new words to the chain -- words must meet the similarity threshold to be valid.


