const productList = () => {
    return fetch("http://localhost:3001/products")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const crearProdcuto = (name, price, image) => {
    return fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
        }),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const borrarProducto = (id) => {
    return fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
    crearProdcuto,
    borrarProducto,
};
