import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc, getDocs, query, where} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDEAoDG8zqUonL3szgYzs7UyMWcTpO6MFg",
  authDomain: "vanlife-e251b.firebaseapp.com",
  projectId: "vanlife-e251b",
  storageBucket: "vanlife-e251b.firebasestorage.app",
  messagingSenderId: "421511317943",
  appId: "1:421511317943:web:983d1d46714e7b995d8032"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vanCollectionRef = collection(db, "vans")

export async function getVans(){
  const collectionSnap = await getDocs(vanCollectionRef)
  const vans = collectionSnap.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return vans
}

export async function getVan( id ){
  const vanDocRef = doc(db, "vans", `${id}`)
  const docSnap = await getDoc(vanDocRef);
  return {
    ...docSnap.data(),
    id: docSnap.id
  }
}

export async function getHostVans(){
  const q = query(vanCollectionRef, where("hostId", "==", "123"))
  const collectionSnap = await getDocs(q)
  const vans = collectionSnap.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return vans
}
