// Copied from "Authentication form with title" example in https://ui.mantine.dev/category/authentication/

import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import classes from './AuthenticationForm.module.css';
import {useNavigate} from "react-router";

export const AuthenticationForm = () => {
  const navigate = useNavigate();

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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@example.com" required/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me"/>
          <Anchor component="button" size="sm" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
