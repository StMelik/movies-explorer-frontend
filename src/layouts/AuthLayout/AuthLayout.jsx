import { useHistory, Link } from "react-router-dom";
import './AuthLayout.css';
import Logo from "../../components/Logo/Logo";



function AuthLayout({ children }) {
    const currentPath = useHistory().location.pathname
    const isSignIn = currentPath === '/signin'
    const link = isSignIn ? '/signup' : '/signin'

    const title = (
        <h1 className='auth__title'>
            {isSignIn ? 'Рады видеть!' : 'Добро пожаловать!'}
        </h1>
    )

    const question = (
        <div className="auth__question">
            <p className="auth__question-text">
                {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
            </p>
            <Link className="auth__question-link" to={link}>
                {isSignIn ? 'Регистрация' : 'Войти'}
            </Link>
        </div>
    )

    return (
        <>
            <main className="auth">
                <div className="auth__logo">
                    <Logo />
                </div>
                {title}
                {children}
                {question}
            </main>
        </>

    );
}

export default AuthLayout;
