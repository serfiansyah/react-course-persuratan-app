import moment from 'moment';

// Get visible correspondence
export default (correspondence, { text, sortBy, startDate, endDate }) => {
    return correspondence.
        filter((correspondence) => {
            const tanggalSuratMoment = moment(correspondence.tanggalSurat);
            const startDateMatch = startDate ? startDate.isSameOrBefore(tanggalSuratMoment, 'day') : true;
            const endDateMatch = endDate ? endDate.isSameOrAfter(tanggalSuratMoment, 'day') : true;
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