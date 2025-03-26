import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import ResourceDetails from "./pages/ResourceDetails";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import AddResource from "./pages/AddResource";
import EditProject from "./pages/EditProject";
import EditTask from "./pages/EditTask"
import EditResource from "./pages/EditResource"
import Footer from "./components/Footer";
import "./index.css";

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow container max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<AddProject />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:projectId/edit" element={<EditProject />} />
          <Route path="/projects/:projectId/tasks/new" element={<AddTask />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
          <Route path="/tasks/:taskId/resources/new" element={<AddResource />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
          <Route path="/resources/:id/edit" element={<EditResource/>} />
        </Routes>
      </main>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Footer />
    </div>
  </Router>
);

export default App;
