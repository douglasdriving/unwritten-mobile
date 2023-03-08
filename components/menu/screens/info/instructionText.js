import React from "react";
import { styles, textColors2 } from "../../../../style";
import { Text } from "react-native";

export function InstructionText({ }) {
  return (
    <>
      <Text style={[styles.paragraph, textColors2.white]}>
        Unwritten aims to create a casual and fun collaborative writing experience.
        When participating in the stories, try to do so in a relaxed and fun way.
        There is no pressure on that what you write here must be good.
        The point is to enjoy the writing process.
      </Text>
      <Text style={[styles.paragraph, textColors2.white]}>
        If you are unsure of how to start, check out an active camp under the "camps" tab.
        There, you can first see what others have written.
        When you feel ready to start participating, click on the button at the end of a story to add your contribution!
      </Text>
    </>
  );
}

