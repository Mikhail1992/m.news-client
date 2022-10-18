import { PageWrapper } from '../../components/PageWrapper';
import SignUpForm from '../../components/forms/SignUpForm';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const { register } = useAuth();

  return (
    <PageWrapper maxWidth="sm" title="Registration">
      <SignUpForm register={register} />
    </PageWrapper>
  );
};

export default SignUp;
