/* ==========================================================
FILE: comments.js
PURPOSE:
Handles comment functionality in the deviation system.

Users (ex: kitchen, admin) can respond to deviations.

Each deviation has:
comments: [
  {
    author: "",
    text: ""
  }
]

The functions here allow adding comments and updating UI.
========================================================== */


/* ==========================================================
FUNCTION
addComment()

Adds a comment to a deviation.

PARAMETERS
id   = deviation id
text = comment text
========================================================== */

function addComment(id, text){

    /* ------------------------------------------------------
    Validate input
    ------------------------------------------------------ */

    if(!text || text.trim() === ""){
        return
    }


    /* ------------------------------------------------------
    Find deviation in the global array
    ------------------------------------------------------ */

    const deviation =
    deviations.find(function(d){

        return d.id === id

    })


    if(!deviation){
        return
    }


    /* ------------------------------------------------------
    Create new comment object
    ------------------------------------------------------ */

    const newComment = {

        author: "Kök",  // Demo user
        text: text

    }


    /* ------------------------------------------------------
    Add comment to deviation
    ------------------------------------------------------ */

    deviation.comments.push(newComment)


    /* ------------------------------------------------------
    Re-render UI
    ------------------------------------------------------ */

    renderDeviations()

}
