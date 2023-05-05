import React from "react"
import "./Selected.css"

export default function Selected({chosen,removed}){

    function handleRemove(item){
        let newCard=chosen.filter(card=>card.id!==item.id)
        removed(newCard)
        
    }


    const showCard=chosen.map(bot=>{
        return (
            <div key={bot.id} className="selectedCard">
                <div>
                    <img src={bot.avatar_url} alt=""/>
                    <button onClick={()=>handleRemove(bot)}>Remove</button>
                </div>
                <div>
                    <h3>{bot.name}</h3>
                    <p>class: {bot.bot_class}</p>
                    <ul>
                        <li>armor: {bot.armor}</li>
                        <li>health: {bot.health}</li>
                        <li>damage: {bot.damage}</li>
                    </ul>
                </div>
            </div>
        )
    })


    return (
        <div className="selected">
            {showCard}
        </div>
    )
}
