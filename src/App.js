// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';
import AddAssignment from './components/Faculty/AddAssignment';
import UploadAssignment from './components/Student/UploadAssignment';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import LoginPage from './components/Common/LoginPage';
import NoticePage from './components/Admin/NoticePage';
import MessagesPage from './components/Admin/MessagesPage';
import StudentPerformancePage from './components/Admin/StudentPerformancePage';
import Profile from './components/Student/Profile';
import ViewResources from './components/Student/ViewResources';
import ViewTimetable from './components/Student/ViewTimetable';
import Assignments from './components/Student/Assignments';
import AssignmentDetails from './components/Student/AssignmentDetails';
import ViewResults from './components/Student/ViewResults';
import Attendance from './components/Admin/Attendance';
import ViewAttendance from './components/Student/ViewAttendance';

const App = () => (
    <Router>
        <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/student/login" component={StudentLogin} />
            <Route path="/" exact component={LoginPage} />

            {/* Admin Routes */}
            <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
            <PrivateRoute path="/faculty/add-assignment" component={AddAssignment} />
            <PrivateRoute path="/faculty/notice" component={NoticePage} />

            {/* Student Routes */}
            <PrivateRoute path="/student/dashboard" component={StudentDashboard} />
            <PrivateRoute path="/student/upload-assignment" component={UploadAssignment} />
            <PrivateRoute path="/student/profile" component={Profile} />
            <PrivateRoute path="/student/resources" component={ViewResources} />
            <PrivateRoute path="/student/timetable" component={ViewTimetable} />
            <PrivateRoute path="/student/assignments" component={Assignments} />
            <PrivateRoute path="/student/notice" component={NoticePage} />
            <PrivateRoute path="/student/attendance" component={ViewAttendance} />
            
            <PrivateRoute path="/student/assignment-details/:id" component={AssignmentDetails} /> {/* New route */}
        </Switch>
    </Router>
);

export default App;
