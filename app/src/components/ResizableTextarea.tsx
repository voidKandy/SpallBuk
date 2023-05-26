import React, { useState, useEffect, useRef } from "react";
import "../globals.css";

interface ResizableTextareaProps {
  title?: string;
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = (
  {
    title
  }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="container">
      <h3>{title}</h3>
      <textarea
        ref={textareaRef}
        className="textareaDefaultStyle"
        onChange={textAreaChange}
      >
        {value}
      </textarea>
    </div>
  );
};

export default ResizableTextarea;
