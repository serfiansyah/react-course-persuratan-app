import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_CORRESPONDENCE
const addCorrespondence = (
    {
        nomorSurat = '',
        asalSurat = '',
        tanggalSurat = 0,
        tanggalTerima = 0,
        perihal = '',
        disposisi = [],
        diteruskanKepada = []
    } = {}
) => ({
    type: 'ADD_CORRESPONDENCE',
    correspondence: {
        id: uuid(),
        nomorSurat,
        asalSurat,
        tanggalSurat,
        tanggalTerima,
        perihal,
        disposisi,
        diteruskanKepada

    }
});

// REMOVE_CORRESPONDENCE
const removeCorrespondence = ({ id } = {}) => ({
    type: 'REMOVE_CORRESPONDENCE',
    id
})

// EDIT_CORRESPONDENCE
const editCorrespondence = (id, updates) => ({
    type: 'EDIT_CORRESPONDENCE',
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_TANGGAL_SURAT
const sortByTanggalSurat = () => ({
    type: 'SORT_BY_TANGGAL_SURAT'
});

// SORT_BY_TANGGAL_TERIMA
const sortByTanggalTerima = () => ({
    type: 'SORT_BY_TANGGAL_TERIMA'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE 
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

// Correspondences Reducer

const correspondencesReducerDefaultState = [];

const correspondencesReducer = (state = correspondencesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CORRESPONDENCE':
            return [
                ...state,
                action.correspondence
            ];
        case 'REMOVE_CORRESPONDENCE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_CORRESPONDENCE':
            return state.map((correspondence) => {
                if (correspondence.id === action.id) {
                    return {
                        ...correspondence,
                        ...action.updates
                    }
                } else {
                    return correspondence;
                }
            });
        default:
            return state
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'tanggalSurat',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_TANGGAL_SURAT':
            return {
                ...state,
                sortBy: 'tanggalSurat'
            }
        case 'SORT_BY_TANGGAL_TERIMA':
            return {
                ...state,
                sortBy: 'tanggalTerima'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

// Get visible correspondences
const getVisibleCorrespondences = (correspondences, { text, sortBy, startDate, endDate }) => {
    return correspondences.
        filter((correspondence) => {
            const startDateMatch =
                typeof startDate !== 'number' || correspondence.tanggalSurat >= startDate;
            const endDateMatch =
                typeof endDate !== 'number' || correspondence.tanggalSurat <= endDate;
            const textMatch = correspondence.perihal.
                toLowerCase().
                includes(text.toLowerCase());

            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if (sortBy === "tanggalSurat") {
                return a.tanggalSurat < b.tanggalSurat ? 1 : -1;
            } else if (sortBy === "tanggalTerima") {
                return a.tanggalTerima < b.tanggalTerima ? 1 : -1;
            }
        });
};

// Store creation
const store = createStore(
    combineReducers({
        correspondences: correspondencesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleCorrespondences = getVisibleCorrespondences(state.correspondences, state.filters)
    console.log(visibleCorrespondences);
})

const correspondenceOne = store.dispatch(addCorrespondence({ nomorSurat: '396/BK/07', tanggalSurat: 1000, tanggalTerima: 1200, perihal: 'Undangan pertemuan' }));
const correspondenceTwo = store.dispatch(addCorrespondence({ nomorSurat: '401/BK/07', tanggalSurat: -1000, tanggalTerima: 5000, perihal: 'Permohonan narasumber' }));

// store.dispatch(removeCorrespondence({ id: correspondenceOne.correspondence.id }));
// store.dispatch(editCorrespondence(correspondenceTwo.correspondence.id, { tanggalSurat: 2000 }));

// store.dispatch(setTextFilter('mohon'));
// store.dispatch(setTextFilter());

store.dispatch(sortByTanggalSurat());
//store.dispatch(sortByTanggalTerima());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    correspondences: [
        {
            id: '1',
            nomorSurat: '396/BK/07',
            asalSurat: 'Menlu RI',
            tanggalSurat: 1000,
            tanggalTerima: 1200,
            perihal: "Laporan Pertemuan",
            disposisi: ['Harap Mewakili', 'Selesaikan'],
            diteruskanKepada: ['Kasie Pemanfaatan', 'Ilham Serfiansyah']
        }
    ],
    filters: {
        text: "Laporan",
        sortBy: "tanggalSurat", // tanggal surat or tanggal terima
        startDate: undefined,
        endDate: undefined
    }
};
