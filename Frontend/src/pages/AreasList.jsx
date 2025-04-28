import {Container, Title, Table, useMantineTheme, Checkbox, Group, ScrollArea, Text} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {useState} from "react";
import cx from 'clsx';
import classes from './AreasList.module.css'

const fakeAllAreas = [
  { suburb: "Forster", postcode: "2428", state: "NSW", subscribed: 10 },
  { suburb: "St Kilda", postcode: "3182", state: "VIC", subscribed: 10 },
  { suburb: "New Farm", postcode: "4005", state: "QLD", subscribed: 10 },
  { suburb: "Glenelg", postcode: "5045", state: "SA", subscribed: 10 },
  { suburb: "Fremantle", postcode: "6160", state: "WA", subscribed: 10 },
  { suburb: "Battery Point", postcode: "7004", state: "TAS", subscribed: 10 },
  { suburb: "Nightcliff", postcode: "0810", state: "NT", subscribed: 10 },
  { suburb: "Kingston", postcode: "2604", state: "ACT", subscribed: 10 },
  { suburb: "Byron Bay", postcode: "2481", state: "NSW", subscribed: 10 },
  { suburb: "South Yarra", postcode: "3141", state: "VIC", subscribed: 10 },
  { suburb: "Paddington", postcode: "4064", state: "QLD", subscribed: 10 },
  { suburb: "Henley Beach", postcode: "5022", state: "SA", subscribed: 10 },
  { suburb: "Cottesloe", postcode: "6011", state: "WA", subscribed: 10 },
  { suburb: "Sandy Bay", postcode: "7005", state: "TAS", subscribed: 10 },
  { suburb: "Palmerston", postcode: "0830", state: "NT", subscribed: 10 },
  { suburb: "Braddon", postcode: "2612", state: "ACT", subscribed: 10 },
  { suburb: "Manly", postcode: "2095", state: "NSW", subscribed: 10 },
  { suburb: "Richmond", postcode: "3121", state: "VIC", subscribed: 10 },
  { suburb: "Toowong", postcode: "4066", state: "QLD", subscribed: 10 },
  { suburb: "Norwood", postcode: "5067", state: "SA", subscribed: 10 }
]

const fakeSubscribedAreas = [
  "2428",
  "2095",
  "5067"
]

/**
 * Table copied from "Table with selection" example in https://ui.mantine.dev/category/tables/
 */
export const AreasList = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [subscriptions, setSubscriptions] = useState(fakeSubscribedAreas);
  const subscribe = (postcode) =>
    setSubscriptions((current) =>
      current.includes(postcode) ? current.filter((item) => item !== postcode) : [...current, postcode]
    );

  const rows = fakeAllAreas.map((area, index) => {
    const selected = subscriptions.includes(area.postcode);
    return (
      <Table.Tr key={index} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={subscriptions.includes(area.postcode)} onChange={() => subscribe(area.postcode)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>{area.suburb}</Text>
          </Group>
        </Table.Td>
        <Table.Td>{area.postcode}</Table.Td>
        <Table.Td>{area.state}</Table.Td>
        <Table.Td>{area.subscribed}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container fluid my={10} mx={20}>
      <Title order={mobile ? 2 : 1} mb={50}>My Areas</Title>

      <ScrollArea>
        <Table miw={300} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}></Table.Th>
              <Table.Th>Suburb</Table.Th>
              <Table.Th>Postcode</Table.Th>
              <Table.Th>State</Table.Th>
              <Table.Th># of Subscribers</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  )
}