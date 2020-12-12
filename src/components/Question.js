import React from 'react'
import './Question.css'

function Question(props) {
    const {item} = props

    return (
            <div className='question d-flex flex-row justify-content-between align-items-center'>
                <div className='image-name d-flex flex-column justify-content-center align-items-center'>
                    <img src={item.owner.profile_image} className='question-image' alt=''/>
                    <p>{item.owner.display_name}</p>
                </div>
                <div className='title-tags d-flex flex-column justify-content-between align-items-center'>
                    <p className='title'>{item.title}</p>
                    <div className='d-flex flex-row justify-content-around'>
                    {
                        item.tags.map(tag => {
                            return (
                                <p className='tag' key={tag}>#{tag}</p>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='question-upvote d-flex flex-column align-items-center'>
                    <i className="fas fa-caret-up"></i>
                    <p>upvote</p>
                    <p>{item.score}</p>
                </div>
            </div>
    )
}

export default Question
