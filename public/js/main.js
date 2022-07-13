/* Selecting all the elements with the class name of delete-box. */
const deleteBtn = document.querySelectorAll('.delete-btn')

/* Adding an event listener to each element in the array. */
Array.from(deleteBtn).forEach((element)=> {
    element.addEventListener('click', deleteTool)
})

/**
 * The function is called when the user clicks on the delete button. The function then grabs the tool
 * name, book number, section number, page number, and tool comment from the table row that the delete
 * button is in. The function then sends a delete request to the server with the tool name, book
 * number, section number, page number, and tool comment as the body of the request. The server then
 * deletes the tool from the database and the page is reloaded
 */
async function deleteTool() {
    
    const tName = this.parentNode.parentNode.childNodes[0].innerText
    const bNum = this.parentNode.parentNode.childNodes[1].innerText
    const sNum = this.parentNode.parentNode.childNodes[2].innerText
    const pNum = this.parentNode.parentNode.childNodes[3].innerText
    const tComment = this.parentNode.parentNode.childNodes[4].innerText
    try {
        const response = await fetch('deleteTool', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'toolName': tName,
                'bookNum': bNum,
                'sectionNum': sNum,
                'pagesNum': pNum,
                'toolComment': tComment
            })
        })
/* The code is taking the response from the server and logging it to the console. The code is then
reloading the page. */
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

/**
 * The function is called when the user clicks the update button. The function then grabs the values
 * from the input fields and sends them to the server. The server then updates the database with the
 * new values
 */
async function updateTool() {
    const tName = this.parentNode.childNodes[1].innerText
    const bNum = this.parentNode.childNodes[2].innerText
    const sNum = this.parentNode.childNodes[3].innerText
    const pNum = this.parentNode.childNodes[4].innerText
    const tComment = this.parentNode.childNodes[5].innerText
    try {
        const response = await fetch('updateOneTool', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'toolNameS': tName,
                'bookNumS': bNum,
                'sectionNumS': sNum,
                'pagesNumS': pNum,
                'toolCommentS': tComment
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}