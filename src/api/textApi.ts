import axiosClient from './axiosClient';

interface SendTextParams {
  text: string;
  oneTime: boolean;
  shortCode: boolean;
}

export const sendText = async ({ text, oneTime, shortCode }: SendTextParams): Promise<[string, string]> => {
  const response = await axiosClient.post('/text/', { text, oneTime, shortCode });
  const textId = response.data.id;
  const code = response.data.short_code;
  return [`${window.location.origin}/get/${textId}`, code];
};

export const fetchText = async (textId: string): Promise<string> => {
  const response = await axiosClient.get(`/text/${textId}`);
  return response.data.text;
};

export const fetchTextByCode = async (shortCode: string): Promise<string> => {
  const response = await axiosClient.get(`/text/by-code/${shortCode}`);
  return response.data.text;
};