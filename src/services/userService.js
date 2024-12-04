import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = async () => {
  const response = await fetch("http://localhost:8080/api/v1/users/me", {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('csrfToken')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  
  return response.json();
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!localStorage.getItem('csrfToken'), // Only fetch if logged in
  });
};