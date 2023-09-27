import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext, AuthContextType } from '../utils/contexts/AuthProvider';
import axios from 'axios';
import loginImg from "../assets/intro.png"

interface LoginInput {
  email: string;
  password: string;
}

const LoginCmp: React.FC = () => {
  const { user, setUser } = useAuthContext() as AuthContextType;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  const [loginInput, setLogin] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...loginInput, [name]: value });
  };

  useEffect(() => {
    axios
      .get('/api/login/status')
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user?.type === 'visitor') {
          setLoading(false);
        } else if (res.data.user?.accessId > 1) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, setUser]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors([]);

    if (loginInput.email === '') {
      setErrors((errors) => [...errors, "L'Email ne peut pas être vide"]);
    }

    if (loginInput.password === '') {
      setErrors((errors) => [...errors, 'Le Mot de passe ne peut pas être vide']);
    } else {
      axios
        .post('/api/login', {
          email: loginInput.email,
          password: loginInput.password,
        })
        .then((res) => {
          setUser(res.data.user);
          if (res.data.user.accessId > 1) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          const response = err?.response;
          console.log(response);
          if (response?.status === 401) {
            setErrors((errors) => [...errors, 'Email ou mot de passe incorrect']);
          }
        });
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex items-center h-[100vh]">
        <div className='shadow-xl flex max-w-4xl mx-auto rounded-xl'>
        <section className="bg-[#f2f2f2] p-8 w-[50%] rounded-tl-xl rounded-bl-xl flex flex-col gap-4">
            <div className="text-2xl font-bold text-center">Chrono flex</div>
           <div className="flex w-full justify-center">
            <img src={loginImg} alt="LoginImg" className="h-[200px]" />
            </div> 

           <div className="font-bold text-xl">Application de Pointage d'Entrée et Gestion des Congés</div>
<div className="flex flex-col gap-2">

<div> ✓ Suivi avancé du <span className="font-semibold">Temps</span> avec des outils intégrés </div>

<div> ✓ Accès au <span className="font-semibold">Calendrier, aux Notifications et aux Rapports</span> </div>

<div> ✓ Interface utilisateur <span className="font-semibold">intuitive</span> pour une navigation fluide </div>

<div> ✓ Utilisation de <span className="font-semibold">Widgets Personnalisés</span> et de <span className="font-semibold">Tableaux de Bord sur Mesure</span> </div>
</div>
        </section>
      <form className="flex flex-col p-8 gap-4 w-[50%] justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">

        <div className="text-center font-bold text-xl">Connexion</div>
        {errors?.map((error, index) => (
          <div key={index} className="text-red-500 flex items-center justify-center gap-2">
            {error}
          </div>
        ))}
        <div>
            <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={loginInput.email}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div>
            <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={loginInput.password}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <Link className="text-indigo-600 text-end" to="/authentication/simple/forgot-password">
          Mot de passe oublié ?
        </Link>
        <button type="submit" className="self-center w-full bg-indigo-600 hover:bg-indigo-800 rounded-xl py-3 text-white font-bold">
          Login
        </button>
        </div>
      </form>
        </div>
    </div>
  );
};

export default LoginCmp;
