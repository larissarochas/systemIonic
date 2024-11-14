import { IonPage } from '@ionic/react';
import './Home.css';
import Header from '../components/layout/Header';
import ContentContainer from '../components/layout/ContentContainer';
import HomeButton from '../components/Home/HomeButton';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header text="Fasiclin" type="large-header" goBack={false} />
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
