import { Link } from 'react-router-dom'

import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {

  const { profile } = useAuth();
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
          <h2>Criar uma nova sala</h2>
          <h1>{ profile?.name }</h1>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala" 
            />
            <Button type="submit">
              Criar na sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}