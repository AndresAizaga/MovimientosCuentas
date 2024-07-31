import { FC } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import { HiringTest } from './components/home/HiringTest.tsx';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#eeeeee',
    },
  },
},
esES,);

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HiringTest />
    </ThemeProvider>
  )
}

export default App
