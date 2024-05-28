import LoginForm from "./_components/loginForm";

export default function LoginPage() {
  return (
    <div className="w-1/2 md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Login
      </h1>
      <LoginForm />
    </div>
  )
}
