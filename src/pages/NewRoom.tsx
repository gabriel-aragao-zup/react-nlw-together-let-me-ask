import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database, ref, push } from '../services/firebase'

import '../styles/auth.scss'

export function NewRoom() {
  
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === ''){
      return;
    }

    const roomRef = ref(database, 'rooms');
    const room = {
      title: newRoom,
      authorId: profile?.uid,
    };
    let firebaseRoom = await push(roomRef, room);
    
    history.push(`/rooms/${firebaseRoom.key}`)
  }


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
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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