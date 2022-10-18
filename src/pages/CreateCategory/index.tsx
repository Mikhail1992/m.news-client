import CreateCategoryForm from '../../components/forms/CreateCategoryForm';
import { PageWrapper } from '../../components/PageWrapper';

const CreateCategory = () => {
  return (
    <PageWrapper title="New Category">
      <CreateCategoryForm />
    </PageWrapper>
  );
};

export default CreateCategory;
