import { CardWithForm } from "~/components/ui/card-with-form";
import { db } from "~/server/db";

export default async function HomePage() {
  const users = await db.query.user.findMany();

  console.log("users: ", users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Bank <span className="text-[hsl(280,100%,70%)]">Stack</span> App
        </h1>
        <CardWithForm />
      </div>
    </main>
  );
}
