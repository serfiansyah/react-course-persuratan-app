import React from 'react';
import CorrespondeceList from './CorrespondenceList';
import CorrespondeceListFilters from './CorrespondenceListFilters';

const CorrespondenceDashboardPage = () => (
    <div>
        <CorrespondeceListFilters />
        <CorrespondeceList />
    </div>
);

export default CorrespondenceDashboardPage;