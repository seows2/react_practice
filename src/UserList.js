import React from 'react'

const User = ({ user, onRemove, onToggle }) =>{

    return (
        <div>
            <b style={{
                cursor: "pointer",
                color: user.active ? "green" : "black"
            }}
            onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
           {users.map(user => <User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle}/>)}
        </div>
    )
}

export default React.memo(UserList);