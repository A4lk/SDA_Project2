
let carts=document.querySelectorAll('.add-cart');

let products=[

        {
            name: "Tomatoes",
            tag: 'Tomatoes',
            price: 7,
            inCart:0

        },
        {
            name: "Onine",
            tag: 'Onine',
            price: 4,
            inCart:0

        },
        {
            name: "Zucchini",
            tag: 'Zucchini',
            price: 9,
            inCart:0

        },
        {
            name: "Grapes",
            tag: 'Grapes',
            price: 13,
            inCart:0

        },
        {
            name: "Apple",
            tag: 'Apple',
            price: 10,
            inCart:0

        },
        {
            name: "Orange",
            tag: 'Orange',
            price: 10,
            inCart:0

        },
        {
            name: "Coal",
            tag: 'Coal',
            price: 4,
            inCart:0

        },
        {
            name: "Sprite",
            tag: 'Sprite',
            price: 4,
            inCart:0

        },
        {
            name: "Fanta",
            tag: 'Fanta',
            price: 4,
            inCart:0

        }


]

for(let i =0;i<carts.length;i++){
    carts[i].addEventListener('click',(e)=>{
        e.preventDefault();
        cartNumbers(products[i]);
        totalCost(products[i])
        //alert("Add to cart")//Add new Alert 
    })
}

function cartNumbers(product){
    let productNubers= localStorage.getItem('cartNumbers');

    productNubers=parseInt(productNubers);

    if(productNubers){
        localStorage.setItem('cartNumbers',productNubers +1);
        document.querySelector('.cart span').textContent=productNubers+ 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
setItems(product)
}

function onLoadCartNumbers(){
    let productNubers= localStorage.getItem('cartNumbers');

    if(productNubers){
        document.querySelector('.cart span').textContent= productNubers;
    }
}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart')
    cartItems=JSON.parse(cartItems)
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems={
             ...cartItems,
                [product.tag]:product
       }
    }
        cartItems[product.tag].inCart +=1;
    }else{
        //First time you clicked
        product.inCart=1;
         cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    // console.log("my cartcost is ",cartCost);
    // console.log(typeof cartCost);
   
    if(cartCost !=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost +
        product.price)
    }else{
        localStorage.setItem('totalCost', product.price);

    }

}
function displayCart(){
    let cartItem=localStorage.getItem('productsInCart');
    cartItem=JSON.parse(cartItem);
    
    let productContainer=document.querySelector
    (".products");
    if(cartItem && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItem).map(item=>{
            productContainer.innerHTML +=`
            <div class="products">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="images/${item.tag}.jpg" style="height:3rem; width :3rem;">
            <span>${item.name}</span>
            </div>

            <div class="price">$${item.price},00</div>

            <div class="quantity">
            <ion-icon name="caret-back"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            <hr>
            
            
            `;

        });

    }
}
onLoadCartNumbers();
displayCart();
