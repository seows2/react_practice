import { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import Counter from './Counter';
import CreateUser from './CreateUser';
import Hello from './Hello';
import InputSample from './InputSample';
import UserList from './UserList';
import Wrapper from './Wrapper';

function countActiveUsers(users) {
  console.log("활성 사용자는 세는 중...");
  return users.filter(users => users.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

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

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active: false,
    }
    setUsers(users => [...users, user])
    setInputs({
      username: "",
      email: "",
    });

    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);
  
  const onToggle = useCallback((id) => {
    setUsers(
      users => users.map(user => user.id === id ? {...user, active: !user.active} : user)
    )
  }, []);
  
  const count = useMemo(() => countActiveUsers(users), [users]);
  
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
    <div>활성 사용자 수: {count}</div>
   </>
  );
}

export default App;
