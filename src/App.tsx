import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Plugins } from "@capacitor/core";

import ThemeContext from "./contexts/Theme"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import DailyPicture from './pages/DailyPicture';
import SearchPictures from './pages/SearchPictures';
import NaturalEvents from './pages/NaturalEvents';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
	const [isInit, setIsInit] = useState(false);

  // TODO: check if user prefers dark mode
	useEffect(() => {
		if (isInit) {
			// set css
			document.body.classList.toggle("dark", isDark);
			storeTheme(isDark);
		}
	}, [isDark, isInit]);

	useEffect(() => {
		setUserPreferences();
		async function setUserPreferences() {
			const stored = await getStoredTheme();
			if (stored !== null) {
				setIsDark(stored === "true" ? true : false);
				console.log(`isDark: ${stored === "true" ? true : false}`);
			}
		}
		setIsInit(true);
	}, []);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	/**
	 * Stores if the device prefers dark mode
	 * @param isDark - theme boolean
	 */
	async function storeTheme(isDark: boolean): Promise<void> {
		await Plugins.Storage.set({
			key: "isDark",
			value: `${isDark ? "true" : "false"}`,
		});
	}

	async function getStoredTheme() {
		const stored = await Plugins.Storage.get({ key: "isDark" });
		return stored.value;
	}

  return (
    <ThemeContext.Provider value={isDark}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu toggleTheme={toggleTheme}/>
            <IonRouterOutlet id="main">
              <Route path="/daily-pic" component={DailyPicture} exact />
              <Route path="/natural-events" component={NaturalEvents} exact />
              <Route path="/search-pictures" component={SearchPictures} exact />
              <Redirect from="/" to="/daily-pic" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </ThemeContext.Provider>
  );
};

export default App;
