import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Divider from "../components/Divider";
import SplitLayout from "../components/SplitLayout";
import AuthRightPanel from "../components/AuthRightPanel";
import FaceRecognitionModal from "../components/FaceRecognitionModal";
import { UserRound } from "lucide-react";
import { login } from "../services/authServices";
import { createSession } from "../lib/session";
import { LoginFormData } from "../types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const loginResponse = await login({ email, password });

      if (loginResponse.status === "error") {
        setError(loginResponse.message);
        return;
      }

      createSession(loginResponse.data?.token!);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setError("Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceRecognition = async (
    data: LoginFormData
  ): Promise<boolean> => {
    try {
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      });

      if (loginResponse.status === "error") {
        toast("Utiliseur non trouvé, veuillez vous assurer d'avoir un compte", {
          type: "error",
        });
        return false;
      }

      setTimeout(() => {
        createSession(loginResponse.data?.token!);
        navigate("/dashboard");
      }, 2000);

      return true;
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      toast("Une erreur est survenue lors de la connexion.", {
        type: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
      setShowFaceRecognition(false);
    }
  };

  return (
    <>
      <SplitLayout
        left={
          <div className="w-full max-w-md mx-auto">
            <div className="mb-2">
              <Logo size="large" />
            </div>

            <div className="login-container mt-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Se connecter
              </h1>
              <p className="text-gray-600 mb-6">
                Se connecter à votre compte pour accéder à la plateforme
              </p>

              <Button
                variant="secondary"
                fullWidth
                className="mb-4 flex items-center justify-center"
                onClick={() => setShowFaceRecognition(true)}
              >
                <UserRound className="mr-2 h-5 w-5" />
                Par reconnaissance faciale
              </Button>

              <Divider text="ou" />

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
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

                <div className="text-right mb-4">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>

                <Button type="submit" fullWidth isLoading={isLoading}>
                  Se connecter
                </Button>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Pas encore de compte?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        }
        right={<AuthRightPanel />}
      />

      <FaceRecognitionModal
        isOpen={showFaceRecognition}
        onClose={() => setShowFaceRecognition(false)}
        onSuccess={(data: LoginFormData) => handleFaceRecognition(data)}
      />
    </>
  );
};

export default Login;
