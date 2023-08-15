import { FirebaseOptions, getApp, initializeApp } from "firebase/app"
import {  getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { DocumentReference, DocumentSnapshot, doc, getDoc, getFirestore } from "firebase/firestore";





const firebaseConfig: FirebaseOptions = {}

// generate single instance of firebase
function createFirebaseApp(config: FirebaseOptions) {
	try {
		return getApp();
	} catch (error) {
		return initializeApp(config)
	}
}

const firebaseApp = createFirebaseApp(firebaseConfig);


/*****/

//Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();


/**
 * Sign in with Google.
 *
 * @return {Promise<void>} A promise that resolves when the sign-in is complete.
 */
export const googleSignIn = async () => {
  await signInWithPopup(auth, googleAuthProvider)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Signs out the current user.
 *
 * @return {Promise<void>} A promise that resolves when the user is signed out.
 */
export const signOutUser = async (): Promise<void> => {
  return await signOut(auth);
};



/*****/

// Database
export const firestore = getFirestore(firebaseApp);

export const db = getFirestore(firebaseApp);

/**
 * Retrieves a document from the specified collection.
 *
 * @param {string} collection - The name of the collection to retrieve the document from.
 * @param {string} id - The ID of the document to retrieve.
 * @return {Promise<{ result: any, error: any }>} - A promise that resolves to an object containing the result of the retrieval and any error that occurred.
 */
export default async function getDocument(collection:string,id:string): Promise<{ result: DocumentSnapshot| undefined; error: any; }> {

	let docRef:DocumentReference = doc(db,collection,id);
	let result;
	let error;

	try {
		result = await getDoc(docRef);
	} catch (e) {
		error = e;
	}

	return { result, error }

}