import {AppShell, Burger, Flex, Group, UnstyledButton, Text as MantineText} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useNavigate} from "react-router";
import {NavBarSimple} from "./NavBarSimple.jsx";
import {ThemeButton} from "./components/ThemeButton.jsx";
import {Router} from "./Router.jsx";

const App = () => {
  const [opened, {toggle}] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{height: 60}}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: {mobile: !opened},
      }}
      padding="md"
      footer={{height: 30}}
    >
      <AppShell.Header>
        <Group grow mx={10} my={8}>
          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <UnstyledButton ml={25} onClick={() => navigate("/")}>
              <MantineText fw={700}>Around Me</MantineText>
            </UnstyledButton>
          </Flex>
          <Flex
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <ThemeButton/>
          </Flex>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBarSimple/>
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
