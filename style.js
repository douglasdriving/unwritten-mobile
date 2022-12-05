import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 30
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 6
  },

  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6
  },

  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },

  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  body: {
    fontSize: 16
  },

  warning: {
    fontSize: 16,
    color: 'red'
  },

  paragraph: {
    fontSize: 16,
    paddingBottom: 6,
  },

  textCenter: {
    textAlign: 'center'
  },

  formField: {
    width: '100%',
    borderWidth: 2,
    padding: 15
  },

  actionBox: {
    backgroundColor: 'lightgrey',
    padding: 15
  },

  fullScreenCentered: {
    flex: 1,
    backgroundColor: 'lightblue',
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
    backgroundColor: 'gray',
    position: 'absolute',
    margin: '5%',
    marginTop: 40,
    width: '90%',
    padding: 10,
    zIndex: 2,
  },

  inputField: {
    backgroundColor: 'white',
    padding: 0,
    marginBottom: 6,
    fontSize: 16,
    minHeight: 30
  },

});