import axiosClient from './axiosClient';

interface SendTextParams {
  text: string;
  oneTime: boolean;
}

export const sendText = async ({ text, oneTime }: SendTextParams): Promise<string> => {
  const response = await axiosClient.post('/text/', { text, oneTime });
  const textId = response.data.id;
  return `${window.location.origin}/get/${textId}`;
};

export const fetchText = async (textId: string): Promise<string> => {
  const response = await axiosClient.get(`/text/${textId}`);
  return response.data.text;
};
