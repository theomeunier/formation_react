let n = 0

function render(){
    const title = React.createElement('h1', {},
        'boujours tout le monde ',
        React.createElement('span',  {}, n)
    )

    ReactDOM.render(title, document.querySelector('#app'))
}

//on appel la function
render()

window.setInterval(()=>{
    n++
    render()
},1000)