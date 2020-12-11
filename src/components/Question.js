import React from 'react'

function Question(props) {
    const {item} = props
    
    return (
        <div onClick={props.getQuestionId(item.question_id)}>
            <div className='question'>
                <div className='image-name'>
                    <img src={item.owner.profile_image} className='question-image'alt=''/>
                    <p>{item.owner.display_name}</p>
                </div>
                <div className='title-tags'>
                    <p className='title'>{item.title}</p>
                    <div className='question-tags'>
                    {
                        item.tags.map(tag => {
                            return (
                                <p className='tag'>{tag}</p>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='question-upvote'>
                    <i className="fas fa-caret-up"></i>
                    <p>upvote</p>
                    <p>0</p>
                </div>
            </div>
        </div>
    )
}

export default Question
