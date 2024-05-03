import { firebaseCollection } from '@/model/collection.model';
import { User, UserAuth } from '@/model/user.model';
import { addToDb, fetchDataFromDb } from '@/services/api.service';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export default abstract class UserService {
  static createUser = async (values) => {
    const auth = getAuth();
    try {
      //firebase auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  static addUser = (user: User) => {
    //user data in users table
    try {
      addToDb(user, firebaseCollection.Users);
    } catch (error) {
      throw error;
    }
  };

  static signInUser = async (values) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  static signOutUser = () => {
    try {
      const auth = getAuth();
      signOut(auth)
    }
    catch (error) {
      throw error
    }

  }

  static fetchUsers = async () => {
    const users = await fetchDataFromDb('users');
    return users;
  }
}
