import React from "react";
import PropTypes from 'prop-types';
import { Input } from "semantic-ui-react";


export default class CustomInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Input fluid
                       key={this.props.indexKey}
                       name={this.props.name}
                       label={this.props.label}
                       labelPosition="right"
                       className="custom-input border-bottom"
                       type="text"
                       pattern="^\d*([\.]\d{0,7})?$"
                       onChange={this.props.onChange}
                       value={(this.props.value) ? this.props.value : ''}
                       action={this.props.action}
                />
            </div>
        )
    }
}

CustomInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    indexKey: PropTypes.string
};