import './HeaderLayout.css';

import Header from '../../components/Header/Header';

function HeaderLayout({ children, setIsShowMenu }) {
    return (
        <>
            <Header
                setIsShowMenu={setIsShowMenu}
            />
            <main className="main">
                {children}
            </main>
        </>

    );
}

export default HeaderLayout;
