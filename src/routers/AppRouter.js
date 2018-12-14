import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import CorrespondenceDashboardPage from '../components/CorrespondenceDashboardPage';
import AddCorrespondencePage from '../components/AddCorrespondencePage';
import EditCorrespondencePage from '../components/EditCorrespondencePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={CorrespondenceDashboardPage} exact={true} />
                <Route path="/create" component={AddCorrespondencePage} />
                <Route path="/edit/:id" component={EditCorrespondencePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;

