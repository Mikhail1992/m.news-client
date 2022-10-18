import { PageWrapper } from '../../components/PageWrapper';
import SignInForm from '../../components/forms/SignInForm';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  const { login } = useAuth();

  return (
    <PageWrapper maxWidth="sm" title="Login into account">
      <SignInForm login={login} />
    </PageWrapper>
  );
};

export default SignIn;
