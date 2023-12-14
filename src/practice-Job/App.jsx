import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './styles.css';

import AppLayout from "./ui/AppLayout";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import UpdateJob from "./pages/UpdateJob";

export default function App() {   
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="jobs" replace />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/new" element={<CreateJob />} />
          <Route path="jobs/:id/update" element={<UpdateJob />} />
        </Route>
        <Route path="*" element={<h2>Page Not Found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
