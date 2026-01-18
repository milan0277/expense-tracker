import "./App.css";
import Routees from "./Routes/Routees";
import {
  Toaster 
} from 'sonner'

function App() {
  return (
    <>
      <Routees />
      <Toaster richColors  position="top"/>
    </>
  );
}

export default App;
