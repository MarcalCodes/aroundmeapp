// Copied from https://github.com/mantinedev/mantine/blob/a3b5452ca8ad04e8b49abbdd9922a53f631f3325/packages/%40docs/demos/src/shared/AuthenticationForm/AuthenticationForm.tsx
// Seen in Drawer documentation: https://mantine.dev/core/drawer/ (Just click on the "Open Drawer" button in the doc)

import {useState} from 'react';
import {IconAt, IconLock} from '@tabler/icons-react';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import classes from "../components/AuthenticationForm.module.css";

export const AuthenticationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setError('User with this email already exists');
    }, 3000);
  };

  return (
    <Container size={500} my={40}>
      <Title ta="center" className={classes.title}>
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate("/login")}>
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading}/>
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="Your first name"
              label="First name"
              {...form.getInputProps('firstName')}
            />

            <TextInput
              required
              placeholder="Your last name"
              label="Last name"
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            mt="md"
            required
            placeholder="Your email"
            label="Email"
            leftSection={<IconAt size={16} stroke={1.5}/>}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Password"
            label="Password"
            leftSection={<IconLock size={16} stroke={1.5}/>}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            mt="md"
            required
            label="Confirm Password"
            placeholder="Confirm password"
            leftSection={<IconLock size={16} stroke={1.5}/>}
            {...form.getInputProps('confirmPassword')}
          />

          <Checkbox
            mt="xl"
            label="I agree to sell my soul and privacy to this corporation"
            {...form.getInputProps('termsOfService', {type: 'checkbox'})}
          />

          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export const SignUp = () => {
  return (
    <AuthenticationForm/>
  )
}