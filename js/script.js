
//array de objectos Productos
const productos = [
  {
    nombre: "Placa de Video ZOTAC GAMING",
    precio: 140000,
    id: 1,
    description: "GeForce GTX 1660 Ti 6GB ZT-T16610F-10L",
    src: "img/grafica1.jpg"
  },
  {
    nombre: "RAM",
    precio: 10000,
    id: 2,
    description: "16GB, 2300MZH",
    src: "img/ram1.webp"
  },
  {
    nombre: "Fuente de Alimentacion",
    precio: 25000,
    id: 3,
    description: "MSI MPG A750GF",
    src: "img/fuentes-msi.png"

  },
  {
    nombre: "Mouse Gamer",
    precio: 19500,
    id: 4, 
    description: "Thermaltake Level 20 Rgb",
    src: "img/mouse.jpg"
  },
  {
    nombre: "Teclado Gamer",
    precio: 9500,
    id: 5,
    description: "Gadnic ZT800 QWERTY Outemu Blue español España color negro con luz RGB",
    src:"img/teclado.jpg"
  },
  {
    nombre: "Monitor Gamer",
    precio: 50000,
    id: 6,
    description: "Monitor Gigabyte 24 pulgadas.",
    src:"img/monitor.webp"
    
  },{
    nombre: "Disco Duro Externo",
    description: "Western Digital WD Elements Portable WDBUZG0010BBK 1TB negro",
    precio: "9.500$",
    src:"img/sdd.webp",
    id: 7
    
  },
  {
    nombre: "PC DE OFICINA",
    description: "MOTHERBOARD H410,MICRO INTEL CELERON G5905 DC 3.5GHZ,MEMORIA 8GB DDR4 2666 CRUCIAL UDIMM,SSD MARKVISION 240GB SATA III,GABINETE KIT",
    precio: "60.000$",
    src:"img/pc1.jpg", 
    id: 8
  },
  {
    nombre: "PC GAMER",
    description: "MOTHER H510M PCIE 4.0 DDR4 USB 3.2, INTEL I9 10MA GEN Dual Core, 8GB 2666MHZ DDR4 1TB SATA3 WD BLUE, GABINETE:Atx-Con Fuente 550W TECLADO, MOUSE USB, PARLANTES USB Potenciados.",
    precio: 95000,
    src:"img/pc2.jpg", 
    id: 9
  }
];


//desestructuracion de un Array
let productOne = {nombre,description,precio,src,id} = productos


const containerDiv = document.querySelector(".container");
const carritoDiv = document.querySelector(".shoppingCartItemsContainer");

//USO DE JSON
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function crearCards() {
  //reemplazo por la variable que desestructure de productos: productOne
  productOne.forEach((prod) => {
    containerDiv.innerHTML += `
    <div class="card col-6" style="width: 18rem;">
            <img src=${prod.src} class="card-img-top" alt="...">
            <div class="card-body jsDiv">
                <h5 class="card-title" id="titleHead1">${prod.nombre}</h5>
                <p class="card-text">
                    ${prod.description}
                </p>
                
                <p class="card-price">${prod.precio}$</p>
                <button class="btn btnCarrito btnEdit" id="btn-agregar${prod.id}">Agregar al Carrito</button>
            </div>`
        
  });
  agregarFuncionalidad();
}

function agregarFuncionalidad() {
   //reemplazo por la variable que desestructure de productos: productOne
  productOne.forEach((prod) => {
    document
      .querySelector(`#btn-agregar${prod.id}`)
      .addEventListener("click", () => {
        console.log(prod);
        agregarAlCarrito(prod);
      });
  });
}

function agregarAlCarrito(prod) {
  let existe = carrito.some((productoSome) => productoSome.id === prod.id);
  if (existe === false) {
    prod.cantidad = 1;
    carrito.push(prod);
  } else {
    let prodFind = carrito.find((productoFind) => productoFind.id === prod.id);
    prodFind.cantidad++;
    //prod.cantidad++
  }
 

  //carrito.push(prod);
  console.log(carrito);
  renderizarCarrito();
}

function renderizarCarrito() {
  carritoDiv.innerHTML = "";
  carrito.forEach((prod) => {
    carritoDiv.innerHTML += `
    
        
    <div style="padding: 20px; gap:10px;">
    <h4>${prod.nombre}</h4>
    <img src="${prod.src}" class="imgMin">
    <p>CANTIDAD: ${prod.cantidad}</p>
    <button class=" btn btnEdit" id="btn-borrar${prod.id}"><i class="fa-solid fa-trash-can"></i></button>
    <button class="  btn btnEdit" id="btn-menos${prod.id}"><i class="fa-solid fa-circle-minus"></i></button>
    </div>  
     `;
  });
  //uso de JSON
  localStorage.setItem("carrito", JSON.stringify(carrito));
  borrarProducto();
}

function borrarProducto() {
  carrito.forEach((prod) => {
    document
      .querySelector(`#btn-borrar${prod.id}`)
      .addEventListener("click", () => {
        carrito = carrito.filter(
          (productoFilter) => productoFilter.id !== prod.id
        );
        renderizarCarrito();
      });
  });
}

crearCards();
renderizarCarrito();


//----------------------------------------EVENTOS------------------------------------------//
let btnCar = document.querySelectorAll(".btnCarrito")
for(let i=0;i<btnCar.length;i++){
     btnCar[i].addEventListener("click",function(){
          this.innerHTML ="Agregado al Carrito"
          this.style.backgroundColor= "red"
          this.style.fontWeight="bold"
          this.style.color="white"
          btnCar[i].addEventListener("mouseout",function(){
               this.innerHTML ="Agregar al Carrito"
 this.style.backgroundColor= "#0d6efd"
          this.style.fontWeight="300"
          this.style.color="white"
          })
     })
}

