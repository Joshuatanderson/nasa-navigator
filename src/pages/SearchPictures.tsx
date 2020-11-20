import React, { FormEvent, useState } from 'react';
import axios from "axios";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonInput, IonText, IonItem, IonLabel, IonButton} from "@ionic/react";


const SearchPictures = () => {

    const [search, setSearch] = useState<null | undefined | string>("");
    const [searchResults, setSearchResults] = useState();

    const AXIOS_CONFIG = {
      params: {
        q: search,
      }
    }



    const handleSubmit = async (e: FormEvent ) => {
      e.preventDefault();

      if(search) {
        const results = await axios.get("https://images-api.nasa.gov/search", AXIOS_CONFIG);
        console.log(results);
      }
      
    }

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Nasa Images</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Nasa Images</IonTitle>
            </IonToolbar>
          </IonHeader>  
          <form onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="stacked">Search</IonLabel>
                <IonInput type="text" name="search" value={search} onIonChange={e => setSearch(e?.detail?.value)}></IonInput>
            </IonItem>
            <IonButton type="submit">
              search
            </IonButton>
          </form>


           
        </IonContent>
      </IonPage>
    )
}

export default SearchPictures
