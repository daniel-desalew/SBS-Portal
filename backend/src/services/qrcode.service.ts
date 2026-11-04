import QRCode from 'qrcode';

export const createQrDataUrl = (value: string): Promise<string> =>
  QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: 1 });