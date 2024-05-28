import RegisterForm from "./_components/registerForm";

export default function RegisterPage() {
  return (
    <div className="w-[90%] md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Register
      </h1>
      <RegisterForm />
    </div>
  )
}
