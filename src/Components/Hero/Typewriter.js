import { useState, useEffect } from 'react';

export function useTypewriter(textArray, typingSpeed = 30, paragraphDelay = 1000) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (index >= textArray.length) return;

    const currentParagraph = textArray[index];

    if (charIndex < currentParagraph.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentParagraph[charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + '\n\n');
        setIndex(prev => prev + 1);
        setCharIndex(0);
      }, paragraphDelay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index, textArray, typingSpeed, paragraphDelay]);

  return displayedText;
}