import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './mantine.jsx'
import App from './App.jsx'
import {createTheme, MantineProvider} from '@mantine/core';
import {BrowserRouter} from "react-router";

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
