import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingActiveWriter } from "./waitingActiveWriter/waitingActiveWriter";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { WaitingForOtherNodeField } from "./waitingForOtherNode/waitingForOtherNode";
import { useSelector } from "react-redux";
import { selectLastNode } from "../../../../redux/roomSlice";
import { selectUserId } from "../../../../redux/userSlice";
import { addedInLastMinutes } from "../../../../helpers/dateTimeFunctions";

export const ActionArea = () => {

  const userId = useSelector(selectUserId);
  const lastNode = useSelector(selectLastNode);

  const PickActionComponent = () => {

    const emptyNodeExist = (lastNode.finished_at == null);
    const userAddedLastNode = (lastNode.creator_id == userId);
    const addedInLast20 = addedInLastMinutes(lastNode.created_at, 20);

    if (emptyNodeExist) {
      if (userAddedLastNode) return <WritingField />;
      if (addedInLast20) return <WaitingActiveWriter />;
      return <YourTurnField />
    }
    if (userAddedLastNode) return <WaitingForOtherNodeField />;
    return <YourTurnField />;

  }

  return (
    <>
      {PickActionComponent()}
    </>
  );
}