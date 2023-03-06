import { ScrollView, ImageBackground } from 'react-native';
import { useRef } from 'react';
import { styles, gameStyle } from '../../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Space } from '../../smart/visuals.js';
import { ActionArea } from './actionArea/actionArea.js';
import { useSelector } from 'react-redux';
import { selectReadOnly } from '../../../redux/roomSlice.js';
import background from '../../../assets/background/campfireBackgroundBlurred.png';

export const GameArea = () => {

  const scrollViewRef = useRef();
  const readOnly = useSelector(selectReadOnly);

  const ScrollDown = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }

  return (
    <ImageBackground source={background} resizeMode='cover'>
      <ScrollView
        style={gameStyle.gameWindow}
        ref={scrollViewRef}
      // onContentSizeChange={ScrollDown}
      >

        <StoryContent />
        {Space(15)}
        {!readOnly && <ActionArea scrollDown={ScrollDown} />}
        {Space(200)}

      </ScrollView>
    </ImageBackground>
  );
}