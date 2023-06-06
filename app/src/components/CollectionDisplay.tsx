import React from 'react';
import { Prompt, User } from "../types";
import styles from './styles/collection.module.css';

interface CollectionDisplayProps {
  prompts?: Prompt[];
  users?: User[];
}

interface CollectionDisplayState {
  editing: boolean;
  saving: boolean;
}

class CollectionDisplay extends React.Component<CollectionDisplayProps, CollectionDisplayState> {
  constructor(props: CollectionDisplayProps) {
    super(props);
    this.state = {
      editing: false,
      saving: false
    };
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing
    }));
  };

  toggleSaving = () => {
    this.setState((prevState) => ({
      saving: !prevState.saving
    }));

  };
  

  renderData() {
    const { prompts, users } = this.props;
    const data = prompts || users;

    if (!data || data.length === 0) {
      return (
        <div>No data available</div>
      );
    } else {
      return (
        <div>
          {data.map((item) => {
            return (
              <div className={styles.container}>
                <div key={item.name}>
                  {this.renderName(item)}
                  {this.renderInfo(item)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  renderName(data: Prompt | User) {
    const name = data.name;

    return (
      <div>
        <h2 className="name">{name}</h2>
      </div>
    );
  }

  renderInfo(data: Prompt | User) {
    const {editing, saving} = this.state;

    if (this.isUser(data)) {
      return (
        <div>
        </div>
      );
    }

    const description = data.description;
    const prompt = data.prompt;

    return (
      <div>
       <h6 className="description">{editing ? <input defaultValue={description} /> : description}</h6>
        <h5 className="prompt">{editing ? <input defaultValue={prompt} /> : prompt}</h5>
        <button className="edit-button" onClick={editing? this.toggleSaving:this.toggleEditing}>
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>
    )

  }

  isUser(data: Prompt | User): data is User {
    return (data as User).uuid !== undefined;
  }

  render() {
    return (
      <div>
        {this.renderData()}
      </div>
    );
  }
}

export default CollectionDisplay;

