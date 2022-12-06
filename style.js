import { StyleSheet } from 'react-native';

export const colors = {
  black: '#000000',
  dark: '#372755',
  light: '#4A3C65',
  fire: '#FFB68F',
  white: '#FFFFFF'
}

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 30
  },

  title: {
    fontSize: 30,
    marginBottom: 15,
    fontFamily: 'Title-Bold'
  },

  h1: {
    fontSize: 22,
    marginBottom: 6,
    fontFamily: 'Title-Bold',
    color: colors.white,
  },

  h2: {
    fontSize: 18,
    marginBottom: 6,
    marginTop: 6,
    fontFamily: 'Title-Bold',
    color: colors.dark,
  },

  h3: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: 'Body-Bold',
    color: colors.white,
  },

  body: {
    fontSize: 16,
    fontFamily: 'Body',
    color: colors.light
  },

  warning: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Body'
  },

  paragraph: {
    fontSize: 16,
    paddingBottom: 6,
    fontFamily: 'Body',
    color: colors.light,
  },

  textCenter: {
    textAlign: 'center'
  },

  formField: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.fire,
  },

  actionBox: {
    backgroundColor: 'lightgrey',
    padding: 15
  },

  fullScreenCentered: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    textAlign: 'center',
  },

  alert: {
    fontSize: 16,
    backgroundColor: 'pink',
  },

  listItem: {
    backgroundColor: 'white',
    width: 300,
    marginTop: 5,
    padding: 10,
  },

  storyNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },

  storyNavButton: {
    opacity: 0.2,
    borderRadius: 35,
    backgroundColor: 'black',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  gameWindow: {
    backgroundColor: 'white',
    paddingTop: 120,
    padding: 30,
  },

  roomMenu: {
    backgroundColor: 'lightgray',
    position: 'absolute',
    margin: '5%',
    marginTop: 40,
    width: '90%',
    zIndex: 2,
    borderWidth: 2
  },

  inputField: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 6,
    fontSize: 16,
    minHeight: 30,
    fontFamily: 'Body',
    color: colors.light,
  },

  cover: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
  },

});