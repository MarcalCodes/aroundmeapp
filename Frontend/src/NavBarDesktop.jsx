// Copied from https://ui.mantine.dev/component/navbar-simple/

import {useState} from 'react';
import {IconCalendarEvent, IconHeart, IconHome, IconLogin, IconLogout, IconMap, IconUser} from '@tabler/icons-react';
import {Button, Divider, Group} from '@mantine/core';
import classes from './NavBarDesktop.module.css';
import {useNavigate} from "react-router";
import axios from "axios";

const logout = async () => {
  try {
    await axios.post('http://localhost:3000/logout', {}, {
      withCredentials: true,
    });
    console.log('User logged out');
  } catch (err) {
    console.error('Logout failed:', err.message);
  }
};

const NavBarButton = ({navigate, active, setActive, link}) => {
  return (
    <Button
      p={4}
      m={0}
      component="a"
      size="compact"
      variant="transparent"
      leftSection={<link.icon className={classes.linkIcon} stroke={1.5}/>}
      data-active={link.label === active || undefined}
      href={link.path}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.label);
        navigate(link.path)
      }}
      className={classes.button}
    >
      <span>{link.label}</span>
    </Button>
  )
}

const LoginButton = ({navigate, setActive, active}) =>
  <NavBarButton
    navigate={navigate}
    setActive={setActive}
    active={active}
    link={{
      path: "/login",
      label: "Login",
      icon: IconLogin
    }}
  />

const SignUpButton = ({navigate, setActive, active}) =>
  <NavBarButton
    navigate={navigate}
    setActive={setActive}
    active={active}
    link={{
      path: "/sign-up",
      label: "Sign up",
      icon: IconUser
    }}
  />

const LogoutButton = ({navigate, setActive}) => {
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    setActive('Home');
    navigate('/');
  };

  return (
    <Button
      p={4}
      m={0}
      size="compact"
      variant="transparent"
      leftSection={<IconLogout className={classes.linkIcon} stroke={1.5}/>}
      onClick={handleLogout}
      className={classes.button}
    >
      <span>Logout</span>
    </Button>
  );
};

export const NavBarDesktop = ({links}) => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  const buttons = links.map((link) =>
    <NavBarButton
      key={link.label}
      navigate={navigate}
      setActive={setActive}
      active={active}
      link={link}
    />
  )

  return (
    <Group gap={1} visibleFrom="sm" wrap="nowrap">
      {buttons}
      <Divider mx={5} orientation="vertical"/>
      <LoginButton navigate={navigate} setActive={setActive} active={active}/>
      <SignUpButton navigate={navigate} setActive={setActive} active={active}/>
      <LogoutButton navigate={navigate} setActive={setActive}/>
    </Group>
  );
}
