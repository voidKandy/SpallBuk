import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Prompt, User } from "../../types";


interface CollectionDisplayProps {
    prompts?: Prompt[],
    users?: User[],
}


class CollectionDisplay extends React.Component<CollectionDisplayProps> { 

  renderPrompt() {
    const { prompts, users } = this.props;
    const data = prompts || users;

    if (!data || data.length === 0) {
      return (
        <div>No data available</div>
      )
    }

    return (
      <div>
       {data.map((item) => (
          <div key={item.name}>
            {Object.entries(item).map(([key, value]) => {
            if (!key.includes('uuid')) {
              return (
                <div key={key}>
                  <h1>{key}</h1>
                  <p>{value}</p>
                </div>
              );
            }
            return null;
          })}
          </div>
        ))}
      </div>
    );
  };

  render() {

    return (
    <div>
     {this.renderPrompt()}
    </div>
    );
  }
}

export default CollectionDisplay;


