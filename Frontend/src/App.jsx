import {AppShell, Burger} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

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

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>  k</AppShell.Main>
      <AppShell.Footer>
        <div>
          © 2025 Around Me. All rights reserved.
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}

export default App
