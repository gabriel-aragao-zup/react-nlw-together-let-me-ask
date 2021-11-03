import copyImg from '../assets/images/copy.svg'
import  toast, { Toaster } from 'react-hot-toast';
import '../styles/roomCode.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode (props: RoomCodeProps){

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast('Copied to clipboard')
  }

  return (
    <div>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala {props.code}</span>
      </button>
      <Toaster />
    </div>
  )
}