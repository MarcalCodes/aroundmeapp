// Copied from "Hero with background image" example in https://ui.mantine.dev/category/hero/#hero-image-background

import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ActionIcon,
  Container,
  Overlay,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import classes from "./HomePageHero.module.css";

export const HomePageHero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/areas?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" backgroundOpacity={0.20} zIndex={1} />

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
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Enter the name or postcode of your area"
            size="xl"
            radius="xl"
            inputSize={60}
            leftSection={<IconSearch />}
            rightSection={
              // Copied from "Input with contained button" example in https://ui.mantine.dev/category/inputs/

              <ActionIcon
                size={32}
                radius="xl"
                color="blue"
                variant="filled"
                onClick={handleSearch}
              >
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            classNames={{ input: classes.input }} // See https://mantine.dev/core/text-input/#styles-api
          />
        </div>
      </div>
    </div>
  );
};
