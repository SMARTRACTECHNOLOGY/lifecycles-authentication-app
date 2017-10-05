import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './Button';
import theme from '../theme';

const styles = StyleSheet.create({
  register: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.color.primary
  },
  input: {
    height: 50,
    backgroundColor: theme.color.lightestGray,
    borderWidth: 0,
    marginBottom: 20,
    width: '75%',
    elevation: 2,
    paddingLeft: 10,
    fontSize: 18
  },
  textArea: {
    height: 100,
    backgroundColor: theme.color.lightestGray,
    borderWidth: 0,
    marginBottom: 30,
    width: '75%',
    elevation: 2,
    paddingLeft: 10,
    fontSize: 18
  },
  title: {
    height: 50,
    fontSize: 36,
    color: theme.color.primary,
    marginBottom: 70,
  },
  error: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    backgroundColor: theme.color.red,
    padding: 20,
    width: '75%',
    marginBottom: 20,
    elevation: 4
  },
  error__message: {
    color: theme.color.white,
    textAlign: 'left',
    fontSize: 18
  }
});

export default class Registration extends React.Component {

  constructor(props) {
    super(props);
    const { initialValues: { registration = {}} } = props;
    this.state = {
      name: undefined,
      description: undefined,
      imageUrl: undefined,
      ...registration,
      behavior: 'padding'
    };
  }

  handleTextChange = (key, text) => {
    this.setState({
      [key]: text
    });
  }

  handleSubmit = () => {
    const { name, description, imageUrl } = this.state;
    // Just persisting name and description for now
    this.props.onSubmit({ name, description });
    this.handleKeyboardDismiss();
  }

  handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  }

  render() {
    const { name, description } = this.state;
    const { error, title, isUpdate } = this.props;
    return (
      <View style={ styles.register }>
        { title && <Text style={styles.title}>{ title }</Text> }
        {
          error &&
            <View style={ styles.error }>
              <Text style={ styles.error__message }>{ error }</Text>
            </View>
        }
        <TextInput
          style={ styles.input }
          placeholder="Name"
          placeholderTextColor={ theme.color.gray }
          onChangeText={ this.handleTextChange.bind(this, 'name') }
          underlineColorAndroid={ theme.color.white }
          autoCorrect={ false }
          value={ name }
        />
        <TextInput
          style={ styles.textArea }
          placeholder="Description"
          placeholderTextColor={ theme.color.gray }
          onChangeText={ this.handleTextChange.bind(this, 'description') }
          underlineColorAndroid={ theme.color.white }
          autoCorrect={ false }
          value={ description }
          multiline={ true }
          editable={ true }
          maxLength={ 280 }
          returnKeyType='done'
          onSubmitEditing={ Keyboard.dismiss }
          blurOnSubmit={ true }
          onEndEditing={ this.handleKeyboardDismis }
        />
        <KeyboardAvoidingView behavior={ this.state.behavior }>
          <Button
            style={ styles.button }
            title={ isUpdate ? 'Update' : 'Register' }
            onPress={ this.handleSubmit }
          />
        </KeyboardAvoidingView>
      </View>

    )
  }
}
