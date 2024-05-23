const product=[
    {
        id:0,
        Image:'watch.jpg',
        title:'BIDEN Mens Watch',
        price:3000,
    },
    {
        id:1,
        Image:'watch.jpg',
        title:'BIDEN Mens Watch',
        price:3000,
    }
];

    const rootElement=document.getElementById('b');
    function addtocart(id){
        console.log('product added to cart:',product[id]);
    }
    rootElement.innerHTML=product.map((item,index)=>{
        const{Image,title,price}=item;
    return`
        <h4> Popular</h4>
        <a href="itempage.html"><div class='box'>
            <div class='img-box'>
                <img class='image' src='${Image}'></img>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>Rs. ${price}.00</h2>
                <button onclick='addtocart("+(i++)+")'>Add to cart</button>
            </div>
        </div></a>`;
    
}).join('');