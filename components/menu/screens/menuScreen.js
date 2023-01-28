import { ImageBackground } from "react-native";
import background from '../../../assets/background/campfireBackgroundBlurred.png';

export const MenuScreen = ({ ScreenComponent }) => {

  return (
    <ImageBackground source={background} resizeMode='cover' style={{
      flex: 1
    }}>
      <ScreenComponent />
    </ImageBackground>
  );

}