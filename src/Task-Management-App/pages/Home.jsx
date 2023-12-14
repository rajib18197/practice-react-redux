import AddTask from "../features/tasks/AddTask";
import TaskList from "../features/tasks/TaskList";
import Main from "../ui/Main";
import Sidebar from "../ui/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <Main>
          <AddTask />
          <TaskList />
        </Main>
      </div>
    </>
  );
}
