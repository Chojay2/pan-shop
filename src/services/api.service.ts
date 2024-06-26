import { db, storage } from '@/firebase/clientApp';
import { error } from 'console';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const fetchDataFromDb = async (dbName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, dbName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addToDb = async (
  data: any,
  dbName: string,
  parentDocId = '',
  subcollectionName = '',
) => {
  try {
    if (parentDocId && subcollectionName) {
      const parentDocRef = doc(db, dbName, parentDocId);
      const subcollectionRef = collection(parentDocRef, subcollectionName);
      const docRef = await addDoc(subcollectionRef, {
        ...data,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } else {
      const docRef = await addDoc(collection(db, dbName), data);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
    const fileRef = ref(storage, `images/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
   };
