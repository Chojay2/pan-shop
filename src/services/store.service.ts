import useUsersAuthority from '@/hooks/use-users-authority';
import { firebaseCollection } from '@/model/collection.model';
import { ShopStatus } from '@/model/shop.model';
import { addToDb, fetchDataFromDb, fetchDataID } from '@/services/api.service';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default abstract class StoreService {
  static addNewStore = async (values) => {
    const storeInfo = {
      ...values,
      status: ShopStatus.pending,
    };
    toast.loading('adding your store...', { id: 'loading' });
    await addToDb(storeInfo, firebaseCollection.Stores);
    toast.dismiss('loading');
    toast.success('store added successfully');
  };

  static fetchStore = async(uid?: string) => {
    const {isAdmin, isSeller} = useUsersAuthority();
    if(isAdmin){
      return fetchDataFromDb(firebaseCollection.Stores);
       
    } else if(isSeller && uid) {
      return fetchDataID(firebaseCollection.Stores, uid);
    }
  }
}
