import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import UserList from './redux/UI';

function App() {
  return (
    <div className="App" style={{padding:100}}>
      <h2 style={{textAlign: 'center'}}>Todolist With Redux-toolkit And fetch API</h2>
     <UserList />
    </div>
  );
}

export default App;
