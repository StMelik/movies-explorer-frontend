import './HeaderAndFooterLayout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


function HeaderAndFooterLayout({ children }) {
    return (
        <>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </>

    );
}

export default HeaderAndFooterLayout;
