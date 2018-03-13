import React from 'react';
import './exchange.css';
import { connect } from 'react-redux';
import * as axios from 'axios';

import { Segment, Button, Table, Dropdown } from 'semantic-ui-react';

// import actions
import { updateCurrencyList } from '../../actions/exchange-actions';
import { resultLoadingStatus } from '../../actions/panelToggle-actions';

class Exchange extends React.Component {

    constructor() {
        super();
        this.loadResult = this.loadResult.bind(this);
        this.loadDatePicker = this.loadDatePicker.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSymbolChange = this.handleSymbolChange.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    componentWillMount() {
        this.props.getCurrencyList();
        this.setState({
            result: "",
            dateValue: "",
            typeValue: "",
            symbolValue: [],
        })
    }

    loadResult(result) {
        if (!result) {
            return <div />;
        } else if (result === "Wrong Input"){
            return <div>Wrong Input</div>;
        } else {
            let currency_result = result.map((item)=>{
                return (
                    <Table.Row key={item}>
                        <Table.Cell>
                            {item[0]}
                        </Table.Cell>
                        <Table.Cell>
                            {item[1]}
                        </Table.Cell>
                    </Table.Row>
                );
            });
            return (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Currency</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currency_result}
                    </Table.Body>
                </Table>
            );
        }
    }

    loadDatePicker() {
        if (this.state.typeValue === "historical") {
            return (
                <input
                    type="date"
                    value={this.dateValue}
                    onChange={this.handleDateChange}
                />
            );
        } else {
            return <div/>;
        }
    }

    requestData(options) {
        this.props.resultLoading(true);
        axios.get('http://localhost:8000/api/ex?'+options)
        .then((data)=>{
            let currency_result = [];
            for (let item in data.data.rates) {
                currency_result.push(
                    [item, data.data.rates[item]]
                )
            }
            this.setState({result: [...currency_result]});
            this.props.resultLoading(false);
        })
        .catch((err)=>{
            if (err) console.log(err);
            this.props.resultLoading(false);
        })
    }

    submitRequest(e) {
        e.preventDefault();
        let symbols = "";
        let options = "";
        if (this.state.symbolValue.length) {
            symbols = '&symbols='+this.state.symbolValue.join(',');
        }
        if (this.state.typeValue === 'historical') {
            if (this.state.dateValue) {
                options = 'type='+ this.state.typeValue + symbols + '&date=' + this.state.dateValue;
                this.requestData(options);
            } else {
                this.setState({result: "Wrong Input"});
            }
        } else if (this.state.typeValue === 'latest'){
            options = 'type='+ this.state.typeValue + symbols;
            this.requestData(options);
        } else {
            this.setState({result: "Wrong Input"});
        }
        
    }

    handleDateChange(e) {
        e.preventDefault();
        this.setState({ dateValue: e.target.value });
    }

    handleTypeChange(e, data) {
        e.preventDefault();
        this.setState({ typeValue: data.value });
    }

    handleSymbolChange(e, data) {
        e.preventDefault();
        this.setState({ symbolValue: [...data.value] });
    }

    render() {
        let { result } = this.state;
        return (
            <div className="exchange-container">
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Symbols</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Dropdown
                                    placeholder="Request Type"
                                    search={true}
                                    selection={true}
                                    options={
                                        [
                                            {key: "latest", value: "latest", text: "latest"},
                                            {key: "historical", value: "historical", text: "historical"},
                                        ]
                                        
                                    }
                                    onChange={this.handleTypeChange}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                {this.loadDatePicker()}
                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown
                                    placeholder="Symbols"
                                    fluid={true}
                                    multiple={true}
                                    selection={true}
                                    options={this.props.currency_list}                                    
                                    onChange={this.handleSymbolChange}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    primary={true}
                                    onClick={this.submitRequest}
                                >
                                    Submit
                                </Button>   
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Segment
                    className="exchange-result"
                    loading={this.props.exchangeResultLoading}
                >
                    <div className="result-title"><u><i>Result</i></u></div>
                    {this.loadResult(result)}
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currency_list: state.exchangeInfo.currency_list,
        exchangeResultLoading: state.panelToggle.exchangeResult,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyList: () => {
            axios.get('http://localhost:8000/api/currencylist').then((data) => {
                let currency_list = [];
                for (let item in data.data) {
                    currency_list.push(
                        {
                            key: item,
                            value: item,
                            text: item,
                        }
                    )
                }
                dispatch(updateCurrencyList(currency_list));
            })
        },
        resultLoading: (status) => {
            dispatch(resultLoadingStatus(status));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);