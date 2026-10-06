import { useState } from "react";
import "./App.css";
import { Menu } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title:"Design login page", desc:"Create a responsive login page for for the web page", assignee:"John Doe", due:"Apr 25, 2025", priority: "High", status:"To Do", done: false},

     {id: 2, title:"Build API endpoints", desc:"Implement the user and task endpoints", assignee:"Alice Smith", due:"Apr 22, 2025", priority: "Medium", status:"In progress", done: true},

      {id: 3, title:"Update task UI", desc:"Improve the task card design and animations", assignee:"John Doe", due:"Apr 20, 2025", priority: "Low", status:"Completed", done: true},

       {id: 4, title:"Fix search functionality", desc:"Resolve the issue with task search", assignee:"Mike Johnson", due:"Apr 28, 2025", priority: "High", status:"To Do", done: false},

       {id: 5, title:"Write Documentation", desc:"Add setup and usage instructions", assignee:"Alice Smith", due:"Apr 30, 2025", priority: "Medium", status:"Pending", done: false},

       {id: 6, title:"Conduct code review", desc:"Review pull request and provide feedback", assignee:"Mike Johnson", due:"Apr 23, 2025", priority: "Medium", status:"Completed", done: true},

       {id: 7, title:"Deploy to production", desc:"Push the latest changes to production", assignee:"John Doe", due:"May 2, 2025", priority: "High", status:"In progress", done: false},

       {id: 8, title:"Plan next sprint", desc:"Discuss and prioritize upcoming tasks", assignee:"Alice Smith", due:"May 5, 2025", priority: "Low", status:"Pending", done: false},
  ])

      const [showForm, setShowForm] = useState(false);
      const [newTitle, setNewTitle] = useState("");
      const [newAssignee, setNewAssignee] = useState("");
      const [newPriority, setNewPriority] = useState("Medium");
      const [newStatus, setNewStatus] = useState("To Do");

      const [activeFilter, setActiveFilter]= useState("All");
      const [search, setSearch]=useState("");
      const [menuOpen, setMenuOpen] = useState(false);

      function toggleTask(id){
        setTasks(
          tasks.map((task) => task.id === id ? {...task, done: !task.done, status:!task.done ? "Completed" : "To Do"} :task)

        );
      }


            function addTask() {
        const newTask = {
          id: Date.now(),
          title: newTitle,
          desc: "",
          assignee: newAssignee,
          due: "TBD",
          priority: newPriority,
          status: newStatus,
          done: false,
        };

        setTasks([...tasks, newTask]);

        setNewTitle("");
        setNewAssignee("");
        setNewPriority("Medium");
        setNewStatus("To Do");
        setShowForm(false);
      }

      const visibleTask = tasks.filter((task) => {
        const matchesFilter = activeFilter === "All" || task.status === activeFilter;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      }
       
    );

      const total = tasks.length;
      const completed = tasks.filter((task) => task.status === "Completed").length;
      const inProgress = tasks.filter((task) => task.status === "In progress").length;
      const pending = tasks.filter((task) => task.status === "Pending" ).length;

  return(
    <div className="dashboard"style={{display:"flex"}}>

     <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}
      style={{ 
        background: "#0f172a", 
        color: "white",
         padding: "16px" }}>

        <h2 style={{marginBottom:"24px"}}>Task Track</h2>
        <nav>
          <p className="nav-item" style={{background:"blue", borderRadius:"8px", padding:"8px"}}>🏠Home</p>
          <p className="nav-item" style={{padding:"8px"}}>📒My Task</p>
          <p className="nav-item" style={{padding:"8px"}}>🧑‍🦱Assigned to Me</p>
          <p className="nav-item" style={{padding:"8px"}}>🧑🏻‍🤝‍🧑🏻Team</p>
          <p className="nav-item" style={{padding:"8px"}}>🗓️Calendar</p>
          
        </nav>

      </aside>

   
      
    <main className="main-content"style={{flex: 1, marginLeft:"40px", marginRight:"10px"}}>

      <button
      className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        <Menu size={24} color="black" />
      </button>

        <div className="header-row" >
      <h1 style={{marginBottom:"4px", flex:1}}>Good Morning, John!👋</h1>

      <input
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{flex:1, padding:"8px 12px", borderRadius:"15px", border: "1px solid #ddd", width:"200px", marginTop: "25px"}}
        />
        </div>

      
      <p style={{color:"gray", marginBottom: "16px"}}>Here's what is happening with your assigned tasks.</p>

      
      

      <div className="stat-cards" >

        <div className="stat-card" style={{background:"#e0f2fe", padding:"12px", borderRadius:"8px", flex: 1, border:"1px solid blue"}}>
          <p><strong>
            Total Assigned
            </strong>
          </p>
          <p style={{fontSize:"24px", fontWeight:"bold"}}>
            {total}
          </p>
        </div>

        <div className="stat-card" style={{background:"#dcfce7", padding:"12px", borderRadius:"8px", flex: 1, border:"1px solid green"}}>
          <p><strong>
            Completed
            </strong>
          </p>
          <p style={{fontSize:"24px", fontWeight:"bold"}}>
            {completed}
          </p>
        </div>

        <div className="stat-card" style={{background:"#fef9c3", padding:"12px", borderRadius:"8px", flex: 1, border:"1px solid yellow"}}>
          <p><strong>
            In Progress
            </strong>
          </p>
          <p style={{fontSize:"24px", fontWeight:"bold"}}>
            {inProgress}
          </p>
        </div>

        <div className="stat-card"style={{background:"#fee2e2", padding:"12px", borderRadius:"8px", flex: 1, border:"1px solid red"}}>
          <p><strong>
            Pending
            </strong>
          </p>
          <p style={{fontSize:"24px", fontWeight:"bold"}}>
            {pending}
          </p>
        </div>

      </div>

             <button
  onClick={() => setShowForm(!showForm)}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }}
>
  + Add Task
</button>

{showForm && (
  <div style={{
    border: "1px solid #e2e8f0",
    padding: "16px",
    margin: "12px 0",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "320px",
    background: "#f8fafc"
  }}>
    <input
      placeholder="Task title"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
    />
    <input
      placeholder="Assignee"
      value={newAssignee}
      onChange={(e) => setNewAssignee(e.target.value)}
      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
    />

    <select
      value={newPriority}
      onChange={(e) => setNewPriority(e.target.value)}
      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

    <select
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
      style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
    >
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>

    <button
      onClick={addTask}
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
      }}
    >
      Save Task
    </button>
  </div>
)}
      <h1>Assigned Tasks</h1>

      <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
        
        <button className="filter-button" onClick={() => setActiveFilter("All")} 
        style={{padding:"6px 14px", 
          borderRadius:"20px",
          border:activeFilter === "All" ? "none" : "1px solid #ddd",
          background: activeFilter === "All" ? "#2563eb" : "white",
          color: activeFilter === "All" ? "white" : "black",
          cursor:"pointer"}}>All</button>


        <button className="filter-button" onClick={() => setActiveFilter("To Do")}
           style={{padding:"6px 14px", 
          borderRadius:"20px",
          border:activeFilter === "To Do" ? "none" : "1px solid #ddd",
          background: activeFilter === "To Do" ? "#2563eb" : "white",
          color: activeFilter === "To Do" ? "white" : "black",
          cursor:"pointer"}}
          >To Do</button>


        <button  className="filter-button" onClick={() => setActiveFilter("In Progress")}
           style={{padding:"6px 14px", 
          borderRadius:"20px",
          border:activeFilter === "In progress" ? "none" : "1px solid #ddd",
          background: activeFilter === "In progress" ? "#2563eb" : "white",
          color: activeFilter === "In progress" ? "white" : "black",
          cursor:"pointer"}}
          
          >In progress</button>


        <button className="filter-button" onClick={() => setActiveFilter("Completed")}
           style={{padding:"6px 14px", 
          borderRadius:"20px",
          border:activeFilter === "Completed" ? "none" : "1px solid #ddd",
          background: activeFilter === "Completed" ? "#2563eb" : "white",
          color: activeFilter === "Completed" ? "white" : "black",
          cursor:"pointer"}}
          >Completed</button>

        <button className="filter-button" onClick={() => setActiveFilter("Pending")}
          
           style={{padding:"6px 14px", 
          borderRadius:"20px",
          border:activeFilter === "Pending" ? "none" : "1px solid #ddd",
          background: activeFilter === "Pending" ? "#2563eb" : "white",
          color: activeFilter === "Pending" ? "white" : "black",
          cursor:"pointer"}}
          >Pending</button>

      </div>

            <table style={{width:"100%", borderCollapse: "collapse"}}>
              <thead>
                <tr style={{textAlign: "left", borderBottom: "1px solid #eee", color: "gray"}}>
                  <th style={{ padding:"10px"}}></th>
                  <th style={{ padding:"10px"}}>Task</th>
                  <th style={{ padding:"10px"}}>Assignee</th>
                  <th style={{ padding:"10px"}}>Due Date</th>
                  <th style={{ padding:"10px"}}>Priority</th>
                  <th style={{ padding:"10px"}}>Status</th>
                </tr>
              </thead>
              <tbody>
      {visibleTask.map((task) => (
      <tr key={task.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
        <td style={{ padding: "10px" }}>
          <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
        </td>
        <td style={{ padding: "10px" }}>
          <strong>{task.title}</strong>
          <p style={{ color: "gray", fontSize: "13px" }}>{task.desc}</p>
        </td>
        <td style={{ padding: "10px" }}>{task.assignee}</td>
        <td style={{ padding: "10px" }}>{task.due}</td>
        <td style={{ padding: "10px" }}>
          <span style={{
            background: task.priority === "High" ? "#fee2e2" : task.priority === "Medium" ? "#fef9c3" : "#dcfce7",
            color: task.priority === "High" ? "#dc2626" : task.priority === "Medium" ? "#ca8a04" : "#16a34a",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "13px"
          }}>
            {task.priority}
          </span>
        </td>
        <td style={{ padding: "10px" }}>{task.status}</td>
      </tr>
    ))}
  </tbody>
    </table>
    </main>
       </div>
  );

}
 