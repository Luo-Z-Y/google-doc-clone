import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/SideBar";
import { database } from './config/Firebase';
import Editor from './pages/Editor';
import Notes from './pages/Notes';

export default function App() {
  return (
    <div className = 'App'> 
      <Router>
        <Sidebar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Notes" element={<Notes database={database} />} />
            <Route path="/Editor/:id" element={<Editor database={database} />} />
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
    </Router>
  </div>)
}

// import Docs from './components/Docs';
// import EditDocs from './components/EditDocs';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Docs database={database} />} />
//       <Route path="/editDocs/:id" element={<EditDocs database={database}/>} />
//     </Routes>
//   );
// }

// export default App;
