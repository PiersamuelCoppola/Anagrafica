import React from 'react'
import { useTranslation } from "react-i18next";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const FooterComponent = () => {

    const { t, i18n } = useTranslation();

    const lngs = {
        en: { nativeName: 'English' },
        it: { nativeName: 'Italiano' }
    };

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#121212',
          },
        },
      });

    return (
        <footer className="footer" data-bs-theme="dark">
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <div className="text-muted" >
                                {Object.keys(lngs).map((lng) => (
                                    <Button variant="contained" style={{ backgroundColor:"#d32f2f", float: "right", fontWheight: 'bold', marginLeft:"10px", fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}} key={lng} className="btn btn-black" type="submit" onClick={() => i18n.changeLanguage(lng)}>
                                        {lngs[lng].nativeName}
                                    </Button>
                                ))}
                               
                            </div>
                            <div style={{alignItems:"center", width:"75%"}}>
                            <span style={{ color: "#FF0000", }} className="navbar-brand mb-0 h1"> {t("footerComponent.rights")} </span>
                            </div>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </footer>
    )
}

export default FooterComponent