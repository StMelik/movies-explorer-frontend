import './HeaderLayout.css';
import Header from '../../components/Header/Header';


function HeaderLayout({ children }) {
    return (
        <>
            <Header />
            <main className="main">
                {children}
            </main>
        </>

    );
}

export default HeaderLayout;
