import {isNotEmpty, useForm} from "@mantine/form";
import {isAusPostcode, isAusState} from "../utils/validations.js";
import {Autocomplete, CloseButton, Group, Text, TextInput} from "@mantine/core";
import {AustraliaStates} from "../utils/australia.js";
import {DateTimePicker} from "@mantine/dates";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";

/**
 * Form & Dropzone usage example: https://help.mantine.dev/q/how-to-use-dropzone-with-form
 * See als Dropzone doc: https://mantine.dev/x/dropzone/
 */
const ImageDropzone = ({form}) => {
  const image = form.getValues().image
  const error = form.errors.image

  return (
    <>
      <Text>Event image</Text>
      {!image &&
        <Dropzone
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          onDrop={(images) => form.setFieldValue('image', images[0])}
          onReject={() => form.setFieldError('image', 'Select images only')}
        >
          <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
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
          <Text mb={5} mt="md">
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
    </>
  )
}

export const EventCreate = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      eventName: '',
      addressLine1: '',
      addressLine2: '',
      addressPostcode: '',
      addressCity: '',
      addressState: '',
      startAt: undefined,
      endsAt: undefined,
      image: undefined
    },

    validate: {
      eventName: isNotEmpty(),
      addressLine1: isNotEmpty(),
      addressLine2: (value) => null, // No validation
      addressPostcode: (value) => isAusPostcode(value),
      addressCity: isNotEmpty(),
      addressState: (value) => isAusState(value),
      startAt: isNotEmpty(),
      endsAt: isNotEmpty(),
      image: isNotEmpty()
    },
  });

  const handleFormSubmit = (values) => {
    console.log(values)
  }


  return (
    <>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <TextInput
          withAsterisk
          label="Event name"
          key={form.key('eventName')}
          {...form.getInputProps('eventName')}
        />

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

        <DateTimePicker
          withAsterisk
          label="Starts at"
          placeholder="Pick date and time"
          key={form.key('startAt')}
          {...form.getInputProps('startAt')}
          valueFormat="DD MMM YYYY hh:mm A"
        />

        <DateTimePicker
          withAsterisk
          label="Ends at"
          placeholder="Pick date and time"
          key={form.key('endsAt')}
          {...form.getInputProps('endsAt')}
          valueFormat="DD MMM YYYY hh:mm A"
        />

        <ImageDropzone form={form}/>
      </form>
    </>
  )
}