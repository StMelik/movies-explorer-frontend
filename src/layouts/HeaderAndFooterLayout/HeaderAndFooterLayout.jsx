import './HeaderAndFooterLayout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


function HeaderAndFooterLayout({ children }) {
    return (
        <div className='app'>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>

    );
}

export default HeaderAndFooterLayout;
