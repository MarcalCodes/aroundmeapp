// Copied from https://ui.mantine.dev/component/navbar-simple/

import {useState} from 'react';
import {IconCalendarEvent, IconHome, IconLogin, IconLogout, IconMap,} from '@tabler/icons-react';
import {AppShell, ScrollArea} from '@mantine/core';
import classes from './NavbarSimple.module.css';
import {useNavigate} from "react-router";

const data = [
  {link: '/', label: 'Home', icon: IconHome},
  {link: '/events', label: 'Events', icon: IconCalendarEvent},
  {link: '/areas', label: 'Areas', icon: IconMap},
];

export const NavBarSimple = () => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  // TODO: Implement
  const logout = () => {}

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5}/>
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <AppShell.Section grow component={ScrollArea}>
        {links}
      </AppShell.Section>

      <AppShell.Section className={classes.footer}>
        <a href="/login" className={classes.link} onClick={(event) => {
          event.preventDefault()
          navigate("/login")
        }}>
          <IconLogin className={classes.linkIcon} stroke={1.5}/>
          <span>Login</span>
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
