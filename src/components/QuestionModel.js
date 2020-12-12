import React from 'react'
import './QuestionModel.css'
import { Link } from 'react-router-dom'

function QuestionModel(props) {
    const {item} = props
    return (
            <div className='model d-flex flex-row justify-content-between'>
                <div className='model-image-name d-flex flex-column justify-content-start align-items-center'>
                    <img src={item.owner.profile_image} className='model-image'alt=''/>
                    <p>{item.owner.display_name}</p>
                </div>
                <div className='model-title-tags d-flex flex-column justify-content-around'>
                    <p>{item.title}</p>
                    <div className='d-flex flex-row justify-content-around'>
                        <div className='stats'>
                            <i class="fas fa-eye i-icon"></i>
                            <span>{item.view_count}</span>
                            <p>views</p>
                        </div>
                        <div className='stats'>
                            <i className="fas fa-caret-up i-icon"></i>
                            <span>{item.score}</span>
                            <p>upvotes</p>
                        </div>
                        <div className='stats'>
                            {item.is_answered ? <i class="fas fa-check i-icon"></i> : <i className="fas fa-times-circle i-icon"></i>}                            
                            <span>{item.is_answered ? 'yes' : 'no'}</span>
                            <p>answerd?</p>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-center'>
                    {
                        item.tags.map(tag => {
                            return (
                                <p className='tag' key={tag}>#{tag}</p>
                            )
                        })
                    }
                    </div>
                    <a href={item.link} target='_blank' type='button' className='stack-link btn btn-primary mx-auto'>View In Stackoverflow</a>
                </div>
                <div className='d-flex justify-content-start'>
                    <Link to='/'><i className="fas fa-times-circle cross"></i></Link>
                </div>
            </div>
    )
}

export default QuestionModel
