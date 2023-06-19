import React from 'react';
import { Prompt, User } from "../types";
import styles from './styles/collection.module.css';
import MongoDbController from "../api/MongoDbController";

interface CollectionDisplayProps {
  prompts?: Prompt[];
  users?: User[];
}

interface PromptInfo {
  prompt: string
  results: { value: string; }[];
}

interface CollectionDisplayState {
  editing: boolean;
  showCopyWindow: boolean;
  promptInfo: PromptInfo;
}

class CollectionDisplay extends React.Component<CollectionDisplayProps, CollectionDisplayState> {
  constructor(props: CollectionDisplayProps) {
    super(props);
    this.state = {
      editing: false,
      showCopyWindow: false,
      promptInfo: {
        prompt: "",
        results: [],
      },
    };
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing
    }));
  };


  closeCopyWindow() {
    this.setState({ showCopyWindow: false });
  }
  

  renderData() {
    const { prompts, users } = this.props;
    const data = prompts || users;

    if (!data || data.length === 0) {
      return (
        <div>No data available</div>
      );
    } else {
      return (
        <div className={styles.prompts_grid}>
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

  async savePrompt(prompt: Prompt) {
    const promptController = new MongoDbController({collection: "prompts"});
    await promptController.editData(prompt.name, prompt);
    console.log(prompt);
  }

  async deletePrompt(prompt: Prompt) {
    const promptController = new MongoDbController({collection: "prompts"});
    await promptController.dropDataByName(prompt.name);
  }

  async parsePrompt(prompt: string) {
    const regex = /{{(.*?)}}/g;
    let match;
    const results = [];

    while ((match = regex.exec(prompt)) !== null) {
      const extractedValue = match[1];
      results.push({ value: extractedValue });
    }

    this.setState({ showCopyWindow: true, promptInfo: {prompt, results} });
    return results;
  }

  async copyToClipboard(content: string) {
    await navigator.clipboard.writeText(content);

  };

  renderInfo(data: Prompt | User) {
    const {editing} = this.state;
    
    if (this.isUser(data)) {
      return (
        <div>
          User has no info
        </div>
      );
    }

    const description = (data as Prompt).description;
    const prompt = (data as Prompt).prompt;


    const descriptionInputRef = React.createRef<HTMLInputElement>(); 
    const promptInputRef = React.createRef<HTMLInputElement>(); 

    const handleSave = (data: Prompt) => {
      const newDescription = descriptionInputRef.current?.value;
      const newPrompt = promptInputRef.current?.value;
      data.description = newDescription as string;
      data.prompt = newPrompt as string;
      this.savePrompt(data);
      this.toggleEditing();
    };

    return (
      <div>
       <h6 className="description">{editing ? <input defaultValue={description} ref={descriptionInputRef} /> : description}</h6>
        <h5 className="prompt">{editing ? <input defaultValue={prompt} ref={promptInputRef} /> : prompt}</h5>
        {editing ? 
          <div>
            <h2 className="links" onClick={() => handleSave(data)}>
              [ Save ]
            </h2>
            <h2 className="links" onClick = {() => this.deletePrompt(data)}>
              [ Delete ]
            </h2>
          </div>
         : 
          <div>
            <h2 className="links" onClick={this.toggleEditing}>
              [ Edit ]
            </h2>
            <h2 className="links" onClick = {() => this.parsePrompt(prompt)}>
              [ Select ]
            </h2>
          </div>
        }
      </div>
    )

  }

  isUser(data: Prompt | User): data is User {
    return (data as Prompt).description === undefined;
  }

  renderCopyWindow(promptInfo: PromptInfo) {
    const handleClick = () => {
     const values = promptInfo.results.map((field) => {
        const inputElement = document.querySelector(`input[name="${field.value}"]`) as HTMLInputElement;
        return inputElement.value;
      });
      let newPrompt = promptInfo.prompt;
      promptInfo.results.forEach((field, i) => {
        newPrompt = newPrompt.replace(`{{${field.value}}}`, values[i]);
      });

      console.log(values);
      console.log(newPrompt);
      this.copyToClipboard(newPrompt);
      this.closeCopyWindow()
    };
    return (
      <div className="copy-window">
        <p>{promptInfo.prompt}</p>
        <div className="flex flex-col">
          {promptInfo.results.map((field) => (
          <div>
            <input 
              name={field.value}
              placeholder={field.value}
            />
          </div>
        ))}
        </div>
        <h2 className="links" onClick={() => 
         handleClick()
        }>[ Copy and Close ]</h2>
      </div>
    )
  }

  render() {
    const {showCopyWindow, promptInfo} = this.state;
    return (
      <div>
        {this.renderData()}
          {showCopyWindow && (
          this.renderCopyWindow(promptInfo)
         )}
      </div>
    );
  }
}

export default CollectionDisplay;

