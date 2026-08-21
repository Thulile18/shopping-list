import AuthCard from '../AuthCard';
import LoginForm from '../Auth/LoginForm';

function Login() {
  return (
    <div className="auth-page">
      <AuthCard title="Welcome Back" subtitle="Sign in to your shopping list account">
        <LoginForm />
      </AuthCard>
    </div>
  );
}

export default Login;
