import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authenticationApi";
import { useEffect, useState } from "react";
import Error from "../../ui/Error";
import { useGetLoggedInUserQuery } from "./userApi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [login, { data, isLoading: isLoggingIn, error: responseError }] =
  useLoginMutation();
  const navigate = useNavigate();
  console.log(data, isLoggingIn, responseError);

  useEffect(
    function () {
      console.log(data, isLoggingIn, responseError);
      if (data?.accessToken && data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: data.accessToken,
            user: {...data.user},
          })
        );

        navigate("/conversations");
      }

      if (responseError) {
        setError(responseError.message);
      }
    },
    [data, responseError]
  );

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
            Forgot your password?
          </a>
          <Link to={"/signup"}>Sign up</Link>
          <Link to={"/conversations"}>inbox</Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoggingIn ? "Signing in" : "Sign in"}
        </button>
      </div>

      {error && <Error message={error} />}
    </form>
  );
}
