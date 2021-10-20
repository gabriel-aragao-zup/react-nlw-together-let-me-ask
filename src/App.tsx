import { createContext, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";


import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './services/firebase'

import { Profile, lmaUserFromFirebaseUser } from "./services/profile";

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

type AuthContextType = {
  profile: Profile | undefined,
  signInWithGoogle: () => void
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [profile, setProfile] = useState<Profile>();

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => { setProfile(lmaUserFromFirebaseUser(result.user)); });
  }

  return (
   <BrowserRouter>
    <AuthContext.Provider value={{profile, signInWithGoogle}}>
      <Route path="/" exact component={Home}/>
      <Route path="/rooms/new" component={NewRoom}/>
    </AuthContext.Provider>
   </BrowserRouter>
  );
}

export default App;
