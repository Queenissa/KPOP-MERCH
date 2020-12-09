function registerUser() {
    let ids = [
        "usernameSignup",
        "emailSignup",
        "passwordSignup"
    ];

    //validate the information here
    let data = {
        username: $('#usernameSignup').val(),
        email: $("#emailSignup").val(),
        password: $("#passwordSignup").val()
    };

    $.ajax({
        type: "post",
        url: "/user/add",
        data: data,
        success: (result) => {
            console.log(result);
            $("#myModalRegister").modal("hide");
        },
        error: (error) => {
            console.log(error);
        }
    })
}

function loginUser() {
    let ids = [
        "emailLogin",
        "passwordLogin"
    ];

    //validate here

    let data = {
        email: $("#emailLogin").val(),
        password: $("#passwordLogin").val()
    }
    console.log(data);
    $.ajax({
        type: "post",
        url: "/user/login",
        data: data,
        success: (result) => {
            console.log(result.user);
            window.location.href = "/welcome/" + result.user._id + "/" + result.user.role;
        },
        error: (error) => {
            Swal.fire(error.responseJSON.message, "", "error");
        }
    })
}

//add product
function addProduct() {
    let ids = [
        "title",
        "imageUrl",
        "price",
        "stock",
        "description",
        "category"
    ];

    //set validation here

    //get all data from the fields

    let data = {
        title: $("#title").val(),
        imageUrl: $("#imageUrl").val(),
        category: $("#category").val(),
        price: $("#price").val(),
        stock: $("#stock").val(),
        description: $("#description").val()
    }


    $.ajax({
        type: "post",
        url: "/add-product",
        data: data,
        success: (result) => {
            console.log(result);
            window.location.href = result.url;
        },
        error: (error) => {
            console.log(error);
        }
    });
}


//add to cart
function addToCart(data) {
        $.ajax({
            type: "post",
            url: "/cart/add",
            data: data,
            success: (result) => {
                
            },
            error: (error) => { 
                console.log(error);
            }
        })

}
//update cart status
function updateCartStatus(cartId) {
    $.ajax({
        type: "put",
        url: "/cart/update/" + cartId,
        data: { status: "checkout" },
        success: (result) => {
            console.log(result);
            Swal.fire({
                title: 'Successfully checkout!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = window.location.href;
                }
            })
        },
        error: (error) => {
            console.log(error);
        }
    })
}

//admin delivered the product
function deliver(cartId){
    $.ajax({
        type: "put",
        url: '/cart/update/'+cartId,
        data: {status: "delivered"},
        success: (result)=> {
            Swal.fire({
                title: 'Successfully delivered!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = window.location.href;
                }
            })
        },
        error: (error) => {
            console.log(error);
        }
    })
}