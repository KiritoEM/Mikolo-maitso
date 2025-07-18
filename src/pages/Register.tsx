import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { register } from '../services/authServices';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loginResponse = await register({ username, email, password });
      console.log(loginResponse);

      if (loginResponse.status === "error") {
        setError(loginResponse.message);
        return;
      }

      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la création du compte:', err);
      setError('Une erreur est survenue lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card>
          <div className="flex justify-center mb-6">
            <Logo size="medium" />
          </div>
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Créer un compte</h1>
          <p className="text-center text-gray-600 mb-6">
            Prenez soin de vos plantes et contribuez à un avenir vert en rejoignant Mikolo.
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex:Rabe"
              required
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-2"
            >
              Créer un compte
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Vous avez déjà un compte?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;