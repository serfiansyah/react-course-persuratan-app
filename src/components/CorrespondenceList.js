import React from 'react';
import { connect } from 'react-redux';
import CorrespondenceListItem from './CorrespondenceListItem';
import selectCorrespondence from '../selectors/correspondences';

const CorrespondenceList = (props) => (
    <div>
        <h1>Daftar Persuratan</h1>
        {props.correspondence.map((correspondence) => {
            return <CorrespondenceListItem key={correspondence.id} {...correspondence} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        correspondence: selectCorrespondence(state.correspondence, state.filters)
    }
};

export default connect(mapStateToProps)(CorrespondenceList);
