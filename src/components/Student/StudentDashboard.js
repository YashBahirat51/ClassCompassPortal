// src/components/Student/StudentDashboard.js
import React from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import Profile from './Profile';
import ViewTimetable from './ViewTimetable';
import ViewNotice from './ViewNotice';
import ViewResources from './ViewResources';
import Assignments from './Assignments';
import Messages from './Messages';
import StudentSidebar from './StudentSidebar';
import ViewResults from './ViewResults';
import Attendance from '../Admin/Attendance';
import ViewAttendance from './ViewAttendance';

const StudentDashboard = () => {
    let { path,url } = useRouteMatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');
        history.push('/');
    };

    return (
        <div style={{ display: 'flex' }}>
            <StudentSidebar url={url} handleLogout={handleLogout} /> {/* Include the sidebar */}
           <main className="main-content">
           <h1>Student Dashboard</h1>
           <hr></hr>
           <div style={{ flex: 1, padding: '20px' }}>
                <Switch>
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/timetable`} component={ViewTimetable} />
                    <Route path={`${path}/notice`} component={ViewNotice} />
                    
                    <Route path={`${path}/viewresult`} component={ViewResults} />
                    <Route path={`${path}/resources`} component={ViewResources} />
                    
                    <Route path={`${path}/attenance`} component={Attendance} />
                    <Route path={`${path}/assignments`} component={Assignments} />
                    <Route path={`${path}/attendance`} component={ViewAttendance} />
                    <Route path={path} exact>
                        <h2>Welcome to your dashboard!</h2>
                    </Route>
                </Switch>
            </div>
           </main>
        </div>
    );
};

export default StudentDashboard;
