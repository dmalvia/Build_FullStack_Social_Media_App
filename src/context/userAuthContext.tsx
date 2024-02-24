import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};

const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

export const userAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
});

export const UserAuthProvider: React.FunctionComponent<
  IUserAuthProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("I am in useEffect and user is : ", user);
      if (user) {
        console.log("The logged in user state is : ", user);
        setUser(user);
      }

      return () => {
        unsubscribe();
      };
    });
  });
  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
