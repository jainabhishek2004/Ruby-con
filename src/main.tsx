
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { RubyConProvider } from './components/RubyConContext';
  import { BrowserRouter } from 'react-router-dom';

  createRoot(document.getElementById("root")!).render(

    <BrowserRouter>
  
  <RubyConProvider>
    <App />
  </RubyConProvider>
    </BrowserRouter>
  );
  