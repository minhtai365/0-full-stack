import React, { Component } from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import Axios from 'axios';



class Donhang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: []
        }
    }


    componentWillMount() {
        Axios.get('/products')
            .then(ress => {

                var data = [];
                ress.data.forEach(x => {

                    var row = {};
                    row.id = x._id;
                    row.imgPath = x.imgPath;
                    row.title = x.title;
                    data.push(row);
                });
                this.setState({ dt: data })
            })
    }
    render() {
        const rows: RowsProp = this.state.dt

        const columns: ColDef[] = [
            { field: 'id', hide: true },
            { field: 'imgPath', headerName: 'Hinhf anhr', width: 150 },
            { field: 'title', headerName: 'Ten', width: 150 },
        ];
        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        dt: state.dt,
        dataproducts: state.dataproducts,
        datacates: state.datacates,
        datatypes: state.datatypes,
    }
}

export default connect(mapStateToProps,)(Donhang)