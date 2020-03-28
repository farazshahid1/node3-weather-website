console.log('client side java script file is loaded')


const WeatherForm = document.querySelector('form')
const Search =  document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

//messageOne.textContent='From Java Script'

WeatherForm.addEventListener('Submit', (e)=>{
    e.preventDefault()

    const location = Search.value 
    messageOne.textContent='Loading...'
    messageTwo.textContent = ''

        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
            messageOne.textContent=data.error
           }else{
            messageOne.textContent=data.forecast
            messageTwo.textContent=data.location
           }
        })
    })

    //console.log('testing')
})