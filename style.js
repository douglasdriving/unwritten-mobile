import { StyleSheet, Dimensions } from 'react-native';

export const windowSize = Dimensions.get('window');
export const windowWidth = windowSize.width;
export const windowHeight = windowSize.height;

export const appDimensions = {
  borderRadius: 10,
}

export const colors = {
  black: '#000000',
  dark: '#372755',
  light: '#4A3C65',
  fire: '#FFB68F',
  white: '#FFFFFF',
  green: '#72CA98'
}

export const colors2 = {
  black: '#000000',
  white: '#FFFFFF',
  night: '#061432',
  moss: '#06454E',
  wood: '#B04A2E',
  red: '#D84710',
  orange: '#E97A17',
  yellow: '#FAAD1E',
  light: '#F5C686'
}

export const transparentColors = {
  black: '#00000050',
  dark: '#37275550',
  light: '#4A3C6550',
  fire: '#FFB68F50',
  white: '#FFFFFF50',
  green: '#72CA9850'
}

export const textColors = StyleSheet.create({

  white: {
    color: colors.white,
  },

  black: {
    color: colors.black
  },

  dark: {
    color: colors.dark
  },

  light: {
    color: colors.light
  },

  fire: {
    color: colors.fire
  },

})

//create text color stylesheet out of colors 2
const textColorObj = {};
Object.keys(colors2).forEach(key => {
  textColorObj[key] = { color: colors2[key] };
})
export const textColors2 = StyleSheet.create(textColorObj);

//create transparent color sheet from colors 2
const transparentColors2temp = {};
Object.keys(colors2).forEach(key => {
  transparentColors2temp[key] = colors2[key] + '50';
})
export const transparentColors2 = transparentColors2temp;


export const styles = StyleSheet.create({

  faded: {
    opacity: 0.4,
  },

  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 30
  },

  menuPageContainer: {
    flex: 1,
    backgroundColor: transparentColors.black,
    padding: 30,
    paddingTop: 60
  },

  title: {
    fontSize: 35,
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
    color: colors2.night
  },

  bold: {
    fontWeight: 'bold'
  },

  italic: {
    fontStyle: 'italic'
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
    backgroundColor: transparentColors.black,
    borderRadius: appDimensions.borderRadius
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    // paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors2.night,
    borderBottomWidth: 1,
    borderBottomColor: colors2.white,
  },

  storyNavButton: {
    // opacity: 0.2,
    // borderRadius: 35,
    // backgroundColor: colors.dark,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  roomMenu: {
    backgroundColor: colors2.light,
    borderRadius: appDimensions.borderRadius,
    position: 'absolute',
    margin: '5%',
    marginTop: 40,
    width: '90%',
    zIndex: 2,
    // borderWidth: 2
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

  inputFieldLine: {
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
    marginBottom: 6,
    fontSize: 16,
    minHeight: 30,
    fontFamily: 'Body',
    color: colors.white,
  },

  cover: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
  },

  overlay: {
    alignSelf: 'center',
    height: '90%',
    width: '90%',
    position: 'absolute',
    backgroundColor: colors.white,
    zIndex: 10,
  },

  scrollBox: {
    backgroundColor: colors.light,
    padding: 10,
  },

  darkenedBox: {
    borderRadius: appDimensions.borderRadius,
    backgroundColor: transparentColors2.black,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  errorText: {
    fontSize: 16,
    paddingBottom: 6,
    fontFamily: 'Body',
    color: colors2.red,
  }

});

export const menyStyles = StyleSheet.create({

  feedItem: {
    backgroundColor: colors2.light,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: appDimensions.borderRadius,
  },

})

export const gameStyle = StyleSheet.create({

  gameWindow: {
    backgroundColor: transparentColors2.night,
    paddingTop: 120,
    padding: 30,
  },

  actionBox: {
    borderWidth: 2,
    borderColor: colors2.white,
    borderRadius: appDimensions.borderRadius,
    padding: 15,
  },

})