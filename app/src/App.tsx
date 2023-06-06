import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout"
import Home from "./pages/Home";
import CreatePromptPage from "./pages/CreatePromptPage";
import YourPromptsPage from "./pages/YourPromptsPage";
import UserListPage from "./pages/UserListPage";
import NewUserPage from "./pages/NewUserPage";
import Session from './api/Session';
import LoginPage from "./pages/LoginPage";

console.log();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="create-prompt" element={<CreatePromptPage />} />
          <Route path="your-prompts" element={<YourPromptsPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="new-user" element={<NewUserPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Session />
    <App />
  </React.StrictMode>, 
  document.getElementById("root")
);
