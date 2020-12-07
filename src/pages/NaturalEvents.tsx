import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GoogleMapReact from "google-map-react";
import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { db} from '../firestore/initialize';


interface dataItem {
    title: string;
    id: string;
    latLng: number[];
    geometry: any;
}




const NaturalEvents = () => {
    const [data, setData] = useState<any>()
    const [googleSecret, setGoogleSecret] = useState<string>()
    const rootUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3";

    // First, show the list of events
    useEffect(() => {
        const config = {
            params: {
                status: "open",
                limit: 10
            }
        }
        axios.get(`${rootUrl}/events`, config)
            .then(resp => {
                setData(resp.data.events);
            }).catch(err => err);
    },[])

    useEffect(() => {
        async function fetchKey(){
            const key = await db.collection("keys").doc("googleMaps")
            .get()
            .then(doc => {
                if(doc?.data()?.SECRET){
                    console.info(doc.data())
                    return doc.data()?.SECRET as string
                }
            })
            setGoogleSecret(key);
        }
        fetchKey();
    },[])

    const makeList = (datas: dataItem[]) => datas.map((data: dataItem, index) => {
        const [lng, lat]= data.geometry[0]?.coordinates;
    
        const renderMarkers = (map: any, maps: any, geometry: any) => {

            for(let i=0; i < geometry.length; i++){
            const [lng, lat]= data.geometry[i]?.coordinates;
                new maps.Marker({
                    position: {lat, lng},
                    map,
                    title: data.title
                })
            }

        }
        return (
        <IonCard key={data.id}>
            <IonCardHeader>
                <IonCardTitle>
                    {data.title}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               {googleSecret && <GoogleMapReact
                    bootstrapURLKeys={{ key: googleSecret}}
                    defaultCenter={{lat, lng}}
                    defaultZoom={5}
                    style={{height: "30vh"}}
                    options={{mapTypeId: 'satellite'}}
                    onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps, data.geometry)}
                >
                </GoogleMapReact>}
            </IonCardContent>
        </IonCard>
    )});

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Natural Events</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Natural Events</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonList>
                {data && makeList(data)}
            </IonList>
        </IonContent>
        </IonPage>
  );
};

export default NaturalEvents;