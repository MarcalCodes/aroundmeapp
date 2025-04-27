// Copied from "Hero with background image" example in https://ui.mantine.dev/category/hero/#hero-image-background

import {ActionIcon, Container, Overlay, Text, TextInput, Title} from '@mantine/core';
import classes from './HomePageHero.module.css';
import {IconArrowRight, IconSearch} from "@tabler/icons-react";

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
          <TextInput
            placeholder="Enter the name or postcode of your area"
            size="xl"
            radius="xl"
            inputSize={60}
            leftSection={<IconSearch/>}
            rightSection={
              // Copied from "Input with contained button" example in https://ui.mantine.dev/category/inputs/
              <ActionIcon size={32} radius="xl" color="blue" variant="filled">
                <IconArrowRight size={18} stroke={1.5}/>
              </ActionIcon>
            }
            classNames={{
              input: classes.input // See https://mantine.dev/core/text-input/#styles-api
            }}
          />
        </div>
      </div>
    </div>
  );
}
