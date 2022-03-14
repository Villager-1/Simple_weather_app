import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import Signup from './Signup';

const Login = () => {
    const navigate = useNavigate();

    const [formIsValid, setFormIsValid] = useState();
    const [email, setEmail] = useState(true);
    const [pass, setPass] = useState(true);

    const emailRef = useRef();
    const passRef = useRef();

    const emailIsValid = (email) => {
        return (email.includes('@') && email.includes('.com') && email.trim().length >= 8);
    }

    const passIsValid = (pass) => {
        return pass.trim().length > 8;
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passRef.current.value;

        const emailValidity = emailIsValid(enteredEmail);
        const passValidity = passIsValid(enteredPass);

        if(emailValidity){
            setEmail(true);
        }else setEmail(false);

        if(passValidity){
            setPass(true);
        }else setPass(false);

        if(emailValidity && passValidity){
            setFormIsValid(true);
        }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGWQMAfTpuIWFuweOPXLXu5e92Ryo3Atk',
        {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPass,
                returnSecureToken: true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            if(result.ok){
              return result.json();
            }else{
              return result.json().then((data) => {
                let errorMessage = 'Authentication failed!';
                if(data && data.error && data.error.message){
                  errorMessage = data.error.message;
                }
                alert(errorMessage);
              })
            }
        })

        if(formIsValid){
            navigate('/home');
        };
    };

    const navigater = () => {
        navigate('/signup');
    }

    return(
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='yellow' textAlign="center">
                    {/* <Image src=''/> */} Log-in
                </Header>
                <Form size="large" onSubmit={formSubmitHandler}>
                    <Segment stacked>
                        <input
                            type='text'
                            placeholder='E-mail address'
                            ref={emailRef}
                            style={{marginBottom: '4px'}}
                        />
                        {!email && <p>Wrong email input</p>}
                        <input
                            type='password'
                            placeholder='Password'
                            ref={passRef}
                            style={{marginBottom: '4px'}}
                        />
                        {!pass && <p>Password must be at least 7 numbers</p>}
                        <Button fluid color="yellow" size="large">
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New? <a href="#" onClick={navigater}>Sign up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
};

export default Login;