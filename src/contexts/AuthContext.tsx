import { GoogleAuthProvider } from "@firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

import { Profile, profileFromFirebaseUser } from "../services/profile";

type AuthContextType = {
  profile: Profile | undefined,
  signInWithGoogle: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setProfile(profileFromFirebaseUser(user))
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => { setProfile(profileFromFirebaseUser(result.user)); });
  }

  return (
    <AuthContext.Provider value={{profile, signInWithGoogle}}>
      { props.children }
    </AuthContext.Provider>

  );
}

