// Copied from "Forgot password" example in https://ui.mantine.dev/category/authentication/

import {Anchor, Box, Button, Center, Container, Group, Paper, Text, TextInput, Title} from "@mantine/core";

import {IconArrowLeft} from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import {useNavigate} from "react-router";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@example.com" required />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => navigate("/login")}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}

export const ForgotPassword = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  )
}