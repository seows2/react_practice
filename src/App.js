import { useRef, useState } from 'react';
import './App.css';
import Counter from './Counter';
import CreateUser from './CreateUser';
import Hello from './Hello';
import InputSample from './InputSample';
import UserList from './UserList';
import Wrapper from './Wrapper';


function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;
  const onChange = ({ target }) => {
    const { name, value } = target;

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    }
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }
    setUsers([...users, user])
    setInputs({
      username: "",
      email: "",
    });

    nextId.current += 1;
  }

  const onRemove = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }
  
  const onToggle = (id) => {
    setUsers(
      users.map(user => user.id === id ? {...user, active: !user.active} : user)
    )
  }
  
  return (
    <>
    <Wrapper>
      <Hello color="red" name="SeoWS2" isSpecial/>
      <Hello/>
    </Wrapper>
    <Counter />
    <InputSample />
    <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
   </>
  );
}

export default App;
