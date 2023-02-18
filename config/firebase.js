import { initializeApp } from "firebase/app";
import { getAuth       } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import constants         from "expo-constants";

const firebaseConfig = {
	apiKey:              Constants.manifest.extra.apiKey,
	authDomain:          Constants.manifest.extra.authDomain,
	projectId:           Constants.manifest.extra.projectId,
	storageBucket:       Constants.manifest.extra.storageBucket,
	messagingSenderId:   Constants.manifest.extra.messagingSenderId,
	appId:               Constants.manifest.extra.APP_ID,
	databaseURL:         Constants.manifest.extra.databaseURL
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();