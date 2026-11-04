export const sendSms = async (recipient: string, message: string): Promise<void> => {
  if (!process.env.SMS_PROVIDER_URL || !process.env.SMS_API_TOKEN) {
    throw new Error('SMS delivery is not configured');
  }

  const response = await fetch(process.env.SMS_PROVIDER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SMS_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to: recipient, message }),
  });

  if (!response.ok) {
    throw new Error(`SMS provider returned HTTP ${response.status}`);
  }
};