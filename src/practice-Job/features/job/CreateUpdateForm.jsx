import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewJob,
  initializeCreateJobStatus,
  selectCreateJobState,
} from "./jobSlice";
import { useNavigate } from "react-router-dom";

const jobOptions = [
  { value: "", label: "Select Job", initial: true },
  { value: "software-engineer", label: "Software Engineer" },
  { value: "software-developer", label: "Software Developer" },
  { value: "full-stack-developer", label: "Full Stack Developer" },
  { value: "mern-stack-developer", label: "MERN Stack Developer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "social-media-manager", label: "Social Media Manager" },
  { value: "senior-executive", label: "Senior Executive" },
  { value: "junior-executive", label: "Junior Executive" },
  { value: "android-app-developer", label: "Android App Developer" },
  { value: "ios-app-developer", label: "IOS App Developer" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "frontend-engineer", label: "Frontend Engineer" },
];

const jobTypes = [
  { value: "", label: "Select Job Type", initial: true },
  { value: "full-time", label: "Full Time" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

export default function CreateUpdateForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState(0);
  const [deadline, setDeadline] = useState("");

  const { isCreating, status } = useSelector(selectCreateJobState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (status === "success") {
        navigate("/jobs");
        dispatch(initializeCreateJobStatus());
      }
    },
    [status]
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createNewJob({ title, type, salary, deadline }));
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="fieldContainer">
          <label
            htmlFor="lws-JobTitle"
            className="text-sm font-medium text-slate-300"
          >
            Job Title
          </label>
          <Select
            options={jobOptions}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="lws-JobTitle"
            name="lwsJobTitle"
            required
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobType">Job Type</label>
          <Select
            options={jobTypes}
            value={type}
            onChange={(e) => setType(e.target.value)}
            id="lws-JobType"
            name="lwsJobType"
            required
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobSalary">Salary</label>
          <div className="flex border rounded-md shadow-sm border-slate-600">
            <span className="input-tag">BDT</span>
            <input
              type="number"
              name="lwsJobSalary"
              id="lws-JobSalary"
              required
              onFocus={(e) => e.target.select()}
              className="!rounded-l-none !border-0"
              placeholder="20,00,000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobDeadline">Deadline</label>
          <input
            type="date"
            name="lwsJobDeadline"
            id="lws-JobDeadline"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            id="lws-submit"
            className="cursor-pointer btn btn-primary w-fit"
          >
            {isCreating ? "creating" : "submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
