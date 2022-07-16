import "../styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/index";
import { Toaster } from 'react-hot-toast';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ReduxProvider store={store}>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </ReduxProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
