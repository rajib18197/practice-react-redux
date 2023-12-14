import { useSearchParams } from "react-router-dom";

export function useGetUrl(field) {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(field);
  return value;
}

export function useSetUrl(field, value) {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.set(field, value);
  setSearchParams(searchParams);
}
