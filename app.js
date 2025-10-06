const API_URL = "https://github.com/frdrgzgrc-arch/Carrito-aGoodShop/blob/main/productos.json";

let carrito = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    mostrarProductos(data.products, data.currency);
  })
  .catch(err => console.error("Error al cargar la API:", err));

function mostrarProductos(productos, moneda) {
  const contenedor = document.getElementById("productos");
  productos.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card p-3 text-center">
        <h5 class="fw-bold">${p.title}</h5>
        <p class="text-muted">${p.price} ${moneda}</p>
        <input type="number" min="0" value="0" class="form-control mb-3 cantidad" data-sku="${p.SKU}">
        <button class="btn btn-primary w-100">Añadir al carrito</button>
      </div>
    `;
    contenedor.appendChild(col);

    const btn = col.querySelector("button");
    const input = col.querySelector("input");
    btn.addEventListener("click", () => {
      const unidades = parseInt(input.value);
      if (unidades > 0) {
        actualizarCarrito(p, unidades, moneda);
      }
    });
  });
}

function actualizarCarrito(producto, unidades, moneda) {
  const existente = carrito.find(item => item.SKU === producto.SKU);
  if (existente) {
    existente.quantity += unidades;
  } else {
    carrito.push({ ...producto, quantity: unidades });
  }
  calcularTotal(moneda);
}

function calcularTotal(moneda) {
  const total = carrito.reduce((acc, p) => acc + p.price * p.quantity, 0);
  document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  document.getElementById("total").textContent = "0";
});

