import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 40,
    margin: 10,
    borderRadius: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#88cc88'
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginBox: {
    margin: 10
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    width: 120,
    height: 120
  },
  scrollView: {
    backgroundColor: '#2299ec'
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  socialButtonStyle: {
    alignItems: 'center',
    marginTop: 20
  },
  errorStyle: {
    paddingLeft: 10,
    color: 'red'
  },
  generalError: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'red'
  },
  generalSuccess: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'green'
  },
  generalText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  }
});
