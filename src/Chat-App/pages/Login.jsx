import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

export default function Login() {
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Logo />
            <Heading
              as="h2"
              className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            >
              Sign in to Your Account
            </Heading>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
