//const renderFlower = flower => {
//     const img = document.querySelector("bouquet-img")

// }


/******** DOM Elements ********/

const selectFlower = document.querySelector("#flower_id")
const navList = document.querySelector("#flower-links")
const flowersInBouquet = document.querySelector("#current-bouquet-flowers")

const bouqNoteForm = document.querySelector('.bouquet-note')
const addFlowerForm = document.querySelector('#flowerbouquet-addition-form'); 


/******** Event Handlers ********/

addFlowerForm.addEventListener('submit', event => {
    event.preventDefault()
    //make a const here of Flower object that we are assigning to a bouquet 
    flowerId = event.target.flower_id.value
    const flowerObj = getOneFlower(flowerId)
    console.log(flowerObj)
    // addOneFlowerToBouquet(flowerObj)
    
    //create an instance of FlowerBouquet, assinging the flower_id as flowerObj

    // const liForNewFlower = document.createElement('li')
    //       liForNewFlower.innerText = "💐" + flowerObj
    // flowersInBouquet.append(liForNewFlower)

    //getOneFlower()
    // addOneFlowerToBouquet()




    // fetch(fromURL, {}).then(response => response.json()).then(console.log)
})


bouqNoteForm.addEventListener('submit', event => {
    event.preventDefault()
    const noteValue = document.querySelector('.note-value').value; 
    
    console.log(noteValue)

    // fetch(fromURL, {}).then(response => response.json()).then(console.log)
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
  
const renderNavLink = (flower) => {
    const li = document.createElement("li")
    li.textContent = flower.name
    li.addEventListener("click", () => {
        console.log("LINK TO FLOWER")

    //   getFlower(flower.id)
    })
navList.append(li)
}
  




// renderBouquetInstanceToBuilding
const renderBouquetFlowers = bouquet => {


    //add a form and set the message based on user input
    flowersInBouquet.innerHTML = ""
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
            const li = document.createElement("li")
            li.textContent = flower.name + ": " + flower.description
            flowersInBouquet.append(li)
        })
}

const addOneFlowerToBouquet = (flower) => {
    // (bouquet, flower) - once working with more than one 

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

    // We will eventually need a dataset association 
    // For presistist Bouquet changes
    // BACKEND - DATABASE 

}

// const removeFlower = (flowerToRemove) => { 
// // taking in the UL -> "current-bouquet-flowers"
//         // flower.remove
//  }







//** http://localhost:3000/api/v1/flowers
//** http://localhost:3000/api/v1/bouquets





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


const getOneFlower = (id) => {
    fetch(`http://localhost:3000/api/v1/flowers/${id}`)
    .then(r=> r.json())
    .then(flower => { addOneFlowerToBouquet(flower) })
}


const getBouquet = (id) => {
    //             (id) - Eventually taking in an id 
    fetch(`http://localhost:3000/api/v1/bouquets/${id}`)
    .then(r => r.json())
    .then(renderBouquetFlowers)
}
getBouquet(3)
//        (currentBouquet)

//This will delete the from the database! not an instance of FlowerBouquet 
const deleteFlowerfromBouquet = (id) => {
    fetch(`http://localhost:3000/flowers/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(console.log)
  }
  