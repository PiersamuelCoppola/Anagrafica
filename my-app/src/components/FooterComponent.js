import React from 'react'
import { useTranslation } from "react-i18next";

const FooterComponent = () => {

    const { t, i18n } = useTranslation();

    const lngs = {
        en: { nativeName: 'English' },
        it: { nativeName: 'Italiano' }
    };

    return (
        <footer className="footer" data-bs-theme="dark">
            <div className="text-muted">
                {Object.keys(lngs).map((lng) => (
                    <button key={lng} style={{ boxShadow: "none" ,color: "red", float: "left", fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} className="btn btn-black" type="submit" onClick={() => i18n.changeLanguage(lng)}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
                <span style={{ color: "red" }} className="navbar-brand mb-0 h1"> {t("footerComponent.rights")} </span>
            </div>
        </footer>
    )
}

export default FooterComponent