import { PageWrapper } from '../../components/PageWrapper';
import RestorePasswordForm from '../../components/forms/RestorePasswordForm';
import useAuth from '../../hooks/useAuth';

const RestorePassword = () => {
  const { restorePassword } = useAuth();

  return (
    <PageWrapper maxWidth="sm" title="Restore Password">
      <RestorePasswordForm restorePassword={restorePassword} />
    </PageWrapper>
  );
};

export default RestorePassword;
