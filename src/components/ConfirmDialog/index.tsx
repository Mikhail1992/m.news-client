import Button from '../Button';
import SvgIcon from '../SvgIcon';
import classes from './index.module.css';

interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  handleConfirm: () => void;
}

const ConfirmDialog = ({ open, onClose, title, content, handleConfirm }: IProps) => {
  const confirm = () => {
    handleConfirm();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className={classes.layout} onClick={onClose} />
      <div className={classes.dialog}>
        <button className={classes.close} onClick={onClose}>
          <SvgIcon size={24} icon="cancel" />
        </button>
        <div className={classes.title}>{title}</div>
        {content && <div className={classes.content}>{content}</div>}
        <div className={classes.buttons}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={confirm} role="button">
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;
