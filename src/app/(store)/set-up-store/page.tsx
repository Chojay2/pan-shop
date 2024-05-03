import AuthGuard from '@/components/auth-gaurd';
import SetUpStoreForm from '@/components/store/set-up-store/set-up-store-form';
import React from 'react';

export default function page() {
  return (
    <AuthGuard allowedRoles={['seller']}>
      <SetUpStoreForm />
    </AuthGuard>
  );
}
