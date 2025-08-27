import { useState, useEffect } from "react";

const TypingMessage = ({ message, speed, onDone }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(""); // reset on new message

    const words = message.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i >= words.length) {
        clearInterval(interval);
        if (onDone) onDone();
        return;
      }

      // increment i before using it to avoid skipping the second word
      setDisplayed((prev) => {
        const next = prev.length === 0 ? words[i] : prev + " " + words[i];
        i++;
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed, onDone]);

  return <span>{displayed}</span>;
};

export default TypingMessage;
