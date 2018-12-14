import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addCorrespondence } from './actions/correspondences';
import { setTextFilter } from './actions/filters';
import getVisibleCorrespondence from './selectors/correspondences';

//import 'normalize.css/normalize.css';
//import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

store.dispatch(addCorrespondence({
    perihal: 'Surat Undangan Pertemuan', nomorSurat: '396/BK/07', tanggalSurat: 1538370000000, tanggalTerima: 1541048400000
}));
store.dispatch(addCorrespondence({ perihal: 'Surat Permohonan Narasumber', nomorSurat: '201/MC/2018', tanggalSurat: 2000, tanggalTerima: 2500 }));
store.dispatch(addCorrespondence({ perihal: 'Surat Undangan Panel Ilmiah', nomorSurat: '322/PI/2018', tanggalSurat: 1500, tanggalTerima: 3300 }));

const state = store.getState();
const visibleCorrespondence = getVisibleCorrespondence(state.correspondence, state.filters);
console.log(visibleCorrespondence);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));