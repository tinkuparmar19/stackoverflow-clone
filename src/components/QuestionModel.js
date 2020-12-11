import React from 'react'

function QuestionModel(props) {
    const {qidata} = props
    return (
        <div>
            <p>{qidata.title}</p>
            <p>{qidata.owner.display_name}</p>
        </div>
    )
}

export default QuestionModel
