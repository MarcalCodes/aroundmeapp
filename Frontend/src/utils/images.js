/**
 * Comes from https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/
 */
export const imageToBase64 = async (file) => {
  return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')

        resolve(base64String)
      };

      reader.readAsDataURL(file)
    }
  )
}