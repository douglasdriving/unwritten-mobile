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

export const ActionArea = ({ scrollDown, AddFakeNode }) => {

  const userId = useSelector(selectUserId);
  const lastNode = useSelector(selectLastNode);
  const lastFinishedScenario = useSelector(selectLastFinishedScenario)

  const [customOpen, setCustomOpen] = useState(false);

  const PickActionComponent = () => {

    if (!userId) {
      console.error('no user id detected');
      return <></>;
    }

    if (customOpen) {
      if (customOpen === 'WritingField') return <WritingField scrollDown={scrollDown} setCustomOpen={setCustomOpen} AddFakeNode={AddFakeNode}/>;
      else if (customOpen === 'WaitingActiveWriter') return <WaitingActiveWriter />;
      else if (customOpen === 'PlayerSearchField') return <PlayerSearchField />;
      else if (customOpen === 'WaitingForOtherNodeField') return <WaitingForOtherNodeField />;
      else if (customOpen === 'CanWriteField') return <CanWriteField scrollDown={scrollDown} setCustomOpen={setCustomOpen} />;
      else {
        console.error('customOpen is not a valid value');
        return <></>
      };
    }

    const emptyNodeExist = (lastNode.finished_at == null);
    const userAddedLastNode = (lastNode.creator_id == userId);
    const userAddedLastScenario = (lastFinishedScenario.creator_id == userId);
    const addedInLast20 = addedInLastMinutes(lastNode.created_at, 20);

    if (userAddedLastScenario) return <WaitingForOtherNodeField />;
    if (!emptyNodeExist) return <CanWriteField scrollDown={scrollDown} setCustomOpen={setCustomOpen} />;
    if (userAddedLastNode) return <WritingField scrollDown={scrollDown} setCustomOpen={setCustomOpen} AddFakeNode={AddFakeNode}/>;
    if (addedInLast20) return <WaitingActiveWriter />;
    return <CanWriteField scrollDown={scrollDown} setCustomOpen={setCustomOpen} />;

  }

  return (
    <>
      {PickActionComponent()}
    </>
  );
}