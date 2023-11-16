
const socket = io()

socket.on('products', (updatedProducts) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    updatedProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Id: ${product.id}</p>
            <p>Code: ${product.code}</p>
            <p>Price: $${product.price}</p>
            <p>Status: ${product.status}</p>
            <p>Stock: ${product.stock}</p>
            <p>Category: ${product.category}</p>
            <p>Thumbnail: ${product.thumbnail}</p>
        `;
        productList.appendChild(listItem);
    });
});