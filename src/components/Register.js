import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
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
    height: 50,
    width: '75%',
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
    marginBottom: 20,
    width: '75%',
    elevation: 2,
    paddingLeft: 10,
    fontSize: 18
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

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      description: null
    }
  }

  handleTextChange = (key, text) => {
    this.setState({
      [key]: text
    });
  }

  handleSubmit = () => {
    console.log("handleSubmit props", this.props);
    const { onSubmit } = this.props;
    onSubmit({...this.state});
  }

  render () {
    console.log("render props", this.props);
    const { name, description } = this.state;
    const { error } = this.props;
    return (
      <View style={ styles.register }>
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
          maxLength={ 50 }
        />
        <Button 
          style={ styles.button }
          title="Register"
          onPress={ this.handleSubmit }
        />
      </View>
    )
  }
}