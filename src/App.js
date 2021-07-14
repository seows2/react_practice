import React, { useCallback, useMemo, useReducer, useRef } from 'react';
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

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id ? {...user, active: !user.active}: user)
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

export const userDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  
  const count = useMemo(() => countActiveUsers(users, [users]));

  return (
  <userDispatch.Provider value={dispatch}>
    <Wrapper>
      <Hello color="red" name="SeoWS2" isSpecial/>
      <Hello/>
    </Wrapper>
    <Counter />
    <InputSample />
    <CreateUser />
    <UserList users={users} />
    <div>활성 사용자 수: {count}</div>
  </userDispatch.Provider>
  );
}

export default App;
