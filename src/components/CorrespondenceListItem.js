import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCorrespondence } from '../actions/correspondences';

const CorrespondenceListItem = ({ dispatch, id, nomorSurat, tanggalSurat, tanggalTerima, perihal }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{perihal}</h3>
        </Link>
        <p>{nomorSurat} - {tanggalSurat} - {tanggalTerima}</p>
        <button onClick={() => {
            dispatch(removeCorrespondence({ id }));
        }}>Hapus</button>
    </div>

);

export default connect()(CorrespondenceListItem);