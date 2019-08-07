import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f7fd',
    flexDirection: 'row'
  },
  primary: {
    color: 'rgb(116, 70, 195)'
  },
  marginBox: {
    alignItems: 'center',
    margin: 20
  },
  title: {
    fontSize: 18,
    margin: 20
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 20,
    alignItems: 'center'
  },
  cardViewStyle: {
    width: 200,
    height: 150,
    margin: 5
  },
  child: {
    width: 300
  },
  titleView: {
    padding: 10,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  titleCard: {
    fontSize: 16,
    color: 'black'
  }
});
