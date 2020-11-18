import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { DailyImage } from '../types/dailyImage';
import { ErrorState } from '../types/errorState';


import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonCard, IonTitle, IonToolbar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonText, IonButton, IonGrid, IonCol, IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronBackSharp, chevronForwardOutline, chevronForwardSharp } from 'ionicons/icons';
import './DailyPicture.css'

const DailyPicture = () => {

  const [imageData, setImageData] = useState<DailyImage>();
  const [activeDate, setActiveDate] = useState(dayjs());
  const [errorState, setErrorState] = useState<ErrorState>();

    useEffect(() => {
        const config = {
            params: {
            api_key:"hQJp3ZpShmgewUSG17edbZkam7l2dd9UBUecxC4c",
            date: activeDate.format('YYYY-MM-DD')
        }
    }

    axios.get("https://api.nasa.gov/planetary/apod", config)
        .then(resp => {
        console.log(resp);
        setImageData(resp.data);
        })
        .catch(err => {
            console.error(err);
            setErrorState({code: "ERROR", message: err})
        })
  }, [activeDate])

  const handleDateChange = (mode: "decrement" | "increment") => {
      switch (mode) {
        case "decrement":
            setActiveDate(activeDate.subtract(1, 'day'))
            break;
        case "increment":
            setActiveDate(activeDate.add(1, 'day'))
        default:
            break;
      }
  }


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

        {!errorState && imageData && 
            <IonCard>
                <img src={imageData.hdurl} className="card-img"></img>
                <IonCardHeader>
                    <IonCardSubtitle>Date: {imageData.date}</IonCardSubtitle>
                    <IonCardTitle>{imageData.title}</IonCardTitle>
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
        {errorState && 
            <IonCard>
                <IonText>
                    <h3>Well... this is awkward.</h3>
                    <p>Either you tried an invalid date, or our gremlins can't find the book they needed.</p>
                    <p>Maybe try again later?</p>
                </IonText>
            </IonCard>
            
        }

        <div className="btns-cont">
            <IonButton color="light" onClick={() => handleDateChange("decrement")}>
                <IonIcon ios={chevronBackOutline} md={chevronBackSharp} />
            </IonButton>
            <IonButton color="light" onClick={() => handleDateChange("increment")}>
                <IonIcon ios={chevronForwardOutline} md={chevronForwardSharp} />
            </IonButton>
        </div>
 

      </IonContent>
    </IonPage>
  );
};

export default DailyPicture;
