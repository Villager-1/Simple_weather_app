import React, {useRef, useState} from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formIsValid, setFormIsValid] = useState();

    const emailRef = useRef();
    const passRef = useRef();
    const repassRef = useRef();

    const emailIsValid = (email) => {
        return email.includes('@') && email.includes('.com') && email.trim().length >= 8;
    }

    const passIsValid = (pass) => {
        return pass.trim().length > 8;
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passRef.current.value;
        const reenteredPass = repassRef.current.value;

        const emailValidity = emailIsValid(enteredEmail);
        const passValidity = passIsValid(enteredPass);
        const repassValidity = enteredPass === reenteredPass;

        if(emailValidity && passValidity && repassValidity){
            setFormIsValid(true);
        }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGWQMAfTpuIWFuweOPXLXu5e92Ryo3Atk',
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
        });
        if(formIsValid){
            navigate('/home');
        }

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
                            style={{marginBottom: '1rem'}}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            ref={passRef}
                            style={{marginBottom: '1rem'}}
                        />
                        <input
                            placeholder='Repeat Password'
                            type='password'
                            ref={repassRef}
                            style={{marginBottom: '1rem'}}
                        />
                        <Button color="yellow" fluid size="large">
                            Sign up
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
};

export default Signup;