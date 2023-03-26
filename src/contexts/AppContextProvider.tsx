import React, {createContext, ReactNode, useContext, useState} from 'react';

const AppContext = createContext<any>({});

type AppContextProviderProps = {
  children?: ReactNode;
};

export default ({children}: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<unknown>(null);
  const [likeData, setLikeData] = useState<any>([]);
  const [myListData, setMyListData] = useState<any>([]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        likeData,
        setLikeData,
        myListData,
        setMyListData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
