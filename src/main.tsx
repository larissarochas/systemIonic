import React, { createContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import useDb, { DBContext } from './components/db/useDb';
import { NotificationConfig, NotificationContext } from './components/Notification';

import { App as application } from "@capacitor/app"

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

  useEffect(() => {
    const listener = application.addListener("backButton", (e) => {
      const loc = window.location.pathname;
      if (loc === "/" || loc === "/home") {
        application.exitApp();
      }
    })

    return () => {
      listener.then((ev) => ev.remove());
    }
  }, [])
  
  return (
    <React.StrictMode>
      <AppContext.Provider 
       value={{
        databaseContext: dbVariables,
        notificationContext: {notification, setNotification}
       }}
      >
        <App />
      </AppContext.Provider>
    </React.StrictMode>
  )
}

root.render(<Main />);