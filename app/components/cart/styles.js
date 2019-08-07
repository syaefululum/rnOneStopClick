import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  containerCart: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 5
  },
  containerImage: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  containerText: {
    flex: 1,
    width: '59%',
    borderWidth: 1,
    borderColor: '#d6d7da',
    paddingLeft: 3,
    paddingTop: 2,
    paddingRight: 5
  },
  containerButton: {
    width: '10%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  bottomView: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    // backgroundColor: '#FF9800',
    // justifyContent: 'center',
    // alignItems: 'center',
    //position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: '#d6d7da',
    alignItems: 'center'
  }
});
