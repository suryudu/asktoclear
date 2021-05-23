import React from 'react';

export default function AnswerCard(props) {
    
    const answer=props.answer;
    const key=props.number;
    console.log(answer.answerBy.file_path)
    return (
            <>
            <tr>
            <td style={{width:'30px'}}></td>
            <td>
               <img src={`http://localhost:3003/${answer.answerBy.file_path}`} height='40px' width='40px' />
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
