import { useEffect, useState } from "react";
import { database, onValue, ref } from "../services/firebase";
import { useAuth } from './useAuth'

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  likeCount: number,
  likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string
  }>
}>

export function useRoom(roomId: string){
  const { profile } = useAuth();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);

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
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === profile?.uid)?.[0]
        }
      })
      setTitle(data.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId, profile?.uid]);

  return {questions, title}
}