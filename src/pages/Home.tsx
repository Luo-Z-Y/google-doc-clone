import {auth, provider} from '../config/Firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  async function signInWithGoogle() {
    await signInWithPopup(auth, provider);
    navigate('/Notes')
  }

  return <div>
    <p>Sign In With Google To Continue</p>
    <button onClick={signInWithGoogle}>Sign In</button>
  </div>;
}