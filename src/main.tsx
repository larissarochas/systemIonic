import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import useDb from './components/db/useDb';

const container = document.getElementById('root');
const root = createRoot(container!);

const Main = () => {
  const variaveis = useDb();
  
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

root.render(<Main />);