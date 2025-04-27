// Copied from "Hero with background image" example in https://ui.mantine.dev/category/hero/#hero-image-background

import cx from 'clsx';
import {Button, Container, Overlay, Text, Title} from '@mantine/core';
import classes from './HeroImageBackground.module.css';

export const HeroImageBackground = () => {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1}/>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated AI code reviews for{' '}
          <Text component="span" inherit className={classes.highlight}>
            any stack
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained to detect lazy
            developers who do nothing and just complain on Twitter.
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