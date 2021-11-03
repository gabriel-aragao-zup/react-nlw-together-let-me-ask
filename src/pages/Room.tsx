import { FormEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database, onValue, push, ref } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
  id: string
}

type Question = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean
}>

export function Room() {
  const { profile, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([])
  const roomId = params.id;

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val()  ?? {};
      const dataQuestions: FirebaseQuestions = data.questions ?? {};
      const parsedQuestions = Object.entries(dataQuestions).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          content: value.content,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })
      setTitle(data.title);
      setQuestions(parsedQuestions);
    });

  }, [roomId])

  async function handleLogin () {
    if(!profile){
      try {
        await signInWithGoogle();
      } catch (error) {
        return;
      }
    }
  }
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if(newQuestion.trim() === '') {
      return;
    }
    if(!profile){
      try {
        await signInWithGoogle();
      } catch (error) {
        return;
      }
    }

    const question = {
      author: {
        name: profile?.name,
        avatar: profile?.photoURL,
      },
      content: newQuestion,
      isHighlighted: false,
      isAnswered: false
    }
    const roomRef = ref(database, `rooms/${roomId}/questions`);
    await push(roomRef, question);
    setNewQuestion('');

    toast.success('Pergunta enviada.')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?" 
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            { !profile ? (
              <span>Para enviar uma pergunta, <button onClick={handleLogin}>faça seu login.</button></span>
            ) : (
              <div className="user-info">
                <img src={profile!!.photoURL} alt={profile!!.name} />
                <span>  {profile!!.name}</span>
              </div>
            ) }
            
            <Button type="submit" disabled={!profile}>Enviar Perguntas</Button>
          </div>
        </form>

        {JSON.stringify(questions)}

      </main>
      <Toaster />
    </div>
  );
}