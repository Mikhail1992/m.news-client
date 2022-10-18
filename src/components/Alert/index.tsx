import cn from 'classnames';
import SvgIcon from '../SvgIcon';
import { Status } from '../../hooks/useStore';
import styles from './index.module.css';

interface IProps {
  message: string | null;
  handleClose: () => void;
  status: Status;
}

const Alert = ({ message, handleClose, status }: IProps) => {
  return (
    <div className={cn(styles.alert, styles[`alert_${status}`])}>
      <div className={styles.icon}>
        <SvgIcon icon={status} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{status}</div>
        <div className={styles.text}>{message}</div>
      </div>

      <div className={styles.close} onClick={handleClose}>
        <SvgIcon size={16} icon="cancel" />
      </div>
    </div>
  );
};

export default Alert;
