import React from 'react';
import moment from 'moment';
import uuid from 'uuid';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import CheckBox from './CheckBox';

export default class CorrespondenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nomorSurat: props.correspondence ? props.correspondence.nomorSurat : '',
            asalSurat: props.correspondence ? props.correspondence.asalSurat : '',
            tanggalSurat: props.correspondence ? moment(props.correspondence.tanggalSurat) : moment(),
            tanggalSuratFocused: false,
            tanggalTerima: props.correspondence ? moment(props.correspondence.tanggalTerima) : moment(),
            tanggalTerimaFocused: false,
            perihal: props.correspondence ? props.correspondence.perihal : '',
            disposisi: props.correspondence ? props.correspondence.disposisi : [
                { name: "jadwalkan", value: "Jadwalkan", isChecked: false },
                { name: "harapMewakili", value: "Harap Mewakili", isChecked: false },
                { name: "hadirBersama", value: "Hadir Bersama", isChecked: false },
                { name: "tanggapi", value: "Tanggapi", isChecked: false },
                { name: "siapkanBahan", value: "Siapkan Bahan", isChecked: false },
                { name: "konsultasikan", value: "Konsultasikan", isChecked: false },
                { name: "selesaikan", value: "Selesaikan", isChecked: true },
                { name: "pelajari", value: "Pelajari", isChecked: true },
                { name: "ketahui", value: "Ketahui", isChecked: true },
                { name: "file", value: "File", isChecked: false },
                { name: "ikutiPerkembangan", value: "Ikuti Perkembangan", isChecked: false },
                { name: "diskusiAtauKoordinasikan", value: "Diskusi/Koordinasikan", isChecked: false }

            ],
            diteruskanKepada: props.correspondence ? props.correspondence.diteruskanKepada : [
                { name: "kasiePemanfaatan", value: "Kasie Pemanfaatan", isChecked: false },
                { name: "kasieTataKelola", value: "Kasie Tata Kelola", isChecked: false },
                { name: "yaya", value: "Yaya Hudaya", isChecked: false },
                { name: "sutriyono", value: "Sutriyono", isChecked: false },
                { name: "kartoPulung", value: "Karto Pulung", isChecked: false },
                { name: "arinta", value: "Arinta Dwi Hapsari", isChecked: false },
                { name: "martini", value: "Martini Dwi I", isChecked: false },
                { name: "mely", value: "Mely Shara B", isChecked: false },
                { name: "rizal", value: "Rizal Rifai", isChecked: false },
                { name: "dinar", value: "Dinar Putralaksana", isChecked: false },
                { name: "ilham", value: "Ilham Serfiansyah", isChecked: false },
            ],
            catatan: props.correspondence ? props.correspondence.catatan : '',
            id: uuid()
        };

        this.onDisposisiChange = this.onDisposisiChange.bind(this);
        this.onDiteruskanKepadaChange = this.onDiteruskanKepadaChange.bind(this);
    }


    onNomorSuratChange = (e) => {
        const nomorSurat = e.target.value;
        this.setState(() => ({ nomorSurat }));
    };

    onAsalSuratChange = (e) => {
        const asalSurat = e.target.value;
        this.setState(() => ({ asalSurat }));
    };

    onDisposisiChange(e) {
        const disposisi = this.state.disposisi;

        disposisi.forEach(disposisi => {
            if (disposisi.name === e.target.name)
                disposisi.isChecked = e.target.checked;
        })

        this.setState({ disposisi });
    }

    onDiteruskanKepadaChange(e) {
        const diteruskanKepada = this.state.diteruskanKepada;

        diteruskanKepada.forEach(diteruskanKepada => {
            if (diteruskanKepada.name === e.target.name)
                diteruskanKepada.isChecked = e.target.checked;
        })

        this.setState({ diteruskanKepada });
    }

    onPerihalChange = (e) => {
        const perihal = e.target.value;
        this.setState(() => ({ perihal }));
    };

    onCatatanChange = (e) => {
        const catatan = e.target.value;
        this.setState(() => ({ catatan }));
    }

    onTanggalSuratChange = (tanggalSurat) => {
        this.setState(() => ({ tanggalSurat }));
    };

    onTanggalTerimaChange = (tanggalTerima) => {
        this.setState(() => ({ tanggalTerima }));
    };

    onTanggalSuratFocusChange = ({ focused }) => {
        this.setState(() => ({ tanggalSuratFocused: focused }));
    };

    onTanggalTerimaFocusChange = ({ focused }) => {
        this.setState(() => ({ tanggalTerimaFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.nomorSurat || !this.state.perihal) {
            this.setState(() => ({ error: 'Tolong diisi Nomor Surat dan Perihal' }))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                nomorSurat: this.state.nomorSurat,
                asalSurat: this.state.asalSurat,
                tanggalSurat: this.state.tanggalSurat.valueOf(),
                tanggalTerima: this.state.tanggalTerima.valueOf(),
                perihal: this.state.perihal,
                disposisi: this.state.disposisi,
                catatan: this.state.catatan
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Nomor Surat"
                        autoFocus
                        value={this.state.nomorSurat}
                        onChange={this.onNomorSuratChange}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Asal Surat"
                        value={this.state.asalSurat}
                        onChange={this.onAsalSuratChange}
                    />
                    <br />
                    <SingleDatePicker
                        date={this.state.tanggalSurat}
                        onDateChange={this.onTanggalSuratChange}
                        focused={this.state.tanggalSuratFocused}
                        onFocusChange={this.onTanggalSuratFocusChange}
                        id="tanggalSurat"
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <SingleDatePicker
                        date={this.state.tanggalTerima}
                        onDateChange={this.onTanggalTerimaChange}
                        focused={this.state.tanggalTerimaFocused}
                        onFocusChange={this.onTanggalTerimaFocusChange}
                        id="tanggalTerima"
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <br />
                    <textarea
                        placeholder="Perihal"
                        value={this.state.perihal}
                        onChange={this.onPerihalChange}
                    >
                    </textarea>
                    <br />
                    {/* ISI DISPOSISI
                    <ul>
                        {
                            this.state.disposisi.map((disposisi) => {
                                return (
                                    <div key={disposisi.name}>
                                        <input
                                            name={disposisi.name}
                                            type="checkbox"
                                            checked={disposisi.isChecked}
                                            onChange={this.onDisposisiChange}
                                        />
                                        {disposisi.value}
                                    </div>
                                )
                            })
                        }
                    </ul> */}
                    ISI DISPOSISI
                    <ul>
                        {
                            this.state.disposisi.map((disposisi) => {
                                return (
                                    <CheckBox
                                        key={disposisi.name}
                                        onCheckChange={this.onDisposisiChange}
                                        {...disposisi}
                                    />
                                )
                            })
                        }
                    </ul>
                    <br />
                    DITERUSKAN KEPADA
                    <ul>
                        {
                            this.state.diteruskanKepada.map((diteruskanKepada) => {
                                return (
                                    <div key={diteruskanKepada.name}>
                                        <input
                                            name={diteruskanKepada.name}
                                            type="checkbox"
                                            checked={diteruskanKepada.isChecked}
                                            onChange={this.onDiteruskanKepadaChange}
                                        />
                                        {diteruskanKepada.value}
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <br />
                    <textarea
                        placeholder="Catatan"
                        value={this.state.catatan}
                        onChange={this.onCatatanChange}
                    >
                    </textarea>
                    <br />
                    <button>Tambah</button>
                </form>
            </div>

        )
    }
}