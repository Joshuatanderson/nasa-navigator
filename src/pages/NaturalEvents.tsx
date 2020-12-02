import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GoogleMapReact from "google-map-react";
import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { API_KEY } from '../config';


interface dataItem {
    title: string;
    id: string;
    latLng: number[];
    geometry: any;
}

const NaturalEvents = () => {
    const [data, setData] = useState<any>()
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
                console.log(resp);
                setData(resp.data.events);
            }).catch(err => err);
    },[])

    useEffect(() => {
        if(data) {
            console.log(data[0].geometry[0].coordinates)
            // const latLng = getCenter(data[0].geometry[0]);
            // console.log(latLng)
        }
    },[data])
    
    // function getCenter(geojson: any) {
    //     if (geojson?.type === "Point") {
    //         return geojson.coordinates;
    //     } else if (geojson?.type === "Polygon") {
    //         /*
    //         For this test we are going to compute the center point of the bounding box
    //          that encloses the geoJson Polygon.

    //          Since the Polygon specification consists of an outer ring and then inner holes,
    //          we will only compute the center of the first (outer) LinearRing in the Polygon.

    //          Convert these coordinates to 0-360 to make it easier
    //          */

    //         // use the first point of the first LinearRing as the default for calculations
    //         let ullat = geojson.coordinates[0][0][1] + 90;
    //         let ullon = geojson.coordinates[0][0][0] + 180;
    //         let lrlat = geojson.coordinates[0][0][1] + 90;
    //         let lrlon = geojson.coordinates[0][0][0] + 180;

    //         for (let i = 0; i < geojson.coordinates[0].length; i++) {

    //             // longitudes
    //             if (geojson.coordinates[0][i][0] + 180 > ullon) {
    //                 ullon = geojson.coordinates[0][i][0] + 180;
    //             }
    //             if (geojson.coordinates[0][i][0] + 180 < lrlon) {
    //                 lrlon = geojson.coordinates[0][i][0] + 180;
    //             }

    //             // latitudes
    //             if (geojson.coordinates[0][i][1] + 90 > ullat) {
    //                 ullat = geojson.coordinates[0][i][1] + 90;
    //             }
    //             if (geojson.coordinates[0][i][1] + 90 < lrlat) {
    //                 lrlat = geojson.coordinates[0][i][1] + 90;
    //             }
    //         }

    //         const centerX = (ullon + ((lrlon - ullon) / 2)) - 180;
    //         const centerY = (lrlat + ((ullat - lrlat) / 2)) - 90;

    //         return [centerX, centerY];
    //     }
    // }

    const makeList = (datas: dataItem[]) => datas.map((data: dataItem, index) => {
        const [lng, lat]= data.geometry[0]?.coordinates;

        // const latn
        // let map: google.maps.Map;

        // function initMap(lat: number, lng: number, zoom=8) {
        //     return new google.maps.Map(document.getElementById("map") as HTMLElement, {
        //         center: {lat, lng},
        //         zoom: zoom,
        // });
        // }
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
               <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY}}
                    defaultCenter={{lat, lng}}
                    defaultZoom={5}
                    style={{height: "30vh"}}
                    options={{mapTypeId: 'satellite'}}
                    onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps, data.geometry)}
                >
                </GoogleMapReact>
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