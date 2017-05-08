const eventsContainer=document.getElementById('news');
if(eventsContainer){
    fetch("newsData.json").then(response=>{return response.json()
    }).then(events=>{const eventsHTML=events.map(event=>{
        return `
			        	<li>
                    <img src="${event.picture}" alt="news image of shrewsbury">
                    <h3>${event.header}</h3>
                    <p>${event.text}</p>
                </li>
			`}).join("\n");eventsContainer.innerHTML=eventsHTML})}
