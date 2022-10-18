import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Status = 'error' | 'success';

export interface IMessage {
  id: string;
  message: string;
  status: Status;
  timestamp: number;
}

export interface StoreInterface {
  messages: IMessage[];
  setMessage: (message: string, status: Status) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
}
const Store = createContext<StoreInterface>({} as StoreInterface);

interface StoreProviderProps {
  children: React.ReactNode;
}

const DELAY_OF_VISIBILITY = 10000;

export function StoreProvider({ children }: StoreProviderProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages.length > 0
          ? prevMessages.filter((x) => x.timestamp + DELAY_OF_VISIBILITY > Date.now())
          : prevMessages,
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const setMessage = (message: string, status: Status) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), message, status, timestamp: Date.now() },
    ]);
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((x) => x.id !== id));
  };

  const clearMessages = () => setMessages([]);

  const memoedValue: StoreInterface = useMemo(
    () => ({
      messages,
      setMessage,
      clearMessages,
      removeMessage,
    }),
    [messages.length],
  );

  return <Store.Provider value={memoedValue}>{children}</Store.Provider>;
}

export default function useStore() {
  return useContext(Store);
}
