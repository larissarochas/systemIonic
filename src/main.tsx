import React, { createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import useDb, { DBContext } from './components/db/useDb';
import { NotificationConfig, NotificationContext } from './components/Notification';

const container = document.getElementById('root');
const root = createRoot(container!);

interface AppContextProps {
  databaseContext: DBContext,
  notificationContext: NotificationContext
}

export const AppContext = createContext<AppContextProps | null>(null);

const Main = () => {
  const dbVariables = useDb();
  const [notification, setNotification] = useState<NotificationConfig | null>(null);
  
  return (
    <React.StrictMode>
      <AppContext.Provider 
       value={{
        databaseContext: dbVariables,
        notificationContext: {notification, setNotification}
       }}>
        <App />
      </AppContext.Provider>
    </React.StrictMode>
  )
}

root.render(<Main />);