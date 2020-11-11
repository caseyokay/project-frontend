const BASEURL = "http://localhost:3000/api/v1"
//const renderFlower = flower => {
//     const img = document.querySelector("bouquet-img")

// }

//add a drop down form that shows the flower options based on 
//description. allow the user to add flowers to their bouquet based on
// selection.
// after the selection run it through renderBouquet

const renderBouquet = bouquet => {
    //add a form and set the message based on user input
    const flowersList = document.querySelector("#flowers-list")
    flowersList.innerHTML = ""

    bouquet.flowers.forEach(flower => {
        const li = document.createElement("li")
        li.textContent = flower.name + ": " + flower.description
        flowersList.append(li)
    })
}

//** http://localhost:3000/api/v1/flowers
//** http://localhost:3000/api/v1/bouquets

const getFlower = () => {
    fetch('${BASEURL}/flowers/1')
    .then(r => r.json())
    .then(console.log)
}

getFlower()

const getBouquet = () => {
    fetch("http://localhost:3000/api/v1/bouquets/3")
    .then(r => r.json())
    .then(renderBouquet)
}

getBouquet()