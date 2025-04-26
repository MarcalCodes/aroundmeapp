import {AppShell, Burger, Flex, Group, UnstyledButton} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Route, Routes, useNavigate} from "react-router";
import {Home} from "./pages/Home.jsx"
import {Login} from "./pages/Login.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {NavBarSimple} from "./NavBarSimple.jsx";
import {ThemeButton} from "./components/ThemeButton.jsx";

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
            <UnstyledButton onClick={() => navigate("/")}>Around Me</UnstyledButton>
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
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>

          <Route path='*' element={<NotFound/>}/>
        </Routes>
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
