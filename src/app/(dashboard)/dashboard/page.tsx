import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import UserForm from "./_components/userForm";

export default async function DashboardPage() {
  const user = await getUserProps();

  return (
    <div className="px-12 h-full">
      <h1 className="text-4xl my-8 font-bold w-full text-center text-purple-500">Main Dashboard</h1>
      <UserForm user={user} />
    </div>
  );
}

async function getUserProps() {
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return user;
}

export type UserProps = Awaited<ReturnType<typeof getUserProps>>;
