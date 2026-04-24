import React from 'react'

export default function QuickLook() {
    const handleScroll = (origin) => {
        let toShowDiv;
        if (origin === "news") {
            toShowDiv = document.querySelector(".top-news");
        } else if (origin === "transfer"){
            toShowDiv = document.querySelector(".breaking");
        } else {
            toShowDiv = document.querySelector(".trending");
        }
        if (toShowDiv)
        toShowDiv.scrollIntoView();
    }
    return (
        <div id="quick-news">
            <div className="news x1">
                <ul>
                    <li onClick={() => handleScroll("transfer")}>
                        TRANSFER: Friday Delight for the Gunners! <span role="img" aria-label="signings icon"> ✍️</span>
                    </li>
                    <li onClick={() => handleScroll("trending")}>
                        TRENDING: Arsenal released their new third kit for the 2021/22 season. <span role="img" aria-label="kit2122 icon">😍</span>
                    </li>
                    <li onClick={() => handleScroll("news")}>
                        BREAKING: Joe leaves for Newcastle! <span role="img" aria-label="breaking news icon"> 🔥</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
