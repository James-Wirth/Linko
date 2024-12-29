from gensim.models import KeyedVectors

model = KeyedVectors.load_word2vec_format('models/GoogleNews-vectors-negative300.bin', binary=True)

def get_similarity(word1, word2):
    return model.similarity(word1, word2)

def is_valid_association(word1, word2, threshold=0.2):
    try:
        similarity = model.similarity(word1, word2)
        print(f"Similarity between {word1} and {word2}: {similarity}")
        return bool(similarity > threshold)
    except KeyError as e:
        print(f"KeyError: {e}")
        return False
