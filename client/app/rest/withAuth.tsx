import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent : any) => {
  const AuthComponent = (props : any) => {
    console.log("IN with auth")
    const router = useRouter();
    const isLoggedIn = useSelector((state:any) => state.authReducer.value?.authToken);
    useEffect(() => {
      if (!isLoggedIn) {
        if (typeof window !== 'undefined') {
          redirect('/auth');
        }
      }
    }, [isLoggedIn, router]);

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getInitialProps) {
    AuthComponent.getInitialProps = WrappedComponent.getInitialProps;
  }

  return AuthComponent;
};

export default withAuth;
