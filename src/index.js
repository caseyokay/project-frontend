//const renderFlower = flower => {
//     const img = document.querySelector("bouquet-img")

// }


const FLOWERS_URL = "http://localhost:3000/api/v1/flowers"
const BOUQUETS_URL = "http://localhost:3000/api/v1/bouquets"
// const FLOWER_BOUQUETS_URL = "http://localhost:3000/api/v1/flower_bouquets"


/******** DOM Elements ********/

const selectFlower = document.querySelector("#flower_id")
const navList = document.querySelector("#flower-links")
const flowersInBouquet = document.querySelector("#current-bouquet-flowers")

const bouqNoteForm = document.querySelector('.bouquet-note')
const noteArea = document.querySelector('.note-value')
const addFlowerForm = document.querySelector('#flowerbouquet-addition-form'); 


/******** Event Handlers ********/

addFlowerForm.addEventListener('submit', event => {
    event.preventDefault()
    flowerId = event.target.flower_id.value
    
    //make a const here of Flower object that we are assigning to a bouquet 
    const flowerObj = getOneFlower(flowerId, 3) //  (3) = bouquetID
          //console.log(flowerObj)
    
    
    // addOneFlowerToBouquet(flowerObj)
    

    //create an instance of FlowerBouquet, assinging the flower_id as flowerObj


    //getOneFlower()
    // addOneFlowerToBouquet()


})


bouqNoteForm.addEventListener('submit', event => {
    event.preventDefault()
    const noteValue = noteArea.value; 
    
    console.log(noteValue)
    // build out a renderNote(noteValue) function
    // make a POST req//
    // const newNoteObj = {
    //     newNoteValue: newNoteObj,
    //     BouquetId: 3
    // }
    // updateBouquetNote(newNoteObj)
    updateBouquetNote(noteValue)
})


flowersInBouquet.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.matches("button")) {
        // remove the flower from the page!
        deleteFlowerfromBouquet(event.target.dataset.id)
        event.target.parentElement.remove()
      }
})




/******** Render Functions ********/

const renderOption = (flower) => {
    const option = document.createElement("option")
    option.textContent = flower.description
    option.value = flower.id
    selectFlower.append(option)
  }

//**** Render Flower Nav Links *****/
  
const renderNavLink = (flower) => {
    const button = document.createElement('button')
    button.setAttribute("id", `flower-button-${flower.id}`)
    button.textContent = flower.name
    
    button.addEventListener("click", () => {
    //iterate through the flower, create a card
    //potentailly use toggle to show and hide the information
    // 
    console.log(`${flower.name}: ${flower.id}`)
    const li = document.createElement("li")
    li.className = "card"
    li.innerHTML = `
    <div class="flower-image">
        <img src=${flower.image_url} alt=${flower.name} style="max-width: 200px";>
        <button class="close-button">X</button>
    </div>
    <div class="flower-content">
        <h4>${flower.name}</h4>
        <p class="flower-description">${flower.description}</p>
    </div>
    `
    console.log(li)
    navList.innerHTML =''
    navList.append(li)
    
    const closeButton = navList.querySelector(".close-button")
        closeButton.addEventListener("click", () => {
        console.log("CLOSE")
        navList.innerHTML =''
        getAllFlowers()
        })
//   getFlower(flower.id)
})

    navList.append(button)
}
  



// renderBouquetInstanceToBuilding
const renderBouquetFlowers = (bouquet) => {

    noteArea.value = bouquet.note
    
    addFlowersToBouquet(bouquet)





    
    //add a form and set the message based on user input
    // flowersInBouquet.innerHTML = ""
    // !! FUCNTION: clearing flowers 


    // Add Flower Form
        //add a drop down form that shows the flower options based on 
        //description. allow the user to add flowers to their bouquet based on
        // selection.
        // after the selection run it through renderBouquet

    // addFlowersToBouquet(flower)


    // Remove Flower Option
    // 


}
// FUCNTION: clearing flowers 
//           flowersInBouquet.innerHTML = ""




// Bouquets that are already made 
const addFlowersToBouquet = (bouquet) => {

        bouquet.flowers.forEach(flower => {


            // addFlowersToBouquet(flower, bouquet.id)
            
            
            const li = document.createElement("li")
            li.textContent =  "💐 " + flower.name + ": " + flower.description

            const button = document.createElement("button")
            button.textContent = "X"
            button.dataset.id = flower.id
        
            flowersInBouquet.append(li, button)


        })
}

const addOneFlowerToBouquet = (flower, bouquet) => {
    //                        (flower, bouquet) - once working with more than one 

    const li = document.createElement("li")
    li.textContent = "💐 " + flower.name + ": " + flower.description
    /*
     Eventually change Li to Div Tag
        Div 
            -> Image Tag
            -> { Some Inner Text }

     const li = document.createElement("div")
    */
   

    const button = document.createElement("button")
    button.textContent = "X"
    button.dataset.id = flower.id

    flowersInBouquet.append(li, button)
    // Want to change name?


    // const XXId = parentDivORTAGXX.dataset.id; 

    const destURL = "http://localhost:3000/api/v1/flower_bouquets"
    //FLOWER_BOUQUETS_URL //+ `/${flower.id}`; 
    console.log(destURL);    

    fetch("http://localhost:3000/api/v1/flower_bouquets", { 
          method: 'POST',
          headers: { "Content-Type" : "application/json", "Accept" : "application/json" },    
          body: JSON.stringify({ 
              
            flower_id: flower.id,
            bouquet_id: bouquet
             
          }) 
          //console.log("BIGBODYJASON")
    })
    .then(response => response.json())    
    /* .then(console.log) */
    .then(/* makeThisChange => */  console.log('FRONT-END CHANGES')  /* // == Display == // */ )
    
    // We will eventually need a dataset association 
    // For presistist Bouquet changes
    // BACKEND - DATABASE 

}

// const removeFlower = (flowerToRemove) => { 
// // taking in the UL -> "current-bouquet-flowers"
//         // flower.remove
//  }













/******** Fetches ********/

const getAllFlowers = () => {
    fetch("http://localhost:3000/api/v1/flowers")
    .then(r => r.json())
    .then(flowers => {
        flowers.forEach(flower =>{
            renderNavLink(flower)
            renderOption(flower)
        })
    })
    // const flower.dataset = flower.id
}
getAllFlowers()
//  **  Necessary for page load - All Flowers to choose from


const getOneFlower = (flowerID, bouquetID) => { //  PREVIOUSLY:JUST:: (flowerID, bouquetID)
    fetch(`http://localhost:3000/api/v1/flowers/${flowerID}`)
    .then(r=> r.json())
    .then(flower => { addOneFlowerToBouquet(flower, bouquetID) }) // (flower, bouquetID)
}


const getBouquet = (id) => {
    //             (id) - Eventually taking in an id 
    fetch(`http://localhost:3000/api/v1/bouquets/${id}`)
    .then(r => r.json())
    .then(renderBouquetFlowers)
}
getBouquet(3)
//        (currentBouquet)
//  **  Necessary for page load - Get current Bouquet and all of its flowers


//This will delete the from the database! not an instance of FlowerBouquet 
const deleteFlowerfromBouquet = (id) => {
    fetch(`http://localhost:3000/flowers/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(console.log)
  }
  
//
const updateBouquetNote = (newNoteValue) => {
    fetch(`http://localhost:3000/api/v1/bouquets/3`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            note: newNoteValue
        })
    })
    .then(r=> r.json())
    .then(console.log)
}
