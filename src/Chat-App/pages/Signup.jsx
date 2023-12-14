import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

export default function Signup() {
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Logo />
            <Heading as="h2" className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Yout Account</Heading>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
