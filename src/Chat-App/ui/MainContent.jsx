import Header from "../features/message/Header";
import InputBox from "../features/message/InputBox";
import MessageList from "../features/message/MessageList";

export default function MainContent() {
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <Header
          avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          name="Akash Ahmed"
        />
        <MessageList />
        <InputBox /> 
      </div>
    </div>
  );
}
