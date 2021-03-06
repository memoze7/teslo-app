import { FC, useReducer } from 'react'
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './'
import Cookie from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}


export const AuthProvider: FC = ({ children }) => {

  const [ state, dispatch ] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
  }

  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('cart');
    router.reload();
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      registerUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )

}