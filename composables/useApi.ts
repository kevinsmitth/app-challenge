import type { UseFetchOptions } from "#app";

export const useApi = (path: string, options: UseFetchOptions<any> = {}) => {
  let headers: any = {};
  const token = useCookie("XSRF-TOKEN");

  if (token) {
    headers = {
      headers: {
        "X-XSRF-TOKEN": token.value as string,
      },
    };
  }

  return useFetch("http://localhost/" + path, {
    credentials: "include",
    watch: false,
    ...options,
    ...headers,
    ...options?.headers,
  });
};

export function useGet(path: string, options: UseFetchOptions<any> = {}) {
  return useApi(path, {
    method: "get",
    ...options,
  });
}

export function usePost(path: string, options: UseFetchOptions<any> = {}) {
  return useApi(path, {
    method: "post",
    ...options,
  });
}

export function usePut(path: string, options: UseFetchOptions<any> = {}) {
  return useApi(path, {
    method: "put",
    ...options,
  });
}

export function useDelete(path: string, options: UseFetchOptions<any> = {}) {
  return useApi(path, {
    method: "delete",
    ...options,
  });
}
