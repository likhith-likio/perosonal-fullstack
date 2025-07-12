import axios from "axios"
import { decryptToken } from "@/utils/crypto"

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  dob: string
  created_at: string
  updated_at: string
}

export const fetchUsers = async (): Promise<User[]> => {
  const encrypted = localStorage.getItem("token")
  if (!encrypted) throw new Error("No token")

  const token = decryptToken(encrypted)

  const res = await axios.get("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
