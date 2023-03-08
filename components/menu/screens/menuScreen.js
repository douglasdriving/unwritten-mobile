import { ImageBackground, View } from "react-native";
import background from '../../../assets/background/campfireBackgroundBlurred.png';
import { styles } from "../../../style";

export const MenuScreen = ({ ScreenComponent }) => {

  return (
    <ImageBackground source={background} resizeMode='cover' style={{
      flex: 1
    }}>
      <View style={styles.menuPageContainer}>
        <ScreenComponent />
      </View>
    </ImageBackground>
  );

}