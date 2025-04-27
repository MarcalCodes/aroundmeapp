// Copied from "Hero with background image" example in https://ui.mantine.dev/category/hero/#hero-image-background

import cx from 'clsx';
import {Button, Container, Overlay, Text, Title} from '@mantine/core';
import classes from './HomePageHero.module.css';

export const HomePageHero = () => {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" backgroundOpacity={0.20} zIndex={1}/>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Around{' '}
          <Text component="span" inherit className={classes.highlight}>
            Me
          </Text>
        </Title>

        <Container size={640}>
          <Text size="xl" fw={700} className={classes.description}>
            Participate in events organised by your local communities
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            Get started
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
            Live demo
          </Button>
        </div>
      </div>
    </div>
  );
}
