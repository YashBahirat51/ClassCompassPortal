// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AdminLogin from './components/Admin/AdminLogin';
// import StudentLogin from './components/Student/StudentLogin';
// import AddAssignment from './components/Faculty/AddAssignment';
// import UploadAssignment from './components/Student/UploadAssignment';
// import PrivateRoute from './components/Common/PrivateRoute';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import StudentDashboard from './components/Student/StudentDashboard';
// import LoginPage from './components/Common/LoginPage';
// import NoticePage from './components/Admin/NoticePage';
// import Profile from './components/Student/Profile';
// import ViewResources from './components/Student/ViewResources';
// import ViewTimetable from './components/Student/ViewTimetable';
// import Assignments from './components/Student/Assignments';
// import AssignmentDetails from './components/Student/AssignmentDetails';
// import ViewAttendance from './components/Student/ViewAttendance';

// const App = () => (
//     <Router>
//         //switch ensures only one compo rendered t a time
//         <Switch>
//             <Route path="/admin/login" component={AdminLogin} />
//             <Route path="/student/login" component={StudentLogin} />
//             <Route path="/" exact component={LoginPage} />

//             Admin Routes
//             <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
//             <PrivateRoute path="/faculty/add-assignment" component={AddAssignment} />
//             <PrivateRoute path="/faculty/notice" component={NoticePage} />

//             {/* Student Routes */}
//             <PrivateRoute path="/student/dashboard" component={StudentDashboard} />
//             <PrivateRoute path="/student/upload-assignment" component={UploadAssignment} />
//             <PrivateRoute path="/student/profile" component={Profile} />
//             <PrivateRoute path="/student/resources" component={ViewResources} />
//             <PrivateRoute path="/student/timetable" component={ViewTimetable} />
//             <PrivateRoute path="/student/assignments" component={Assignments} />
//             <PrivateRoute path="/student/notice" component={NoticePage} />
//             <PrivateRoute path="/student/attendance" component={ViewAttendance} />
            
//             <PrivateRoute path="/student/assignment-details/:id" component={AssignmentDetails} /> {/* New route */}
//         </Switch>
//     </Router>
// );

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';
import AddAssignment from './components/Faculty/AddAssignment';
import UploadAssignment from './components/Student/UploadAssignment';
import PrivateRoute from './components/Common/PrivateRoute'; // Custom route component for protected routes
import AdminDashboard from './components/Admin/AdminDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import LoginPage from './components/Common/LoginPage';
import NoticePage from './components/Admin/NoticePage';
import Profile from './components/Student/Profile';
import ViewResources from './components/Student/ViewResources';
import ViewTimetable from './components/Student/ViewTimetable';
import Assignments from './components/Student/Assignments';
import AssignmentDetails from './components/Student/AssignmentDetails';
import ViewAttendance from './components/Student/ViewAttendance';
import '../src/components/styles/App.css'
const App = () => (
    <Router> {/* Wraps all routes to provide routing functionality */}
        <Switch> {/* Ensures only one route is rendered at a time */}
            
            {/* Public Routes */}
            <Route path="/admin/login" component={AdminLogin} /> 
            {/* Route for the Admin login page */}

            <Route path="/student/login" component={StudentLogin} /> 
            {/* Route for the Student login page */}

            <Route path="/" exact component={LoginPage} /> 
            {/* Route for the root path (`/`), renders the common LoginPage component */}

            {/* Admin Routes */}
            <PrivateRoute path="/admin/dashboard" component={AdminDashboard} /> 
            {/* Protected route for the Admin Dashboard */}

            <PrivateRoute path="/faculty/add-assignment" component={AddAssignment} /> 
            {/* Protected route for Faculty to add assignments */}

            <PrivateRoute path="/faculty/notice" component={NoticePage} /> 
            {/* Protected route for Faculty to manage notices */}

            {/* Student Routes */}
            <PrivateRoute path="/student/dashboard" component={StudentDashboard} /> 
            {/* Protected route for the Student Dashboard */}

            <PrivateRoute path="/student/upload-assignment" component={UploadAssignment} /> 
            {/* Protected route for Students to upload assignments */}

            <PrivateRoute path="/student/profile" component={Profile} /> 
            {/* Protected route for the Student Profile page */}

            <PrivateRoute path="/student/resources" component={ViewResources} /> 
            {/* Protected route for Students to view resources */}

            <PrivateRoute path="/student/timetable" component={ViewTimetable} /> 
            {/* Protected route for Students to view their timetable */}

            <PrivateRoute path="/student/assignments" component={Assignments} /> 
            {/* Protected route for Students to view their assignments */}

            <PrivateRoute path="/student/notice" component={NoticePage} /> 
            {/* Protected route for Students to view notices */}

            <PrivateRoute path="/student/attendance" component={ViewAttendance} /> 
            {/* Protected route for Students to view their attendance */}

            <PrivateRoute path="/student/assignment-details/:id" component={AssignmentDetails} /> 
            {/* Protected route for Students to view details of a specific assignment by ID */}

        </Switch> {/* Closes the Switch to ensure only one route is rendered at a time */}
    </Router> 
);

export default App;
