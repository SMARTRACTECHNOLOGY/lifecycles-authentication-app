import React from 'react';
import Platform from 'Platform';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      elevation: 2,
      backgroundColor: theme.color.primary
    },
    android: {
      elevation: 2,
      backgroundColor: theme.color.primary
    }
  }),
  text: Platform.select({
    ios: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontSize: theme.typography.size,
      fontFamily: theme.typography.font
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 12,
      fontSize: theme.typography.size * 1.1,
      fontFamily: theme.typography.font,
      fontWeight: '300'
    }
  }),
  buttonDisabled: {
    elevation: 0,
    backgroundColor: theme.color.gray
  },
  textDisabled: {
    color: theme.color.lightGray
  }
});

class Button extends React.Component {

  static propTypes = {
    // Text to display inside the button
    title: PropTypes.any.isRequired,
    // Text to display for blindness accessibility features
    accessibilityLabel: PropTypes.string,
    style: PropTypes.any,
    // If true, disable all interactions for this component.
    disabled: PropTypes.bool,
    // Handler to be called when the user taps the button
    onPress: PropTypes.func.isRequired,
    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      accessibilityLabel,
      style,
      onPress,
      title,
      disabled,
      testID,
    } = this.props;
    const buttonStyles = [ styles.button, style ];
    const textStyles = [ styles.text ];
    const accessibilityTraits = [ 'button' ];

    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityTraits.push('disabled');
    }

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}>
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>{title}</Text>
        </View>
      </Touchable>
    );
  }
}

export default Button;
