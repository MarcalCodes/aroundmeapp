import {AppShell, Burger, ScrollArea} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Route, Routes} from "react-router";
import {Home} from "./pages/Home.jsx"
import {Login} from "./pages/Login.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {NavBarSimple} from "./NavBarSimple.jsx";

const App = () => {
  const [opened, {toggle}] = useDisclosure();

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
        <div>Around Me</div>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBarSimple />
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path='*' element={<NotFound />} />
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
