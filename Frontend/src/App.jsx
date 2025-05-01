import {AppShell, Burger, Flex, Group, Text as MantineText, UnstyledButton} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useNavigate} from "react-router";
import {ThemeButton} from "./components/ThemeButton.jsx";
import {Router} from "./Router.jsx";
import {NavBarMobile} from "./NavBarMobile.jsx";
import {NavBarDesktop} from "./NavBarDesktop.jsx";
import {IconCalendarEvent, IconHome, IconMap} from "@tabler/icons-react";
import {useState} from "react";
import axios from "axios";
import {errorNotification, successNotification} from "./utils/notifications.js";
import {AreasProvider} from "./context/AreasProvider.jsx";


const allLinks = [
  {path: '/', label: 'Home', icon: IconHome, requireLogin: false},
  {path: '/events', label: 'My Events', icon: IconCalendarEvent, requireLogin: true},
  {path: '/areas', label: 'My Areas', icon: IconMap, requireLogin: true},
];


const App = () => {
  const [opened, {toggle}] = useDisclosure();
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  const isLoggedIn = user !== undefined

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, {withCredentials: true});
      setUser(undefined)
      successNotification("See you soon!")
    } catch (err) {
      console.error("Logout failed:", err);
      errorNotification("Something went wrong!")
    }
  };

  const links = allLinks.filter((link) => link.requireLogin && !isLoggedIn ? false : true)

  return (
    <AreasProvider isLoggedIn={isLoggedIn}>
      <AppShell
        header={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
        footer={{height: 30}}
      >
        <AppShell.Header>
          <Group grow mx={10} my={8}>
            <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
              <UnstyledButton onClick={() => navigate("/")}>
                <MantineText fw={700}>Around Me</MantineText>
              </UnstyledButton>
            </Flex>
            <Flex gap="xs" justify="flex-end" direction="row" wrap="nowrap">
              <NavBarDesktop links={links} isLoggedIn={isLoggedIn} logout={logout}/>
              <ThemeButton/>
            </Flex>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavBarMobile links={links} isLoggedIn={isLoggedIn} logout={logout}/>
        </AppShell.Navbar>

        <AppShell.Main>
          <Router isLoggedIn={isLoggedIn} user={user} setUser={setUser}/>
        </AppShell.Main>
        <AppShell.Footer>
          <Flex justify="center" align="center">
            <MantineText size="sm" ta="center">© 2025 Around Me. All rights reserved.</MantineText>
          </Flex>
        </AppShell.Footer>

      </AppShell>
    </AreasProvider>
  );
}

export default App
