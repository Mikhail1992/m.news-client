import CredentialsList from '../../components/CredentialsList';
import { PageWrapper } from '../../components/PageWrapper';
import { useFetchUsers } from '../../hooks/api/useFetchUsers';
import { useUpdateUser } from '../../hooks/api/useUpdateUser';

const Credentials = () => {
  const {
    isFetching,
    data: { data: users },
  } = useFetchUsers();
  const { mutate: updateUserRole } = useUpdateUser();

  return (
    <PageWrapper isLoading={isFetching} title="Set credentials" maxWidth="md">
      <CredentialsList users={users} updateUserRole={updateUserRole} />
    </PageWrapper>
  );
};

export default Credentials;
