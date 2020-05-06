import React from 'react';

import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';

import {Container, Text} from './styles';

function Button({children, loading, ...rest}) {
    return (
        <Container {...rest}>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text>{children}</Text>
            )}
        </Container>
    );
}

Button.PropTypes = {
    children: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

Button.defaultProps = {
    loading: false,
};

export default Button;
