import { useState } from "react";
import { YourTurnField } from "./yourTurnField/yourTurnField";
import { WritingField } from "./writingField/writingField";
import { WaitingActiveWriter } from "./waitingActiveWriter/waitingActiveWriter";
import { PlayerSearchField } from "./playerSearchField/playerSearchField";
import { useSelector } from "react-redux";
import { selectLastNode } from "../../../../redux/roomSlice";
import { selectUserId } from "../../../../redux/userSlice";
import { getTimeDifferenceInMinutes } from "../../../../helpers/dateTimeFunctions";

export const ActionArea = () => {

  const userId = useSelector(selectUserId);
  const lastNode = useSelector(selectLastNode);

  const PickActionComponent = () => {

    const emptyNodeExist = (lastNode.finished_at == null);
    const userAddedLastNode = (lastNode.creator_id == userId);
    const createdDate = new Date(lastNode.created_at);
    const diff = getTimeDifferenceInMinutes(createdDate);
    const addedInLast20 = (diff < 20);

    if (emptyNodeExist) {
      if (userAddedLastNode) return <WritingField />;
      if (addedInLast20) return <WaitingActiveWriter />;
      return <YourTurnField />
    }
    if (userAddedLastNode) return <>{/* A component that shows that you are waiting for someone else to add */}</>
    return <YourTurnField />

  }

  return (
    <>
      <YourTurnField/>
      {/* {PickActionComponent()} */}
    </>
  );
}