import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {engStrings } from '../../../../shared/utility'

const blogContent = props => {
    const formatter = buildFormatter(engStrings);
    return (
        <div className="site-main__blog">
        <div className="site-main__blog--cnt">
            <div className="site-main__blog--cnt__img">
                <img src={`https://bloggeronly.herokuapp.com/${props.cnt.image[0].id}`} alt="pics"/>
            </div>
            <div className="site-main__blog--cnt__det">
                <h4 className="site-main__blog--cnt__det--title">{props.cnt.title}</h4>
                <p className="site-main__blog--cnt__det--cnt">
               {props.cnt.desc}
                </p>
                <ul className="site-main__blog--cnt__det--info">
                    <li>
                        <FontAwesomeIcon 
                            icon={['fas', 'calendar']} />
                        { `${new Date(props.cnt.created).getDate()}/${new Date(props.cnt.created).getMonth()+1}/ ${new Date(props.cnt.created).getFullYear()}`}
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['fas', 'clock']} />
                        { <TimeAgo date={props.cnt.created} live={false} formatter={formatter}/> }
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default blogContent;