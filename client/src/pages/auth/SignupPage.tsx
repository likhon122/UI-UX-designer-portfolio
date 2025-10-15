import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signup, clearError } from '../../store/slices/authSlice';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(signup(formData));
    if (signup.fulfilled.match(result)) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to your email. Please check your inbox and verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password *
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address (Optional)
              </label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St, City"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
