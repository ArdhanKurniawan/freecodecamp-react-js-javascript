import React, {useState, useContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import API from '../../API';

// Component
import Button from '../Button';

// style
import {Wrapper} from './Login.style';

// Context
import {Context} from '../../context';

const Login = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState(false);

    const [_user, setUser] = useContext(Context);
    const navigate = useNavigate();



    const handleSubmit = async () => {
        setError(false);

        try {
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                Username,
                Password
            );
            console.log(sessionId);
            setUser({sessionId: sessionId.session_id, Username});
            navigate('/');
        } catch (Error) {
            setError(true);
        }

    };

    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };



    return (
        <Wrapper>
            {Error && <div className='Error'>There is something wrong .....</div>}
            
            <br />
            
            <label>Username : </label>
            <input 
                type="text"
                value={Username}
                name='username'
                onChange={handleInput}
            />

            <br />

            <label>Password : </label>
            <input 
                type="password"
                value={Password}
                name='password'
                onChange={handleInput}
            />
            <Button text='Login' callback={handleSubmit} />
        </Wrapper>
    )
}

export default Login;