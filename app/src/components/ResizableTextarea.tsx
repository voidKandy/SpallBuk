import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/text.module.css";

interface ResizableTextareaProps {
  title?: string;
  onChange?: (value: string) => void; // Callback function to receive the updated value
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  title,
  onChange
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>("");

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedValue = event.target.value;
    setValue(updatedValue);

    // Invoke the onChange callback with the updated value
    if (onChange) {
      onChange(updatedValue);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className={styles.resize_container}>
      <h3>{title}</h3>
      <textarea
        ref={textareaRef}
        className={styles.resize_textarea}
        onChange={textAreaChange}
        value={value} // Set the value of the textarea
      />
    </div>
  );
};

export default ResizableTextarea;
