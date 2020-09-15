import React from "react";

function CardList(props) {
    //We format the classes to lowercase with capital lettering. We don't do this for rarity because seeing those in all caps is just cool.
    let formattedClass = props.class.toLowerCase();
    formattedClass = formattedClass.charAt(0).toUpperCase() + formattedClass.slice(1);


    return (<div className={"card-container"}>
            <h4>{formattedClass} cards:</h4>
            {props.cards.map((value, index) => {
                {if(value.cardClass === props.class) {return <div className={"card-name"} key={index}>
                    <p>Name: {value.name}</p>
                    <p>Set: {value.set}</p>
                    <p>Rarity: {value.rarity}</p>
                    <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                    <p>Cost: {value.cost}</p>
                    {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                    </div>}}})}
            </div>)
}

export default CardList;