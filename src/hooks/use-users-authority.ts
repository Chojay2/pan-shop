import { db } from '@/firebase/clientApp';
import { firebaseCollection } from '@/model/collection.model';
import { RootState } from '@/state/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useUsersAuthority() {
  const [userRole, setUserRole] = useState<string>('');

  const [isLoading, setIsloading] = useState(true)
  const role = useSelector((state: RootState) => state.auth.user?.role);


  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (role && user) {
        try {
          setUserRole(role)
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
