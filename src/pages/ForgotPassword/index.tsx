import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { PageWrapper } from '../../components/PageWrapper';
import useAuth from '../../hooks/useAuth';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  return (
    <PageWrapper maxWidth="sm" title="Forgot password">
      <ForgotPasswordForm forgotPassword={forgotPassword} />
    </PageWrapper>
  );
};

export default ForgotPassword;
