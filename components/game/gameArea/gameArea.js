import { ScrollView } from 'react-native';
import { useRef } from 'react';
import { styles } from '../../../style.js';
import { StoryContent } from './storyArea/storyContent.js';
import { Space } from '../../smart/visuals.js';
import { ActionArea } from './actionArea/actionArea.js';

export const GameArea = (props) => {

  const scrollViewRef = useRef();

  return (
    <ScrollView
      style={styles.gameWindow}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
    >
      <StoryContent {...props} />
      {Space(15)}
      {!props.readOnly && <ActionArea {...props} />}
      {Space(200)}
    </ScrollView>
  );
}