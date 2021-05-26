import React from 'react'
import News from './News/NEWS';

export default function News_center() {
    React.useEffect(()=> {
        document.getElementById("news-center").classList.add("active")
    })
    return (
        <div className="news-center">
            <News origin={"center"}/>
        </div>
    )
}
