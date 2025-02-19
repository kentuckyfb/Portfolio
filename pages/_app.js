import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '../theme/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
      `}</style>

    <ThemeProvider theme={darkTheme}>
      
      <Component {...pageProps} />
      
    </ThemeProvider>
    </>
  );
}

export default MyApp;