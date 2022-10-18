import { useState, RefObject, createRef, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Alert from '../Alert';
import useStore, { Status } from '../../hooks/useStore';
import './index.css';
import classes from './index.module.css';

interface IAlert {
  id: string;
  message: string;
  status: Status;
  nodeRef: RefObject<HTMLDivElement> | null;
}

function Snackbar() {
  const { messages, removeMessage } = useStore();
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    setAlerts(messages.map((message) => ({ ...message, nodeRef: createRef() })));
  }, [messages]);

  useEffect(() => {
    if (alerts.length === 6) {
      removeMessage(alerts[0].id);
    }
  }, [alerts.length]);

  const handleClose = (id: string) => {
    removeMessage(id);
  };

  return (
    <div className={classes.root}>
      <TransitionGroup>
        {alerts.map((alert) => {
          return (
            <CSSTransition key={alert.id} nodeRef={alert.nodeRef} timeout={300}>
              <div ref={alert.nodeRef} className={classes.item}>
                <Alert
                  key={alert.message}
                  message={alert.message}
                  status={alert.status}
                  handleClose={() => handleClose(alert.id)}
                />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

export default Snackbar;
