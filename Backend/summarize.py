import spacy
from spacy import displacy
import pytextrank


spacy.prefer_gpu()
nlp = spacy.load("en_core_web_sm")

tr = pytextrank.TextRank()
nlp.add_pipe(tr.PipelineComponent, name='textrank', last=True)


def summary(text):

        doc = nlp(text)
        tldr = []

        for sent in doc._.textrank.summary(limit_phrases=15, limit_sentences=5):
                tldr.append(repr(sent))
                
        return tldr


#Reference https://www.britannica.com/science/Lenzs-law
'''
text = """Lenz's law
        PHYSICS
        WRITTEN BY: The Editors of Encyclopaedia Britannica
        See Article History
        Lenz’s law, in electromagnetism, statement that an induced electric current 
        flows in a direction such that the current opposes the change that induced it. 
        This law was deduced in 1834 by the Russian physicist Heinrich Friedrich Emil Lenz (1804–65).

        Demonstration of Lenz's law.
        Demonstration of Lenz's law.
        Courtesy of the Department of Physics and Astronomy, Michigan State University
        Thrusting a pole of a permanent bar magnet through a coil of wire, for example, 
        induces an electric current in the coil; the current in turn sets up a magnetic 
        field around the coil, making it a magnet. Lenz’s law indicates the direction of the induced current. 
        Because like magnetic poles repel each other, Lenz’s law states that when the north pole of the bar 
        magnet is approaching the coil, the induced current flows in such a way as to make the side of the 
        coil nearest the pole of the bar magnet itself a north pole to oppose the approaching bar magnet. 
        Upon withdrawing the bar magnet from the coil, the induced current reverses itself, and the near 
        side of the coil becomes a south pole to produce an attracting force on the receding bar magnet.

        A small amount of work, therefore, is done in pushing the magnet into the coil and in pulling it out 
        against the magnetic effect of the induced current. The small amount of energy represented by this 
        work manifests itself as a slight heating effect, the result of the induced current encountering 
        resistance in the material of the coil. Lenz’s law upholds the general principle of the conservation of energy. 
        If the current were induced in the opposite direction, its action would spontaneously draw the bar magnet into 
        the coil in addition to the heating effect, which would violate conservation of energy."""
#Corpus/Gold Standard
'''
        
        
