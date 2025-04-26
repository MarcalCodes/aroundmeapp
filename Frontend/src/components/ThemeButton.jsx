// Copied from https://mantine.dev/theming/color-schemes/#color-scheme-value-caveats

import {ActionIcon, useComputedColorScheme, useMantineColorScheme} from '@mantine/core';
import {IconMoon, IconSun} from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ThemeButton.module.css';

export const ThemeButton = () => {
  const {setColorScheme} = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('auto', {getInitialValueInEffect: true});

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5}/>
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5}/>
    </ActionIcon>
  );
}