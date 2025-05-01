// Copied from "Authentication form with title" example in https://ui.mantine.dev/category/authentication/


import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title} from '@mantine/core';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import classes from './AuthenticationForm.module.css';
import {errorNotification, successNotification} from "../utils/notifications.js";
import axios from "axios";

export const AuthenticationForm = ({setUser}) => {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/login',
        {email, password},
        {withCredentials: true}
      );
      setUser(res.data)
      successNotification('Login successful')
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || err.message
      console.error('Login failed:', message);
      errorNotification('Login failed', message)
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate("/sign-up")}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={handleLogin}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me"/>
          <Anchor component="button" size="sm" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </Anchor>
        </Group>

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};
