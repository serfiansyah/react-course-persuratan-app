import React from 'react';
import { connect } from 'react-redux';
import CorrespondenceForm from './CorrespondenceForm';
import { addCorrespondence } from '../actions/correspondences';

const AddCorrespondencePage = (props) => (
    <div>
        <h1>Add Correspondence</h1>
        <CorrespondenceForm
            onSubmit={(correspondence) => {
                props.dispatch(addCorrespondence(correspondence));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddCorrespondencePage);