import QRCode from 'qrcode'

export const generateQrCode = ({ data = '' } = {}) => {
   // data must be string
  const qrcode = QRCode.toDataURL(JSON.stringify(data), {

    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark: '#010599FF',
      light: '#FFBF60FF',
    },
  })
  return qrcode
}
