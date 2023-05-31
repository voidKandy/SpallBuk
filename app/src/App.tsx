import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout"
import Home from "./pages/Home";
import CreatePromptPage from "./pages/CreatePromptPage";
import YourPromptsPage from "./pages/YourPromptsPage";
import UserListPage from "./pages/UserListPage";
import NewUserPage from "./pages/NewUserPage";
import Session from './api/Session';

console.log();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="create" element={<CreatePromptPage />} />
          <Route path="your-prompts" element={<YourPromptsPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="new-user" element={<NewUserPage />} />
        </Route>
      </Routes>
      <Session />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
