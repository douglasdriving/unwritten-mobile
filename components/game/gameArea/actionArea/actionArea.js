import { useState } from "react";
import { CanWriteField } from "./canWriteField/canWriteField";
import { WritingField } from "./writingField/writingField";
import { WaitingActiveWriter } from "./waitingActiveWriter/waitingActiveWriter";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { WaitingForOtherNodeField } from "./waitingForOtherNode/waitingForOtherNode";
import { useSelector } from "react-redux";
import { selectLastFinishedScenario, selectLastNode } from "../../../../redux/roomSlice";
import { selectUserId } from "../../../../redux/userSlice";
import { addedInLastMinutes } from "../../../../helpers/dateTimeFunctions";

export const ActionArea = () => {

  const userId = useSelector(selectUserId);
  const lastNode = useSelector(selectLastNode);
  const lastFinishedScenario = useSelector(selectLastFinishedScenario)

  const PickActionComponent = () => {

    if (!userId) {
      console.error('no user id detected');
      return <></>;
    }

    console.log('last node is: ', lastNode);

    const emptyNodeExist = (lastNode.finished_at == null);
    const userAddedLastNode = (lastNode.creator_id == userId);
    const userAddedLastScenario = (lastFinishedScenario.creator_id == userId);
    const addedInLast20 = addedInLastMinutes(lastNode.created_at, 20);

    if (userAddedLastScenario) return <WaitingForOtherNodeField />;
    if (!emptyNodeExist) return <CanWriteField />;
    if (userAddedLastNode) return <WritingField />;
    if (addedInLast20) return <WaitingActiveWriter />;
    return <CanWriteField />;

  }

  return (
    <>
      {PickActionComponent()}
    </>
  );
}