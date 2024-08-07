import axiosClient from './axiosClient';

interface SendTextParams {
  text: string;
  oneTime: boolean;
}

const sendText = async ({ text, oneTime }: SendTextParams): Promise<string> => {
  const response = await axiosClient.post('/send-text', { text, oneTime });
  return response.data.link;
};

export default sendText;
