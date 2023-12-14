import { useSelector } from "react-redux";
import { Heading } from "./ConfigurationBox";
import { selectDiarySlice } from "./diarySlice";

export default function NoteBook() {
  const { diaryName } = useSelector(selectDiarySlice);

  return (
    <div>
      <Heading>{diaryName}</Heading>
    </div>
  );
}
