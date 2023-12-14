import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { addFilters, removeFilter } from "./projectsSlice";

export default function ProjectItem({ project}) {
  const [isChecked, setIsChecked] = useState(true);
  
  const { id, projectName, colorClass } = project;
  const dispatch = useDispatch();
  
  function handleChecked(e){
    setIsChecked(e.target.checked);

    if(isChecked) {
      dispatch(addFilters(id))
    }else{
      dispatch(removeFilter(id))
    }
  }

  return (
    <div class="checkbox-container">
      <input
        type="checkbox"
        className={`${colorClass}`}
        checked={isChecked}
        onChange={handleChecked}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}
