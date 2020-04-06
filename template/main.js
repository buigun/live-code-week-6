$(document).ready(function(){
    if(!localStorage.getItem("token")) {
        $('#login').show()
        $('#mainpage').hide()
    } else {
        $('#login').hide()
        $('#mainpage').show()
        showAll()
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

$('#btn-logout').click(function(e) {
    e.preventDefault();
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem("token")
      $('#login').show()
      $('#mainpage').hide()
    // });
})

$('#addFood').submit(function(e){
    e.preventDefault();
    console.log('add food')
    const title = $('#foodTitle').val()
    const price = $('#foodPrice').val()
    const ingredients = $('#foodIngredients').val()
    const tag = $('foodTag').val()

    const food= {title,price,ingredients,tag}

    $.ajax({
        url: 'http://localhost:3000/foods/',
        type: 'POST',
        data: food,
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done(foods=>{
        console.log(foods)
        showAll()
    })
    .fail(err=>{
        console.log(err)
    })
})

function showAll() {
    $.ajax({
        url: 'http://localhost:3000/foods/',
        type: 'GET',
        headers:{token:localStorage.token}
    })
    .done(function(result){
        $('#mainpage').show()
        const foods = result.foods
        console.log(result)

        $('#body').empty()
        for(let i = 0; i < foods.length; i++) {
            $('#body').append(
                `<div class="card">
                <div class="card-body pb-0">
                  <div class="d-flex justify-content-between mb-0">
                    <div class="col-9">
                      <h5 class="font-weight-bold">${foods[i].title} </h5>
                      <p>Rp. ${foods[i].price}</p>
                    </div>
                    <div class="col-3 d-flex align-items-baseline">
                      <i class="fas fa-tag text-grey mr-2"></i>
                      <p class="text-grey">${foods[i].tag}</p>
                      <a role="button" class="fas fa-trash text-danger ml-auto cursor-pointer" id="deleteFood" href="http://localhost:3000/foods/${foods[i].id}"></a>
                    </div>
                  </div>
                  <div class="card-body border-bottom">
                   ${foods[i].ingredients}
                  </div>
      
                </div>
              </div>`
            )
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

$('#deleteFood').click(function(e){
    e.preventDefault();

    $.ajax({
        url : document.activeElement.href,
        type: 'DELETE',
        headers: {token: localStorage.token}
    })
    .done(data=>{
        showAll()
    })
    .fail(err=>{
        console.log(err)
    })
})
