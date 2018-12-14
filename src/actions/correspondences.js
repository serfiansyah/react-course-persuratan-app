import uuid from 'uuid';

// ADD_CORRESPONDENCE
export const addCorrespondence = (
    {
        nomorSurat = '',
        asalSurat = '',
        tanggalSurat = 0,
        tanggalTerima = 0,
        perihal = '',
        disposisi = [],
        diteruskanKepada = [],
        catatan
    } = {},
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
        diteruskanKepada,
        catatan

    }
});

// REMOVE_CORRESPONDENCE
export const removeCorrespondence = ({ id } = {}) => ({
    type: 'REMOVE_CORRESPONDENCE',
    id
})

// EDIT_CORRESPONDENCE
export const editCorrespondence = (id, updates) => ({
    type: 'EDIT_CORRESPONDENCE',
    id,
    updates
})