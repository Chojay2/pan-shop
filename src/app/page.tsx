import AuthGuard from '@/components/auth-gaurd';

export default function Home() {
  return (
    <div>
      <AuthGuard allowedRoles={['seller']}>
        <div>home</div>
      </AuthGuard>
    </div>
  );
}
