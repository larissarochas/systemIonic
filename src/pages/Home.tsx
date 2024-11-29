import { IonPage } from '@ionic/react';
import './Home.css';
import Header from '../components/layout/Header';
import ContentContainer from '../components/layout/ContentContainer';
import HomeButton from '../components/Home/HomeButton';
import Notification from '../components/Notification';
import { useContext, useEffect } from 'react';
import { AppContext } from '../main';
import { SQLiteValues } from 'jeep-sqlite';

const Home: React.FC = () => {
  const notification = useContext(AppContext)?.notificationContext;
  const database = useContext(AppContext)?.databaseContext;

  const fetchPendentes = async () => {
    const res = await database?.SQLQuery(`
      SELECT id FROM consultas
      WHERE status = 3  
    `);

    if (res) {
      notification?.setNotification({
        duration: 3,
        msg: `${res.values?.length} Consultas Pendentes`,
        status: "warning"
      })
    }
  }

  useEffect(() => {
    if (database?.initialized) {
      fetchPendentes();
    }
  }, [database?.initialized])

  return (
    <IonPage>
      <Header text="Fasiclin" type="large-header" goBack={false} />
      <Notification />
      <ContentContainer type="container_middle">
        <div id="button-list">
          <HomeButton text="Atendimentos" link="/pendentes" />
          <HomeButton text="Relatórios" link="/relatorios" />
        </div>
      </ContentContainer>
    </IonPage>
  );
};

export default Home;
