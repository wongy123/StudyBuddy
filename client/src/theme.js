import { createTheme } from '@mui/material/styles';

const baseColors = {
    light: {
        background: 'hsl(216, 50%, 90%)',  
        text: 'hsl(216, 50%, 10%)',
        card: 'hsl(216, 30%, 95%)',                    
        tertiary: 'hsl(276, 80%, 20%)',
        accent: 'hsl(216, 61%, 18%)',
        sidebar: 'hsl(216, 70%, 94%)',
      },
      dark: {
        background: 'hsl(216, 50%, 10%)',     
        text: 'hsl(216, 50%, 90%)',           
        card: 'hsl(216, 30%, 15%)',           
        tertiary: 'hsl(276, 80%, 80%)',       
        accent: 'hsl(216, 61%, 82%)',         
        sidebar: 'hsl(216, 70%, 14%)',        
      }
      
    };

    export const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: baseColors.light.accent,
          },
          secondary: {
            main: baseColors.light.tertiary,
          },
          background: {
            default: baseColors.light.background, 
            paper: baseColors.light.card,        
          },
          text: {
            primary: baseColors.light.text,
            secondary: baseColors.light.tertiary,
          },
          sidebar: {
            main: baseColors.light.sidebar,
          },
        },
        typography: {
          fontFamily: '"Roboto", sans-serif',
        },
      });
      
      export const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: baseColors.dark.accent,
          },
          secondary: {
            main: baseColors.dark.tertiary,
          },
          background: {
            default: baseColors.dark.background,
            paper: baseColors.dark.card,
          },
          text: {
            primary: baseColors.dark.text,
            secondary: baseColors.dark.tertiary,
          },
          sidebar: {
            main: baseColors.dark.sidebar,
          },
        },
        typography: {
          fontFamily: '"Roboto", sans-serif',
        },
      });