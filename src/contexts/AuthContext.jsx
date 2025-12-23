import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import api from '../utils/api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginToBackend = async (firebaseUser, role = null) => {
    try {
      const response = await api.post('/auth/login', {
        email: firebaseUser.email,
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photoURL: firebaseUser.photoURL || '',
        role: role
      });

      if (response.data.success) {
        Cookies.set('token', response.data.token, { expires: 7 });
        setUser(response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.error('Backend login error:', error);
      throw error;
    }
  };

  const register = async (email, password, name, photoURL, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL
      });

      const backendUser = await loginToBackend(userCredential.user, role);
      toast.success('Registration successful!');
      return backendUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const backendUser = await loginToBackend(userCredential.user);
      toast.success('Login successful!');
      return backendUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const backendUser = await loginToBackend(result.user);
      toast.success('Login successful!');
      return backendUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const backendUser = await loginToBackend(result.user);
      toast.success('Login successful!');
      return backendUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await api.post('/auth/logout');
      Cookies.remove('token');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Don't log error if it's just a 401 (not logged in)
        if (error.response?.status !== 401) {
          console.error('Auth check error:', error);
        }
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};