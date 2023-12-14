import Blank from "../ui/Blank";
import Sidebar from "../ui/Sidebar";

export default function Conversations() {
  return (
    <>
      <Sidebar />
      <div className="w-full lg:col-span-2 lg:block">
        <div className="w-full grid conversation-row-grid">
          <Blank />
        </div>
      </div>
    </>
  );
}
