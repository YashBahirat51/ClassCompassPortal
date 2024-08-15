// src/components/Admin/AdminDashboard.js
import React from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import AddStudent from './AddStudent';
import AddTimeTable from './AddTimeTable'; // Correct import path
import Students from './Students';
import '../styles/DashboardPage.css'; // Import the CSS file for styling
import Sidebar from './Sidebar';
import NoticePage from './NoticePage';
import AddTimetable from './AddTimeTable';
import AssignmentManagementPage from './AssignmentManagmentPage';
import FacultyDashboard from '../Admin/FacultyDashboard';
import Resource from './Resources';
import Result from './Result';
import Attendance from './Attendance';
const AdminDashboard = () => {
    let { path, url } = useRouteMatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');
        history.push('/');
    };

    return (
        <div className="dashboard-container">
            

            <Sidebar url={url} handleLogout={handleLogout} />
            <main className="main-content">
                <h1>Admin Dashboard</h1>
                <Switch>
                    <Route path={`${path}/add-student`} component={AddStudent} />
                    <Route path={`${path}/add-timetable`} component={AddTimeTable} />
                    <Route path={`${path}/students`} component={Students} />
                    <Route path={`${path}/faculty`} component={FacultyDashboard} />
                    <Route path={`${path}/notice`} component={NoticePage} />
                    <Route path={`${path}/time-table`} component={AddTimetable} />
                    <Route path={`${path}/assignments`} component={AssignmentManagementPage} />
                    <Route path={`${path}/resources`} component={Resource} />
                    <Route path={`${path}/result`} component={Result} />
                    <Route path={`${path}/attendance`} component={Attendance}/>
                </Switch>
            </main>
        </div>
    );
};

export default AdminDashboard;
