$(document).ready(()=>{
    //get register button event
    $("#register").click((e)=>{
        e.preventDefault();
        registerUser();
    });

    //get login button event
    $("#login").click((e)=> {
        e.preventDefault();
        loginUser();
    })

    //get add product button
    $("#saveProduct").click(()=> {
        console.log("you clicked me");
        addProduct();
    })

    //get acend button
    $(document).on('click', '#ascend', ()=> {
        let quantity = $("#quantity").text();
        let stock = $("#stock").text();
        console.log(stock);
        quantity++;
        $("#quantity").text((quantity>stock)? stock : quantity);
    })

    //get descend button
    $(document).on('click', "#descend", ()=> {
        let quantity = $("#quantity").text();
        quantity--;
        $("#quantity").text( (quantity<1) ? 1 : quantity );
    })

    //get add to cart button
    $("body").on('click', '.overlap',(e)=> {
        let productId = e.target.id;
        let product = JSON.parse($(`input[name=${productId}]`).attr("class"))
        let userId = $("#userId").val();
        console.log(userId);
        if(userId == undefined) {
            Swal.fire("You must Sign Up First!", "", "warning");
            return;
        }

        let form = 
        `
        <h3>${product.category+"'s "+product.title}</h3>
        <h6><b>Stock:</b> <span id="stock">${(product.stock)? product.stock: "Out of stock!"}</span></h6>
        <h6>$${product.price}.00</h6>
        <form class="form-group">
            <div>
                <label>Quantity:</label>
                <input type="button" class='btn border' id="descend" value="-">
                <span class="p-2" id="quantity">1</span>
                <input type="button" class= "btn border" id="ascend" value="+">
            </div>
        </form>`;

        if(productId) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger cancel'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: "Add to Cart",
                text: "This product will be added to your cart!",
                html: form,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                reverseButtons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                    //get all data needed for add to cart
                    let data = {
                        productId: "",
                        userId: "",
                        quantity: ""
                    }
                    data["productId"] = productId;
                    data["userId"] = userId;
                    //get quantity
                    let quantity = $("#quantity").text();
                    data["quantity"] = quantity;
                    console.log(data);
                    //add product to cart using ajax
                    await addToCart(data);

                  swalWithBootstrapButtons.fire(
                    'Successfully Added!',
                    'Check your cart now.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancel',
                    'Cancelled Item!',
                    'error'
                  )
                }
              })
        }
        
    })

    $("body").on('click',".checkout",(e)=> {
        let id = e.target.id;
        console.log(id);
        updateCartStatus(id);
    })

    $("body").on('click', '.deliver',(e)=> {
        let cartId = e.target.id;
        deliver(cartId);
    });

    $(document).on('click','.bell', ()=> {
        Swal.fire("This feature is coming soon!","", "info");
    })
})