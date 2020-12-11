import React from 'react'
import './QuestionModel.css'
import { Link } from 'react-router-dom'

function QuestionModel(props) {
    const {item} = props
    return (
            <div className='model d-flex flex-row justify-content-between'>
                <div className='model-image-name d-flex flex-column justify-content-start'>
                    <img src={item.owner.profile_image} className='model-image'alt=''/>
                    <p>{item.owner.display_name}</p>
                </div>
                <div className='model-title-tags d-flex flex-column justify-content-around'>
                    <p className='model-title'>{item.title}</p>
                    <div className='d-flex flex-row justify-content-around'>
                        <p>views: {item.view_count}</p>
                        <p>upvotes: {item.score}</p>
                        <p>answerd?: {item.is_answered ? <span>yes</span> : <span>no</span>}</p>
                    </div>
                    <div className='model-question-tags d-flex flex-row'>
                    {
                        item.tags.map(tag => {
                            return (
                                <p className='tag'>#{tag}</p>
                            )
                        })
                    }
                    </div>
                    <a href={item.link} target='_blank' type='button' className='btn btn-primary mx-auto'>View In Stackoverflow</a>
                </div>
                <div className='model-quit d-flex justify-content-start'>
                    <Link to='/'><i className="fas fa-times-circle"></i></Link>
                </div>
            </div>
    )
}

export default QuestionModel
