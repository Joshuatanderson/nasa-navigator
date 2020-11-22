import React, { FormEvent, useState } from 'react';
import axios from "axios";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonInput, IonText, IonItem, IonLabel, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonCard, IonGrid} from "@ionic/react";
import dayjs from "dayjs";

import TruncatedText from "../components/TruncatedText";

interface SearchResults {
    version: string;
    metadata: {
      total_hits: number;
    };
    href: string;
    items: DataItem[];
    links: Record<string, string>[];
}

interface DataItem {
  href: string;
  links: Record<string, string>[];
  data: Record<string, string | string[]>[];
}


const SearchPictures = () => {

    const [search, setSearch] = useState<null | undefined | string>("");
    const [searchResults, setSearchResults] = useState<SearchResults>();

    const AXIOS_CONFIG = {
      params: {
        q: search,
      }
    }



    const handleSubmit = async (e: FormEvent ) => {
      e.preventDefault();

      if(search) {
        const results = await axios.get("https://images-api.nasa.gov/search", AXIOS_CONFIG)
          .catch(err => console.error(err));
        if(results){
          setSearchResults(results.data.collection as SearchResults)
          setSearch("")
        }
      }
    }

    const cards = (data: SearchResults) => {
      const content = data.items;

      return content.map(item => {
        const imageLink = item.links && item.links[0].href;
        const dateCreated = item.data && dayjs(item.data[0].date_created as string);

        return (
          <IonCard>
            {imageLink && <img src={imageLink} alt="nasa pic" className="card-img"></img>} 
            {item.data && <IonCardHeader>
              <IonCardSubtitle>{dateCreated.format("MM-DD-YYYY")}</IonCardSubtitle>
              <IonCardTitle>{item.data[0].title}</IonCardTitle>
            </IonCardHeader>}
            <IonCardContent>
              {item.data && <TruncatedText text={item.data[0].description as string}/>}
            </IonCardContent>
          </IonCard>
      )})
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

          {searchResults && cards(searchResults)}
           
        </IonContent>
      </IonPage>
    )
}

export default SearchPictures
