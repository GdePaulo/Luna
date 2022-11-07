import re

class Extractor:
    def __init__(self):
        pass

    def extractAssociations(self, source, target):
        sentence_pairs = zip(source, target)
        associations = {}
        for source_sentence, target_sentence in list(sentence_pairs)[:]:
            
            characters_to_ignore = "[!?,]"
            source_sentence = re.sub(characters_to_ignore, '', source_sentence)
            target_sentence = re.sub(characters_to_ignore, '', target_sentence)

            source_sentence_words = source_sentence.split()
            target_sentence_words = target_sentence.split()

            for i, current_source_word in enumerate(source_sentence_words):
                current_associations = associations.get(current_source_word, {})

                if i > len(target_sentence_words) - 1:
                    continue
                elif i == len(source_sentence_words) - 1:
                    matching_target_word = " ".join(target_sentence_words[i:])
                else:
                    matching_target_word = target_sentence_words[i]
                
                if matching_target_word in current_associations:
                    current_associations[matching_target_word] += 1
                else:
                    current_associations[matching_target_word] = 1
                
                current_associations =  {k: v for k, v in sorted(current_associations.items(), key=lambda item: item[1], reverse=True)}
                associations[current_source_word] = current_associations
        return associations    

    def filterAssociationsByFrequency(self, associations):
        important_associations = {}

        for k, v in associations.items():
            frequencies = [frequency for word, frequency in v.items()]
            average_frequency = sum(frequencies) / len(frequencies)
            important_associations[k] = {word:frequency for word, frequency in v.items() if frequency >= average_frequency}        
        return important_associations
    
    def getWordTranslationsFromSentences(self, source_sentences, target_sentences): 
        associations = self.extractAssociations(source_sentences, target_sentences)
        important_associations = self.filterAssociationsByFrequency(associations)

        return important_associations