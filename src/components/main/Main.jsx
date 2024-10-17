import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";

export default function Main() {

  const { onSent, recentPrompt, showResult, loading, formattedResultData, setInput, input } = useContext(Context);

  // Add event listener for the Enter key
  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === 'Enter' && input) {
        onSent();
      }
    };
    document.addEventListener('keydown', handleEnterKey);
    
    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, [input, onSent]);

  return (
    <div className="main">

        <div className="main-container">
          {
            !showResult ?
            <>
              <div className="greet">
                <p><span>AvocadoGPT</span></p>
              </div>

              <div className="cards">
                <div onClick={() => onSent("What are the best practices for feeding a newborn?")} className="card">
                  <p>What are the best practices for feeding a newborn?</p>
                  <img src={assets.lightbulb} alt="Compass icon" />
                </div>
                <div onClick={() => onSent("How can I help my child sleep better at night?")} className="card">
                  <p>How can I help my child sleep better at night?</p>
                  <img src={assets.lightbulb} alt="Lightbulb icon" />
                </div>
                <div onClick={() => onSent("What are the symptoms of teething in babies?")} className="card">
                  <p>What are the symptoms of teething in babies?</p>
                  <img src={assets.lightbulb} alt="Messenger icon" />
                </div>
                <div onClick={() => onSent("How do I know if my child is reaching developmental milestones?")} className="card">
                  <p>How do I know if my child is reaching developmental milestones?</p>
                  <img src={assets.lightbulb} alt="Code icon" />
                </div>
              </div>
            </>
            : 
            <div className="result">
              <div className="result-title">
                <p>{recentPrompt}</p>
                <img src={assets.user} alt="User profile" />
              </div>
              <div className="result-data">
                <img src={assets.avocadoicon} alt="Avocado Logo" />
                {loading ?
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                :
                <p dangerouslySetInnerHTML={{__html: formattedResultData}}></p>
                }
              </div>
            </div>
          }

          <div className="main-bottom">
            <div className="search-box">
              <input 
                onChange={(e) => setInput(e.target.value)} 
                value={input} 
                type="text" 
                placeholder="Enter your question" 
              />
            </div>
            <a href = "avocadohealth.ai">
              avocadohealth.ai
            </a>
          </div>
        </div>
    </div>
  )
}
