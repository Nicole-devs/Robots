import React, {useEffect,useState} from "react"
import "./Show.css"
import Selected from "./Selected"

export default function Show() {
    let url = "http://localhost:4000/bots"
    const [rawData, setRawData] = useState([])
    const [cardData, setCardData] = useState([])


    useEffect(()=>{
        fetch ("http://localhost:4000/bots")
        .then (response=>response.json())
        .then (data=>{
            setRawData(data)
        })

    }, [])


    function handleClick(card) {
        let check=false
        console.log(cardData.length)
        if (cardData.length===0){
            setCardData([...cardData,card])
        }
        else {
            cardData.forEach(item=>{
                if (item.id===card.id){
                    check=true
                    return 0
                }
            })
            if (check===false){
                setCardData([...cardData,card])
            }
        }
        console.log(cardData)
    }
        
    function handleDelete(bot){
        let newShow=rawData.filter(card=>card.id!==bot.id)
        setRawData(newShow)

        fetch (`http://localhost:4000/bots/${bot.id}`,{
            method: 'DELETE'
        })

        alert (`Bot Id:${bot.id} Deleted`)
    }

    const display = rawData.map(bot=>{
        return (
            <div key={bot.id} className="card" onClick={()=>handleClick(bot)}>
                <div>
                    <img src={bot.avatar_url} alt=""/>
                    <button onClick={()=>handleDelete(bot)}>Delete</button>
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
        <div>
            <Selected chosen={cardData} removed={setCardData}/>
            <h1>Liar</h1>
            {display}
           
        </div>
    )
}