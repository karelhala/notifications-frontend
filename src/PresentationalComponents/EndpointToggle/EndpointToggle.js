import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@patternfly/react-core';

export const EndpointToggle = ({ active, id, onChange }) =>
    <Switch id={ `endpoint_toggle_${ id }` }
        isChecked={ active }
        onChange={ onChange }
    />;

EndpointToggle.propTypes = {
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EndpointToggle;
