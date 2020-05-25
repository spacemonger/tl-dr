import spacy
from spacy import displacy
import pytextrank


spacy.prefer_gpu()
nlp = spacy.load("en_core_web_lg")

tr = pytextrank.TextRank()
nlp.add_pipe(tr.PipelineComponent, name='textrank', last=True)


def summary(text):

        doc = nlp(text)
        tldr = []

        for sent in doc._.textrank.summary(limit_phrases=15, limit_sentences=5):
                tldr.append(repr(sent))
                
        return tldr

def length(text, summarized_texts):

        reduction = {}
        stringed_summary= ""

        before = len(text.split())
        for summarized_text in summarized_texts:
                stringed_summary += (summarized_text + " ")
        after = len(stringed_summary.split())
        percentage = round(100*(1 - (after/before)))
        

        reduction["before"] = repr(before)
        reduction["after"] = repr(after)
        reduction["percentage"] = (repr(percentage) + "%")

        return reduction

