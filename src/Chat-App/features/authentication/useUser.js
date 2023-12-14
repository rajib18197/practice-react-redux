import { useGetLoggedInUserQuery } from "./userApi";

export function useUser() {
  const email = JSON.parse(localStorage.getItem("user"))?.user?.email;

  const { data: currentUser, isLoading: isChecking } = useGetLoggedInUserQuery(
    email,
    { skip: !email }
  );

  console.log(currentUser, email, isChecking);

  if (!email) return { isLoading: false, user: null, isAuthenticated: false };

  if (currentUser?.[0]) {
    return {
      isLoading: false,
      user: { ...currentUser[0] },
      isAuthenticated: true,
    };
  }

  // when there is email but current User data is not in the cache.
  return {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  };
}
