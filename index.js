
let flag=1
function setSearch(){
    ++flag;
    let btn=document.getElementById("search")
    if(flag%2==1){
        btn.innerText="Search"
        window.location.reload()
    }
    else{
        btn.innerText="New Search"
        //document.getElementById("text").innerText="hry"
        let term=document.getElementById("term").value;
        fetch(`https://shazam.p.rapidapi.com/search?term=${term}&locale=en-US&offset=0&limit=5`, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "c2aa1d0f88msh1475c4be31c0f83p1fd487jsn0f39c35134eb",
		"x-rapidapi-host": "shazam.p.rapidapi.com"
	    }
        })
        .then(response => {
	        return response.json()
        })
        .then(res=>{
            let toDisplay=res['tracks']['hits']
            console.log(toDisplay)
            let cardSpace=document.getElementById("card-space")
            toDisplay.forEach(element => {
                let card=makeCard(element['track'])
                cardSpace.appendChild(card)
            });

        })
        .catch(err => {
	        console.error(err);
        });
    }

}

function makeCard(index){
    let divClassCard=document.createElement('div')
    divClassCard.setAttribute("class","card")
    divClassCard.setAttribute("style","width:18rem")
    let cardImage=document.createElement('img')
    cardImage.setAttribute("class","card-img-top")
    cardImage.src=index['images']['coverart']
    cardImage.alt="Cover Art Not Available"
    divClassCard.appendChild(cardImage);
    let cardBody=document.createElement('div')
    cardBody.setAttribute("class","card-body")
    let cardTitle=document.createElement('h5')
    cardTitle.setAttribute("class","card-title")
    cardTitle.innerText=index['title']
    let cardSubTitle=document.createElement('h6')
    cardSubTitle.classList.add("card-subtitle","mb-2","text-muted")
    cardSubTitle.innerText=index['subtitle']
    let link=document.createElement('a')
    link.setAttribute("class","card-link")
    link.href=index['url']
    link.target="_blank"
    link.innerText="Listen!"
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardSubTitle)
    cardBody.appendChild(link)
    divClassCard.appendChild(cardBody)
    return divClassCard
}