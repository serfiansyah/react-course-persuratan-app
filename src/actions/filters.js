// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_TANGGAL_SURAT
export const sortByTanggalSurat = () => ({
    type: 'SORT_BY_TANGGAL_SURAT'
});

// SORT_BY_TANGGAL_TERIMA
export const sortByTanggalTerima = () => ({
    type: 'SORT_BY_TANGGAL_TERIMA'
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE 
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})