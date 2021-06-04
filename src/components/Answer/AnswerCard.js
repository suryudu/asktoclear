import React from 'react';

export default function AnswerCard(props) {
    
    const answer=props.answer;
   
    
    return (
            <>
            <tr>
            <td style={{width:'30px'}}></td>
            <td>
               <img src={`https://asktoclearbackend.herokuapp.com/${answer.answerBy.file_path}`} alt={answer.answerBy.name} height='40px' width='40px' />
            </td>
            <td>
                {answer.answerBy.name} {answer.date}
            </td>
        </tr>
        <tr>
            <td style={{width:'30px'}}></td>
            <td></td>
            <td style={{fontSize:'20px'}}>
               {answer.answer}
            </td>
        </tr>

            </>
  
    )
}
