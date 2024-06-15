import { servicesProducts } from "./product-services.js";

const misProductos = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-form]");

function crearProductos(name, price, image, id) {
    const productoItem = document.createElement("div");
    productoItem.classList.add("productoItem");

    productoItem.innerHTML = `
    <div class="productosItem">
      <img class="img-product" src=${image} alt=${name}>
      <div class="titulo-producto">
        <p>${name}</p>
      </div>
      <div class="price-button">
        <div class="precio-producto">
          <p>USD$${price}</p>
        </div>
        <div data-borrar class="button-delete" id=${id}>
          <img src="img/delete-icon.png" alt="borrar" class="img-delete"/>
        </div>
      </div>
    </div>
  `;

    const botonBorrar = productoItem.querySelector("[data-borrar]");
    botonBorrar.addEventListener("click", async () => {
        try {
            await servicesProducts.borrarProducto(id);
            productoItem.remove();
        } catch (error) {
            console.error("Error al borrar el producto:", error);
        }
    });

    misProductos.appendChild(productoItem);
    return productoItem;

}

const render = async () => {
    try {
        const listaProductos = await servicesProducts.productList();
        listaProductos.forEach((producto) => {
            crearProductos(
                producto.name,
                producto.price,
                producto.image,
                producto.id
            );
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-titulo]").value;
    const price = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-imagen]").value;

    try {
        const nuevoProducto = await servicesProducts.crearProdcuto(
            name,
            price,
            image
        );
        crearProductos(
            nuevoProducto.name,
            nuevoProducto.price,
            nuevoProducto.image,
            nuevoProducto.id
        );
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }


    limpiarForm();
});

render();

const limpiarForm = () => {
    document.querySelector("[data-titulo]").value = "";
    document.querySelector("[data-precio]").value = "";
    document.querySelector("[data-imagen]").value = "";
};