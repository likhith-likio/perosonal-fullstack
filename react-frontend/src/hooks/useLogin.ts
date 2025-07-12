import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await axios.post('http://localhost:5000/api/login', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data; // should return token
    },
  });
};
