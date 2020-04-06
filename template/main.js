$(document).ready(function(){
    if(!localStorage.getItem("token")) {
        $('#login').show()
        $('#mainpage').hide()
    } else {
        $('#login').hide()
        $('#mainpage').show()
    }
})

$('#form-login').submit(function(e){
    e.preventDefault();
    $('#login').hide()
    $('#mainpage').show()

    const email = $('#emailLogin').val()
    const password = $('#passwordLogin').val()
    const user = {email,password}

    $.ajax({
        url: 'http://localhost:3000/login',
        type: 'POST',
        data: user
    })
    .done(data=>{
        console.log(data)
        localStorage.setItem("token",data)
    })
    .fail(err=>{
        console.log(err)
    })
})