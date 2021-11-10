import { useHistory } from 'react-router-dom'

import ilustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react'
import { database, onValue, ref } from '../services/firebase'

export function Home() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');
  const { profile, signInWithGoogle } = useAuth();



  async function handleCreateRoom() {
    if(!profile){
      try {
        await signInWithGoogle();
      } catch (error) {
        return;
      }
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if(roomCode.trim() === '') {
      return;
    }
    const roomRef = await ref(database, `rooms/${roomCode}`);
    onValue(roomRef, (snapshot) => {
      if(!snapshot.exists()){
        alert(`Could not find room ${roomCode}`)
        return;
      }
      if(snapshot.val().endedAt){
        alert(`This room is already finished`)
        return;
      }
      if(snapshot.val().authorId === profile?.uid){
        history.push(`/admin/rooms/${roomCode}`);
        return;
      }
      history.push(`/rooms/${roomCode}`);
    });
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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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
