import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonCard, IonTitle, IonToolbar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonText, IonButton, IonGrid, IonCol, IonIcon } from '@ionic/react';
import axios from 'axios';
import { chevronBackOutline, chevronBackSharp, chevronForward, chevronForwardOutline, chevronForwardSharp } from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import { DailyImage } from '../types/dailyImage';
import './DailyPicture.css'

const DailyPicture = () => {

  const [imageData, setImageData] = useState<DailyImage>();


    useEffect(() => {
        const config = {
            params: {
            api_key:"hQJp3ZpShmgewUSG17edbZkam7l2dd9UBUecxC4c",
            date: "2020-11-17"
        }
    }

    axios.get("https://api.nasa.gov/planetary/apod", config).then(resp => {
      console.log(resp);
      setImageData(resp.data);
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Daily Picture</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Daily Picture</IonTitle>
          </IonToolbar>
        </IonHeader>

        {imageData && 
            <IonCard>
                <img src={imageData.hdurl} className="card-img"></img>
                <IonCardHeader>
                    <IonCardSubtitle>Date: {imageData.date}</IonCardSubtitle>
                    <IonCardTitle>Date: {imageData.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonText>
                        <p>
                            {imageData.explanation}
                        </p>
                    </IonText>
                </IonCardContent>
            </IonCard>
        }

        <div className="btns-cont">
            <IonButton color="light">
                <IonIcon ios={chevronBackOutline} md={chevronBackSharp} />
            </IonButton>
            <IonButton color="light">
                <IonIcon ios={chevronForwardOutline} md={chevronForwardSharp} />
            </IonButton>
        </div>
 

      </IonContent>
    </IonPage>
  );
};

export default DailyPicture;
