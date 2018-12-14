import React from 'react';
import { connect } from 'react-redux';
import CorrespondenceForm from './CorrespondenceForm';
import { editCorrespondence } from '../actions/correspondences';

const EditCorrespondencePage = (props) => {
    return (
        <div>
            <CorrespondenceForm
                correspondence={props.correspondence}
                onSubmit={(correspondence) => {
                    props.dispatch(editCorrespondence(props.correspondence.id, correspondence));
                    props.history.push('/');

                }}
            />
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        correspondence: state.correspondence.find((correspondence) => correspondence.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditCorrespondencePage);