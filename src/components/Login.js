import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './Button';
import theme from '../theme';

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  logo: {
    marginBottom: 40
  },
  logo__image: {
    width: 275,
    height: 50
  },
  smartrac: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 325,
    height: 107,
    marginTop: 40
  },
  smartrac__image: {
    width: '35%',
    height: '30%'
  },
  button: {
    height: 50,
    width: '75%',
    backgroundColor: theme.color.primary
  },
  input: {
    height: 50,
    backgroundColor: theme.color.white,
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

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: props.username,
      password: '',
      error: undefined
    }
  }

  handleTextChange = (key, text) => {
    this.setState({
      [key]: text
    });
  }

  validate({ username, password }){
    let errors = [];
    if(!username){
      errors.push('Username is a required field');
    }
    if(!password){
      errors.push('Password is a required field');
    }
    return errors;
  }

  handleSubmit = () => {
    const { username, password } = this.state;
    const { onSubmit } = this.props;
    const errors = this.validate(this.state);
    if(!errors.length){
      onSubmit(username, password);
      this.setState({
        error: undefined,
        password: ''
      });
    } else {
      this.setState({
        error: errors.join('\n')
      });
    }
  }

  componentWillReceiveProps({ username, error }){
    this.setState(state => ({
      ...state,
      username,
      error
    }));
  }

  render(){
    const { onSubmit } = this.props;
    const { username, password, error } = this.state;
    return (
      <View style={ styles.login }>
        <View style={ styles.logo }>
          <Image
            style={ styles.logo__image }
            source={ require('../assets/images/logo.png') }
          />
        </View>
        {
          error &&
            <View style={ styles.error }>
              <Text style={ styles.error__message }>{ error }</Text>
            </View>
        }
        <TextInput
          style={ styles.input }
          autoFocus={ true }
          placeholder="Username"
          placeholderTextColor={ theme.color.gray }
          onChangeText={ this.handleTextChange.bind(this, 'username') }
          underlineColorAndroid={ theme.color.white }
          autoCorrect={ false }
          keyboardType="email-address"
          value={ username }
        />
        <TextInput
          style={ styles.input }
          placeholder="Password"
          placeholderTextColor={ theme.color.gray }
          secureTextEntry={ true }
          onChangeText={ this.handleTextChange.bind(this, 'password') }
          underlineColorAndroid={ theme.color.white }
          autoCorrect={ false }
          value={ password }
        />
        <Button
          style={ styles.button }
          title="Log In"
          onPress={ this.handleSubmit }
        />
        <View style={ styles.smartrac }>
          <Image
            style={ styles.smartrac__image }
            source={ require('../assets/images/smartrac_connect.png') }
          />
        </View>
      </View>
    );
  }
}
