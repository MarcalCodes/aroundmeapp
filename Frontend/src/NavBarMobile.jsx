// Copied from https://ui.mantine.dev/component/navbar-simple/

import {useState} from 'react';
import {IconLogin, IconLogout, IconUser} from '@tabler/icons-react';
import {AppShell, ScrollArea} from '@mantine/core';
import classes from './NavBarMobile.module.css';
import {useNavigate} from "react-router";

export const NavBarMobile = ({links}) => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  // TODO: Implement
  const logout = () => {}

  const elements = links.map((link) => (
    <a
      className={classes.link}
      data-active={link.label === active || undefined}
      href={link.path}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.label);
        navigate(link.path)
      }}
    >
      <link.icon className={classes.linkIcon} stroke={1.5}/>
      <span>{link.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <AppShell.Section grow component={ScrollArea}>
        {elements}
      </AppShell.Section>

      <AppShell.Section className={classes.footer}>
        <a href="/login" className={classes.link} onClick={(event) => {
          event.preventDefault()
          navigate("/login")
        }}>
          <IconLogin className={classes.linkIcon} stroke={1.5}/>
          <span>Login</span>
        </a>
        <a href="/sign-up" className={classes.link} onClick={(event) => {
          event.preventDefault()
          navigate("/sign-up")
        }}>
          <IconUser className={classes.linkIcon} stroke={1.5}/>
          <span>Create an account</span>
        </a>
        <a href="/logout" className={classes.link} onClick={(event) => {
          event.preventDefault()
          logout()
          navigate("/")
        }}>
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </a>
      </AppShell.Section>
    </nav>
  );
}
