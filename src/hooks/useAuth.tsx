import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from "../service/api";
import {COLLECTION_USER} from "../configs/database";


const {SCOPE} = process.env;
const {CLIENT_ID} = process.env;
const {CDN_IMAGE} = process.env;
const {REDIRECT_URI} = process.env;
const {RESPONSE_TYPE} = process.env;


type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

type UserInfoResponse = {
  data: User;

}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    try {
      setIsLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const {
        type,
        params
      } = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;

      if (type === "success" && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo: UserInfoResponse = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
        setUser(userData);
      }
    } catch (e) {
      throw new Error('N??o foi poss??vel autenticar');
    } finally {
      setIsLoading(false);
    }

  }

  const loadUserStorageData = async () => {
    const userData = await AsyncStorage.getItem(COLLECTION_USER);

    if (userData) {
      const userLogged: User = JSON.parse(userData);

      setUser(userLogged);
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
    }
  }

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);


  return (
    <AuthContext.Provider value={{user, signIn, signOut, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext);
}

export {
  AuthProvider,
  useAuth
}
