import { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';
import classes from './index.module.css';
import SvgIcon from '../SvgIcon';
import Button from '../Button';

interface IProps {
  handlePublish?: () => void;
  handleUnpublish?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  entityType?: string;
}

const ActionsPanel = ({
  handlePublish,
  handleUnpublish,
  handleEdit,
  handleDelete,
  entityType = '',
}: IProps) => {
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <div className={classes.root}>
        {!!handleDelete && (
          <>
            <Button size="small" variant="secondary" onClick={() => setOpenDeleteDialog(true)}>
              <SvgIcon size={16} icon="trash" />
              Delete
            </Button>
            <ConfirmDialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
              title={`Delete ${entityType}`}
              content={`Are you sure you want to delete this ${entityType}?`}
              handleConfirm={handleDelete}
            />
          </>
        )}
        {!!handlePublish && (
          <>
            <Button size="small" variant="secondary" onClick={() => setOpenPublishDialog(true)}>
              <SvgIcon size={16} icon="publish" />
              Publish
            </Button>
            <ConfirmDialog
              open={openPublishDialog}
              onClose={() => setOpenPublishDialog(false)}
              title={`Publish ${entityType}`}
              content={`Are you sure you want to publish this ${entityType}?`}
              handleConfirm={handlePublish}
            />
          </>
        )}
        {!!handleUnpublish && (
          <>
            <Button size="small" variant="secondary" onClick={() => setOpenUnpublishDialog(true)}>
              <SvgIcon size={16} icon="unpublish" />
              Unpublish
            </Button>
            <ConfirmDialog
              open={openUnpublishDialog}
              onClose={() => setOpenUnpublishDialog(false)}
              title={`Unpublish ${entityType}`}
              content={`Are you sure you want to unpublish this ${entityType}?`}
              handleConfirm={handleUnpublish}
            />
          </>
        )}
        {!!handleEdit && (
          <Button size="small" variant="secondary" onClick={handleEdit}>
            <SvgIcon size={16} icon="edit" />
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

export default ActionsPanel;
