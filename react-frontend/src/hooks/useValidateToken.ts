import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { decryptToken } from '@/utils/crypto'

export const useValidateToken = () => {
  const encrypted = localStorage.getItem('token')
  const token = encrypted ? decryptToken(encrypted) : null

  return useQuery({
    queryKey: ['validate-token'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const res = await axios.get('http://localhost:5000/api/validate-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    enabled: !!token, // Don't run if token is missing
    retry: false,
  })
}
