import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { DailyImage } from '../types/dailyImage';
import './Page.css';

const Page = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* <ExploreContainer name={name} /> */}
      </IonContent>
    </IonPage>
  );
};

export default Page;
