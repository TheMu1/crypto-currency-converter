import React from "react";
import {Responsive, Grid, Button, Icon} from "semantic-ui-react";
import DropDown from "./parts/dropdown";
import Input from "./parts/input";
import apiEndpoints from "../../../api_endpoints.json";

export default class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyInDD: ['USD', 'EUR', 'GBP'],
            convertTo: [],
            selected: 'EUR',
            amount: 1,
            data: {
                eurRate: 0,
                usdRate: 0,
                gbpRate: 0,
                updated: null
            },
            dataUpdateInterval: 60000
        };
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleRowInsert = this.handleRowInsert.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.callAPI();
        setInterval(() => {
           this.callAPI();
        }, this.state.dataUpdateInterval);
    }

    callAPI(tmp) {
        fetch(apiEndpoints.data_endpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: {
                            eurRate: result.bpi.EUR.rate_float,
                            usdRate: result.bpi.USD.rate_float,
                            gbpRate: result.bpi.GBP.rate_float,
                            updated: result.time.updateduk
                        }
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    handleRowInsert() {
        let selected = this.state.selected;
        let currInDD = this.state.currencyInDD.filter(e => e !== selected);
        this.setState({
            converTo: this.state.convertTo.push(selected),
            currencyInDD: currInDD,
            selected: currInDD[0]
        });
    }

    handleRowDelete(val) {
        let tmp = this.state.currencyInDD;
        tmp.push(val);
        this.setState({
           convertTo: this.state.convertTo.filter(e => e !== val),
           currencyInDD: tmp,
           selected: tmp[0]
        });
    }

    handleInputChange(e) {
        if (e.target.validity.valid) {
            this.setState({
                amount: e.target.value
            });
        }
    }

    handleSelect(e, {value}){
        this.setState({
           selected: value
        });
    }

    convert(amount, currency){
        switch(currency.toLowerCase()) {
            case 'eur':
                return this.format(amount, this.state.data.eurRate);
                break;
            case 'usd':
                return this.format(amount, this.state.data.usdRate);
                break;
            case 'gbp':
                return this.format(amount, this.state.data.gbpRate);
                break;
            default:
                break;
        }
    }

    format(amount, rate){
        return (amount * rate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    render() {
        let rows = [];
        let selection = '';
        if(this.state.currencyInDD.length > 0){
            selection =
                <Grid.Row centered stretched>
                    <Grid.Column width={5}>
                        <label className="custom-label">Select currency:</label>
                        <DropDown
                            values={this.state.currencyInDD}
                            value={this.state.selected}
                            onChange={this.handleSelect}
                        />
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <label>&nbsp;</label>
                        <Button positive onClick={this.handleRowInsert}> + </Button>
                    </Grid.Column>
                </Grid.Row>
        }
        if(this.state.convertTo.length === 0){
            rows =
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <h5 className="custom-label">Please select at least one currency from dropdown above.</h5>
                    </Grid.Column>
                </Grid.Row>
        }
        this.state.convertTo.forEach( (el, index) => {
            rows.push(
                <Grid.Row centered key={"convertationRow" + index}>
                    <Grid.Column width={6}>
                    <Icon
                        key={"icon" + el}
                        className="custom-hover custom-del-icon"
                        name='close'
                        color='red'
                        onClick={this.handleRowDelete.bind(this, el)}
                    />
                    <div className="custom-conv-row">
                        <Input
                            key={el}
                            name={"converTo" + el}
                            label={el}
                            value={this.convert(this.state.amount, el)}
                        />
                    </div>
                    </Grid.Column>
                </Grid.Row>
            );
        });
        return (
            <Responsive style={{height: '100%'}} className="custom-grid">
                <Grid stackable verticalAlign="middle" className="custom-card">
                    <Grid.Row centered>
                            <h2 className="custom-label">BTC to currency converter</h2>
                    </Grid.Row>
                    { selection }
                    <Grid.Row centered>
                        <Grid.Column width={5}>
                            <label className="custom-label">Enter amount of BTC to convert:</label>
                            <Input
                                indexKey="convertFrom"
                                name="convertFrom"
                                label="BTC"
                                onChange={this.handleInputChange}
                                value={this.state.amount}
                            />
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <h2 className="custom-label">Converted into:</h2>
                    </Grid.Row>
                    { rows }
                </Grid>
            </Responsive>
        )
    }
}
