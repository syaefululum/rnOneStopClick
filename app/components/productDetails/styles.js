import { StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeCotainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: 300,
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  detailContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  productName: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10
  },
  priceContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  priceText: {
    flex: 1,
    width: '70%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  priceButton: {
    flex: 1,
    borderWidth: 1,
    width: '28%',
    borderColor: '#d6d7da'
  },
  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
