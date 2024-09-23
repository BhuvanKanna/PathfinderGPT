import "./Sidebar.css";
import {assets} from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/context";

export default function Sidebar() {

  const [extended, setExtended] = useState(false);
  const {onSent, previousPrompts, setRecentPrompt, newChat} = useContext(Context);


  const loadPrompt = async(prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar" >
      <div className="top">
        <img src={assets.menu} alt="Menu icon" className="menu" onClick={() => setExtended(prev => !prev)} />

        <div onClick={() => newChat()} className={extended ? "new-chat extended" : "new-chat"}>
          <img src={assets.plus} alt="New chat icon" />
          {extended? <p>New Chat</p> : null }
        </div>
        {extended?  <div className="recent">
          <strong className="recent-title">Recent</strong>
          {previousPrompts.map((item, index) => {
            return(
              <div onClick={() => loadPrompt(item)} className="recent-entry">
              <img src={assets.messenger} alt="Message icon" />
              <p>{item.slice(0,18)}...</p>
            </div>
            );
          })}
        </div> : null }
      </div>
      <div className="bottom">
      {/* <img src={assets.pathfinderlogo} alt="Link to Pathfinder Health"/> */}
      </div>
    </div>
  )
}
