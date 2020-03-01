import React from "react";
import { Dropdown, Flag, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';

export default class Selection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let countryOptions = [];
        if(this.props.values.length > 0){
            this.props.values.forEach( (value) => {
                countryOptions.push(
                    { key: value, value: value, text: <span><Flag name={value.slice(0,-1).toLowerCase()} size="large"/>{value}</span> }
                );
            })
        }

        return (
            <div>
                <Dropdown
                    name={this.props.name}
                    className="custom-font"
                    placeholder='Select currency'
                    fluid
                    search={(options, query) => {
                        let pattern = new RegExp('^' + query.toLowerCase());
                        return options.filter((opt) => (pattern.test(opt.value.toLowerCase())))
                    }}
                    selection
                    options={countryOptions}
                    size="Large"
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
            </div>
        )
    }
}

Selection.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    values: PropTypes.array
};