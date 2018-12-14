import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByTanggalSurat, sortByTanggalTerima, setStartDate, setEndDate } from '../actions/filters';

class CorrespondenceListFilters extends React.Component {
    state = {
        tanggalSuratFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (tanggalSuratFocused) => {
        this.setState(() => ({ tanggalSuratFocused }));
    }

    render() {
        return (
            (
                <div>
                    <input
                        type="text"
                        value={this.props.filters.text}
                        onChange={(e) => {
                            this.props.dispatch(setTextFilter(e.target.value));
                        }} />
                    <select
                        value={this.props.filters.sortBy}
                        onChange={(e) => {
                            if (e.target.value === 'tanggalSurat') {
                                this.props.dispatch(sortByTanggalSurat());
                            } else if (e.target.value === 'tanggalTerima') {
                                this.props.dispatch(sortByTanggalTerima());
                            }
                        }}
                    >
                        <option value="tanggalSurat">Tanggal Surat</option>
                        <option value="tanggalTerima">Tanggal Terima</option>
                    </select>
                    <DateRangePicker
                        startDate={this.props.filters.startDate}
                        startDateId="Tanggal Awal"
                        endDate={this.props.filters.endDate}
                        endDateId="Tanggal Akhir"
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.tanggalSuratFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            )
        )
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(CorrespondenceListFilters);