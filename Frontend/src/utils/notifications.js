import {notifications} from "@mantine/notifications";


export const successNotification = (title, message) => {
  notifications.show({
    title: title,
    message: message,
    color: 'green',
    autoClose: 5000,
    withBorder: true
  })
}

export const errorNotification = (title, message) => {
  notifications.show({
    title: title,
    message: message,
    color: 'red',
    autoClose: 5000,
    withBorder: true
  })
}