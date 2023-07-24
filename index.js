
document.getElementById('form-color-request').addEventListener('submit', (e) => {
    e.preventDefault()
    apiRequest()
})

function getInfoRequest(){
    let info = []
    info.push(document.getElementById('color-selected').value.slice(1))
    info.push(document.getElementById('mode').value)
    return info
}

function apiRequest(){
    
    const data = getInfoRequest()
    let color = data[0]
    let mode = data[1]

    console.log('https://www.thecolorapi.com/scheme?hex='+color+'&format=json&mode='+mode+'&count=5')

    fetch('https://www.thecolorapi.com/scheme?hex='+color+'&format=json&mode='+mode+'&count=5', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            
            const colors = data.colors
            let colorsHtml = ''
            colorsHtml = colors.map((color)=>{
                return `
                        <div>
                            <div class="child" style="background-color:${color.hex.value}"></div>
                            <p onclick="copyToClipboard()">${color.hex.value}</p>
                            <p>${color.name.value}</p>
                        </div>
                        `
            }).join('')
            document.getElementById('scheme-colors').innerHTML = colorsHtml
        })

}
