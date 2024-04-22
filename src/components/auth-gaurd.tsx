'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUsersAuthority from '@/hooks/use-users-authority';

interface AuthGuardProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  allowedRoles = [],
  children,
}: AuthGuardProps) => {
  const router = useRouter();
  const { isAdmin, isSeller, isBuyer, isNotAuthenticated, isLoading } =
    useUsersAuthority();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (isNotAuthenticated) {
        setIsAuthorized(false);
        router.push('/sign-in');
      } else if (allowedRoles.length > 0) {
        const isRoleAuthorized = allowedRoles.some((role) => {
          return (
            (role === 'admin' && isAdmin) ||
            (role === 'seller' && isSeller) ||
            (role === 'buyer' && isBuyer)
          );
        });
        setIsAuthorized(false);
        if (!isRoleAuthorized) {
          router.push('/not-authorized');
        } else {
          setIsAuthorized(true);
        }
      }
    }
  }, [
    isLoading,
    isNotAuthenticated,
    isAdmin,
    isSeller,
    isBuyer,
    allowedRoles,
    router,
    isAuthorized,
  ]);

  if (isLoading) {
    // TODO UI:loader here
    return <div>Loading...</div>;
  }

  return <>{isAuthorized && children}</>;
};

export default AuthGuard;
