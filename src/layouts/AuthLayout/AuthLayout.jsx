import { useHistory, Link } from "react-router-dom";
import './AuthLayout.css';
import Logo from "../../components/Logo/Logo";



function AuthLayout({ children }) {
    const currentPath = useHistory().location.pathname
    const isSignIn = currentPath === '/signin'

    return (
        <>
            <main className="auth">
                <div className="container auth__container">
                    <div className="auth__wrapper">
                        <div className="auth__logo">
                            <Logo />
                        </div>
                        <h1 className='auth__title'>
                            {isSignIn ? 'Рады видеть!' : 'Добро пожаловать!'}
                        </h1>
                        {children}
                    </div>
                </div>
            </main>
        </>

    );
}

export default AuthLayout;
