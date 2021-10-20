import { useContext } from 'react';
import { useHistory } from 'react-router-dom'

import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'
import { AuthContext } from '../App';

export function Home() {
  const history = useHistory();
  const {profile, signInWithGoogle} = useContext(AuthContext);



  function handleCreateRoom() {
    if(!profile){
      signInWithGoogle();
    }
    history.push('/rooms/new')

  }
  return (
    <div id="page-auth">
      <aside>
        <img src={ ilustration } alt="Ilustração com perguntas e respostas." />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logo } alt="Logotipo Let me Ask." />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={ googleIcon } alt="Ícone do google." />
            Crie sua Sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala" 
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
