import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Options from './Options';
import Question from './Question';
import TypeSelector from './TypeSelector';

const CreateSurvey = ({squestions, setSquestions}) => {

    const history = useHistory();
    

    const getRandom = () => { return Math.floor((Math.random() * 1000) + 1)}
    const defaultOptionsState = [{uid: getRandom(), value:''}, {uid: getRandom(), value:''}];
    const [qText, setQtext] = useState('');
    const [qType, setQtype] = useState(0);
    const [options, setOptions] = useState(defaultOptionsState);

    const addOptions =() => {
        // alert("+ clicked");
        let newOptions = {
            uid: getRandom(),
            value:''
        }
        let updatedOptions = [...options];
        updatedOptions.push(newOptions);
        setOptions(updatedOptions);

    }
    const deleteOptions = () => {
        if(options.length === 2){
            alert('Error: A select type questions should have atleast two options');
        }
        else{
        let updatedOptions = [...options];
        updatedOptions.pop();
        setOptions(updatedOptions);
        }
    }

    const updateOptionText = (id, text) => 
        {
            let updatedOptions = [...options];
            //from the options array find the uid same as id and then update
            let changeIndex = updatedOptions.findIndex(x => x.uid === id);
            updatedOptions[changeIndex].value = text;
            setOptions(updatedOptions);
        
    }

    const updateSurveyQuestions = () => {
        let newSurveyQuestion = [...squestions];
        let newQ = {
            qtext : qText,
            qtype: qType,
            options: options
        }
        newSurveyQuestion.push(newQ);
        setSquestions(newSurveyQuestion);
        setQtype(0);
        setQtext('');
        setOptions(defaultOptionsState);
    }

  
    
    const publish = () => {
        updateSurveyQuestions();
        history.push('/published')
    }
    
    return (
        <div>
            <TypeSelector qType={qType} setQtype={setQtype}/>

            {qType !== 0 ?
            <>
             <Question onTextUpdate={setQtext}/>
           
             {options.map((opt, key) =>(
                 <Options
                  key={key}
                  uid = {opt.uid}
                  addOptions={addOptions}
                  deleteOptions = {deleteOptions}
                  updateText = {updateOptionText}
                  />
             ))}
             <button className="btn btn-primary" onClick={() => updateSurveyQuestions()}>Add Questions</button>
            <button className="btn btn-primary" onClick={() => publish()}>Publish</button>
             
             </>
            : null}

            
           
            
        </div>
    );
};

export default CreateSurvey;
