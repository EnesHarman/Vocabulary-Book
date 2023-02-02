import React, { useEffect, useState } from 'react'
import "./Questions.css"
import { AiOutlineEyeInvisible, AiOutlineEye, AiTwotoneEye } from 'react-icons/ai';
import vocabularies from '../../files/Vocabularies';
const Questions = () => {

  const [infoState, setInfoState] = useState("start")
  const [currentElement, setCurrentElement] = useState({});

  const [vocabularyArray, setVocabularyArray] = useState([]);

  useEffect(() => {
    readyVocabularyArray();
  }, [])

  const readyVocabularyArray = () => {
    const lines = vocabularies.split("\n");

    const mappedArray = lines.map(element => {
      const [name, description, sampleSentence] = element.split(" - ");
      return { name, description, sampleSentence }
    });
    setVocabularyArray(mappedArray)

  }

  const popRandomElement = () => {
    if (vocabularyArray.length === 1) {
      alert("Done!")
      readyVocabularyArray()
    }
    var randomIndex = Math.floor(Math.random() * vocabularyArray.length);
    var element = vocabularyArray[randomIndex];
    vocabularyArray.splice(randomIndex, 1);
    setCurrentElement(element);
  }

  const start = () => {
    setStatus();
    popRandomElement();
  }

  const setStatus = () => {
    if (infoState == "start") {
      setInfoState("nothing");
    }
    else if (infoState == "nothing") {
      setInfoState("sentence");
    }
    else if (infoState == "sentence") {
      setInfoState("description");
    }
    else {
      setInfoState("nothing");
    }
  }

  return (
    <div id='questions'>
      {infoState == "start" && <div className='start' onClick={() => start()}>
        <h1 className='title'>Vocabulary Book 2.0</h1>
        <div className='start_button'> Start </div>
        <h4 className='programmer'>Created By Enes HARMAN</h4>
      </div>}
      {infoState != "start" && <div className='question'>
        <div className='question_text'>{currentElement.name}</div>
        <div className='info-area'>

          {infoState != "start" && infoState != "nothing" && <h3 className='info-area_kind'>
            <hr></hr>{(infoState == "sentence" && "Sentence") || (infoState == "description" && "Description")}<hr></hr>
          </h3>}

          {(infoState == "sentence") && <div className='question_sample-sentence'>
            {currentElement.sampleSentence}
          </div>}
          {infoState == "description" && <div className='question_description'>
            {currentElement.description}
          </div>}
        </div>

        <div className='question_buttons row'>
          <div className='next_button col-7' onClick={() => popRandomElement()}>Next</div>
          <div className='info_button col-3' onClick={() => setStatus()}>
            {infoState == "nothing" && <AiOutlineEyeInvisible></AiOutlineEyeInvisible> ||
              infoState == "sentence" && <AiOutlineEye></AiOutlineEye> ||
              infoState == "description" && <AiTwotoneEye></AiTwotoneEye>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Questions