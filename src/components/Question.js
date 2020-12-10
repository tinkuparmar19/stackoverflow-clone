import React from 'react'
import 'materialize-css';
import { Button, Card, Row, Col } from 'react-materialize';

function Question(props) {
    //console.log(props.item)
    const {item} = props
    console.log(item)

    return (
        <div className='container question'>
            <div className='card'>
                <div>
                    <div>
                        <img src={item.owner.profile_image} className='rounded float-start'/>
                    </div>
                    <p>{item.owner.display_name}</p>
                </div>
                <div className='card-body'>
                    <p>{item.title}</p>
                    {
                        item.tags.map(tag => {
                            <p>{tag}</p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Question
