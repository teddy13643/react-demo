import Hello from './Hello';
import Counter from './Counter';
import Chat from './Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>App.js</h1>
        <Chat />
        {/* <Hello />
        <Counter /> */}
      </header>
    </div>
  );
}

export default App;
