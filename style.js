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
  },

  gameWindow: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 120,
    padding: 30,
  },

  writingField: {
    padding: 10,
    height: 300,
    textAlignVertical: 'top',
    fontSize: 16,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 2,
  },

});