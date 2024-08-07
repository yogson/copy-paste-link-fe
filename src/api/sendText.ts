import axiosClient from './axiosClient';

interface SendTextParams {
  text: string;
  oneTime: boolean;
}

const sendText = async ({ text, oneTime }: SendTextParams): Promise<string> => {
  const response = await axiosClient.post('/text/', { text, oneTime });
  const textId = response.data.id;
  return `${window.location.origin}/get/${textId}`;
};

export default sendText;
