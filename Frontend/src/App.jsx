import {AppShell, Burger, Button, Flex, Group, Text as MantineText, UnstyledButton} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useNavigate} from "react-router";
import {ThemeButton} from "./components/ThemeButton.jsx";
import {Router} from "./Router.jsx";
import {NavBarMobile} from "./NavBarMobile.jsx";
import {NavBarDesktop} from "./NavBarDesktop.jsx";
import {IconCalendarEvent, IconHeart, IconHome, IconMap} from "@tabler/icons-react";

const links = [
  {path: '/', label: 'Home', icon: IconHome},
  {path: '/events', label: 'Events', icon: IconCalendarEvent},
  {path: '/areas', label: 'Areas', icon: IconMap},
  {path: '/subscriptions', label: 'Subscriptions', icon: IconHeart},
];


const App = () => {
  const [opened, {toggle}] = useDisclosure();
  const navigate = useNavigate();

  return (
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
            <NavBarDesktop links={links} />
            <ThemeButton/>
          </Flex>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBarMobile links={links} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Router/>
      </AppShell.Main>
      <AppShell.Footer>
        <div>
          © 2025 Around Me. All rights reserved.
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}

export default App
