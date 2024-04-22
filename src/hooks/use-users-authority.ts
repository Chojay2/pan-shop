import { db } from '@/firebase/clientApp';
import { firebaseCollection } from '@/model/collection.model';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function useUsersAuthority() {
  const [userRole, setUserRole] = useState<string>('');

  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRoleSnapshot = await getDocs(
            query(
              collection(db, firebaseCollection.Users),
              where('uid', '==', user.uid),
            ),
          );
          const userRole = userRoleSnapshot.docs[0]?.data()?.role;
          setUserRole(userRole)
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('');
        }
        
      } else {
        setUserRole('');
      }
      setIsloading(false)

    });
    return () => unsubscribe();
  }, [])

  const isAdmin = userRole === 'admin';

  const isSeller = userRole === 'seller';

  const isBuyer = userRole === 'buyer';

  const isNotAuthenticated = userRole === '';

  return {
    isAdmin,
    isSeller,
    isBuyer,
    isNotAuthenticated,
    isLoading
  };
}

export default useUsersAuthority;
