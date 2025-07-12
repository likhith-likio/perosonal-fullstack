// src/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/api/users"

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: false,
    refetchOnWindowFocus: false, // optional: disable refetch when switching tabs
  })
}
