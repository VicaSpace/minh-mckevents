import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import AppRouter from '@/routes/AppRouter';
import { store } from '@/states/store';
import { theme } from '@/theme';

const App: React.FC<{}> = () => {
  return (
    <>
      <HelmetProvider>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <div className="layout">
              <AppRouter />
            </div>
          </ChakraProvider>
        </Provider>
      </HelmetProvider>
    </>
  );
};

export default App;
