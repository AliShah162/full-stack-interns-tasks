import Image from "next/image";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>hello</h1>
      <AddTodo/>
      <Todos/>
    </div>
  );
}
