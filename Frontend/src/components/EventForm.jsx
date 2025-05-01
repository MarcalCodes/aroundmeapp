import {isNotEmpty, useForm} from "@mantine/form";
import {isAusPostcode, isAusState} from "../utils/validations.js";
import {
  Autocomplete,
  Button,
  Center,
  CloseButton,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import {AustraliaStates} from "../utils/australia.js";
import {DateTimePicker} from "@mantine/dates";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import {DEFAULT_DATE_FORMAT} from "../utils/dates.js";
import {imageToBase64} from "../utils/images.js";

/**
 * Form & Dropzone usage example: https://help.mantine.dev/q/how-to-use-dropzone-with-form
 * See als Dropzone doc: https://mantine.dev/x/dropzone/
 */
const ImageDropzone = ({form}) => {
  const image = form.getValues().image
  const error = form.errors.image
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Stack gap={2}>
      <Text size="sm" fw={500}>Event image</Text>
      {!image &&
        <Dropzone
          h={mobile ? 200 : 100}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          onDrop={(images) => form.setFieldValue('image', images[0])}
          onReject={() => form.setFieldError('image', 'Select images only')}
        >
          <Group justify="center" gap="xl" mih={65} style={{pointerEvents: 'none'}}>
            <Dropzone.Accept>
              <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5}/>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5}/>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5}/>
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag image here or click to select file
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                File size should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      }

      {error && (
        <Text c="red" mt={5}>
          {error}
        </Text>
      )}

      {image && (
        <>
          <Text mb={5}>
            Selected image:
          </Text>
          <Text key={image.name}>
            <b>{image.name}</b> ({(image.size / 1024).toFixed(2)} kb)
            <CloseButton
              size="xs"
              onClick={() => form.setFieldValue('image', undefined)}
            />
          </Text>
        </>
      )}
    </Stack>
  )
}

export const EventForm = ({title, buttonText, initialValues, handleFormSubmit}) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: {
      title: isNotEmpty(),
      addressLine1: isNotEmpty(),
      addressLine2: (value) => null, // No validation
      addressPostcode: (value) => isAusPostcode(value),
      addressCity: isNotEmpty(),
      addressState: (value) => isAusState(value),
      startsAt: isNotEmpty(),
      endsAt: isNotEmpty(),
      image: isNotEmpty()
    },
  });

  const doSubmit = async (values) => {
    const encodedImage = await imageToBase64(values.image)
    handleFormSubmit({...values, image: encodedImage})
  }

  const onError = (error) => {
    console.log("onError", error)
  }

  return (
    <Container size={500} my={40}>
      <Center>
        <Title order={1} mb={20}>{title}</Title>
      </Center>
      <form onSubmit={form.onSubmit(doSubmit, onError)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Event name"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />

          <Stack gap={5}>
            <TextInput
              withAsterisk
              label="Address"
              placeholder="Line 1 *"
              key={form.key('addressLine1')}
              {...form.getInputProps('addressLine1')}
            />
            <TextInput
              placeholder="Line 2"
              key={form.key('addressLine2')}
              {...form.getInputProps('addressLine2')}
            />
            <TextInput
              withAsterisk
              placeholder="Postcode *"
              key={form.key('addressPostcode')}
              {...form.getInputProps('addressPostcode')}
            />
            <TextInput
              withAsterisk
              placeholder="City *"
              key={form.key('addressCity')}
              {...form.getInputProps('addressCity')}
            />
            <Autocomplete
              withAsterisk
              placeholder="State *"
              key={form.key('addressState')}
              {...form.getInputProps('addressState')}
              data={Array.from(AustraliaStates).sort()}
            />
          </Stack>

          <DateTimePicker
            withAsterisk
            label="Starts at"
            placeholder="Pick date and time"
            key={form.key('startsAt')}
            {...form.getInputProps('startsAt')}
            valueFormat={DEFAULT_DATE_FORMAT}
          />

          <DateTimePicker
            withAsterisk
            label="Ends at"
            placeholder="Pick date and time"
            key={form.key('endsAt')}
            {...form.getInputProps('endsAt')}
            valueFormat={DEFAULT_DATE_FORMAT}
          />

          <ImageDropzone form={form}/>

          <Button fullWidth mt="xl" type="submit">{buttonText}</Button>
        </Stack>
      </form>
    </Container>
  )
}