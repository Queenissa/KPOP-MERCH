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
})