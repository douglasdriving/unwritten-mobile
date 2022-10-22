import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: 50,
    padding: 30,
  },

  h1: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  h2: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  body: {
    fontSize: 16
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
    opacity: 0.3,
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

  inputFieldStyle: {
    backgroundColor: 'white',
    padding: 0,
    //height: (props.fieldHeight ? props.fieldHeight : 30),
    //textAlignVertical: (props.fieldHeight ? 'top' : 'center'),
    fontSize: 16,
  },

});