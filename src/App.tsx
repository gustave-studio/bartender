import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import Sound from './components/Sound'
import MessageWindow from './components/MessageWindow'
import Top from './components/Top'
import Footer from './components/Footer';

declare global { interface Window { cback: any } }

type Recipe = {
  name: string
  amount: string
}

type Ingredient = {
  name: string
  url: string
  image: string
}

function App() {
  const [playing, setPlaying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div style={{ display: isStarted ? 'none' : '' }}>
          <Top setIsStarted={setIsStarted} setPlaying={setPlaying}/>
        </div>
        <div style={{ display: isStarted ? '' : 'none' }}>
          <Sound playing={playing} setPlaying={setPlaying} />
          <div className="main_screen">
          </div>
          <MessageWindow />
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default App;