import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonToggle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, calendarOutline, calendarSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, searchOutline, searchSharp, thunderstormOutline, thunderstormSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Daily Picture',
    url: '/daily-pic',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp
  },
  {
    title: 'Search Pictures',
    url: '/search-pictures',
    iosIcon: searchOutline,
    mdIcon: searchSharp
  },
  {
    title: 'Natural Events',
    url: '/natural-events',
    iosIcon: thunderstormOutline,
    mdIcon: thunderstormSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>Nasa Data Portal</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonToggle></IonToggle> 
            <IonLabel>Dark Mode</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
