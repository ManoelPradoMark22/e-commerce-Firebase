import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Get the modal.
var modal = document.getElementById("myModal");

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBjp1xZR6T0fBs4uYST8PNV7rC2rUxNjpg",
  authDomain: "e-commerce-3c41b.firebaseapp.com",
  databaseURL: "https://e-commerce-3c41b-default-rtdb.firebaseio.com",
  projectId: "e-commerce-3c41b",
  storageBucket: "e-commerce-3c41b.appspot.com",
  messagingSenderId: "352196438207",
  appId: "1:352196438207:web:40360967b69b7bf4093e0a",
  measurementId: "G-86PHKPHGWE"
});

const db = getDatabase(firebaseApp);
const starCountRef = ref(db);

let idHambIcon = 1;
let nameHambIcon = 'fas fa-hamburger';

setInterval(() => {
  switch(idHambIcon) {
    case 1:
      idHambIcon = 2;
      nameHambIcon = 'fas fa-hamburger';
      break;
    case 2:
      idHambIcon = 3;
      nameHambIcon = 'fas fa-pizza-slice';
      break;
    case 3:
      idHambIcon = 4;
      nameHambIcon = 'fas fa-ice-cream';
      break;
    case 4:
      idHambIcon = 5;
      nameHambIcon = 'fas fa-mug-hot';
      break;
    case 5:
      idHambIcon = 6;
      nameHambIcon = 'fas fa-hotdog';
      break;
    case 6:
      idHambIcon = 1;
      nameHambIcon = 'fas fa-candy-cane';
      break;
    default:
      idHambIcon = 1;
      nameHambIcon = 'fas fa-hamburger';
      break;
  }
  
  if (!(document.getElementById('menu-bar').classList.contains('fa-times'))){
    document.getElementById('menu-bar').className = nameHambIcon;
  }

}, 5000)

let fbArray = [];
let catAcais = [];

function closeModal() {
  modal.style.display = "none";
}


function showArr(arr) {
  closeModal();
  fbArray = arr;
  catAcais = arr.sorveteria.subsections[0].products;
}

window.openLanchonete = function openLanchonete(tabId) {
  var i;
  var x = document.getElementsByClassName("tabLanchonete");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(tabId).style.display = "flex";
  
  var el = document.querySelectorAll('#tabsLanchonete .tabInsideLanchonete');
  for (let i = 0; i < el.length; i++) { 
    el[i].className = 'btn tabInsideLanchonete';
  }
  document.getElementById(`tab${tabId}`).className = "btn tabInsideLanchonete active";
}

window.openItensTabs = function openItensTabs(prodName, tabName, subsID) {
  var i;
  var x = document.getElementsByClassName(tabName);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(prodName).style.display = "flex";  

  var params = `#listInside1-${subsID} .btnInside`;

  var el = document.querySelectorAll(params);
  for (let i = 0; i < el.length; i++) { 
    el[i].className = 'btnInside';
  }
  document.getElementById(`subTab${prodName}`).className = "btnInside active";
}

async function loadFirebase() {
  try {
    await onValue(starCountRef, (snapshot) => {
      showArr(snapshot.val());
      const adittionals = snapshot.val().adittionals;
       /*AQUI VOU FAZER OS MAPS DAS SE????ES! */
      document.getElementById('catAcais').innerHTML = snapshot.val().sorveteria.subsections[0].products.map(prod => 
        `<div>
          <div id="${prod.id}" class="row tabAcais" data-aos="fade-right" style="${prod.display}">
            <div class="image" data-aos="fade-left">
                <img id="imgAcai" src="${prod.img}" alt="${prod.name}">
            </div>
      
            <div class="content">
                <div class="info">
                    <h3 id="nameH3Acai"> <span>0${prod.number}.</span> ${prod.name}</h3>
                    <text id="idChangePriceAcai" class="priceCatalog">${convertToReal(prod.priceTotalAcai)}</text>
                    <p>${prod.description}</p>
                    <div class="boxManyPrices boxAcaiSizes">
                      <div id="sizeAcaiPP" class="manyPrices acaiSizeInside active" onclick="changeSelectedSizeAcai(1, 'sizeAcaiPP')">
                        <h3 class="headerManyPrices">PP</h3>
                        <div class="bodyManyPrices">250ml</div>
                      </div>
                      <div id="sizeAcaiP" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(2, 'sizeAcaiP')">
                        <h3 class="headerManyPrices">P</h3>
                        <div class="bodyManyPrices">300ml</div>
                      </div>
                      <div id="sizeAcaiM" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(3, 'sizeAcaiM')">
                        <h3 class="headerManyPrices">M</h3>
                        <div class="bodyManyPrices">400ml</div>
                      </div>
                      <div id="sizeAcaiG" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(4, 'sizeAcaiG')">
                        <h3 class="headerManyPrices">G</h3>
                        <div class="bodyManyPrices">500ml</div>
                      </div>
                    </div>
                    <div class="boxAdittionals">
                      ${adittionals.map(add =>
                        `
                          <button type="button" id=${add.idAddName} class="adittional ${add.selected ? 'active' : ''}" ${add.available ? '' : 'disabled'} onClick="changeSelect(${add.id})">${add.name}</button>
                        `
                      ).join('')}
                    </div>
                    <button
                        class="btnCart btnCart-small addToCart"
                        data-product-id=${prod.id}
                        style="margin-top: 1rem"
                        onclick="addAcaiToCart()">
                          <i class="fas fa-cart-plus"></i>
                          Adicionar item
                    </button>
                </div>
            </div>
          </div>
        </div>`
      ).join('');

      document.getElementById('tabsLanchonete').innerHTML = snapshot.val().lanchonete.subsections.map((subsec, index) => 
        `<li id="tab${index}${subsec.name}" class="btn tabInsideLanchonete ${index===0 ? 'active' : ""}" onclick="openLanchonete('${index+subsec.name}')">${subsec.name}</li>`
      ).join('');

      document.getElementById('contentLanchonete').innerHTML = snapshot.val().lanchonete.subsections.map((subsec, index) => 
        `<div id="${index}${subsec.name}" class="row tabLanchonete" data-aos="fade-right" style="${index===0 ? "" : "display:none"}">
          <div class="scroll" style="overflow-y: auto;">
            <div style="display: flex;width: max-content;">
                <ul id="${`listInside1-${index}`}" class="listInside">
                  ${Object.entries(subsec.products).map((prod, index2) =>
                    `
                    <li id="subTab1.${index}.${index2}" class="btnInside ${index2===0 ? "active" : ""}" onclick="openItensTabs('1.${index}.${index2}', '1.${index}', ${index})">${prod[1].name}</li>
                    `
                  ).join('')}
                </ul>
            </div>
          </div>

          <div class="break"></div>

          ${Object.entries(subsec.products).map((prod, index2) =>
            `
              <div id="1.${index}.${index2}" class="row ${'1.'+index} ${prod[1].available ? '' : 'itemNotAvailable'}" data-aos="fade-right" style="${index2===0 ? "" : "display:none"}">
                <div class="image" data-aos="fade-left">
                    <img src="${prod[1].img}" alt="${prod[1].name}">
                </div>

                <div class="content">
                <div class="boxAvaiability" ${prod[1].available ? "style=display:none" : ""}>
                  <div class="circleAvailabilty ${prod[1].available ? 'colorGreen' : 'colorRed'}"></div>
                  <h3>${prod[1].available ? 'Dispon??vel' : 'Indispon??vel'}</h3>
                </div>
                  <div class="info">
                      <h3> <span>${(index2 > 8) ? `${index2+1}` : `0${index2+1}`}.</span> ${prod[1].name}</h3>
                      <text class="priceCatalog">${convertToReal(prod[1].priceNumb)}</text>
                      <p>${prod[1].description}</p>
                      <button
                        ${prod[1].available ? '' : 'disabled'}
                        class="btnCart btnCart-small addToCart"
                        data-product-id=${prod[1].id}
                        onclick="addItemToCart({
                          id: '${prod[0]}',
                          name: '${prod[1].name}',
                          priceOne: ${prod[1].priceNumb},
                          priceNumb: ${prod[1].priceNumb},
                          img: '${prod[1].img}',
                          count: 1
                        })">
                          <i class="fas fa-cart-plus"></i>
                          Adicionar item
                      </button>
                  </div>
                </div>
              </div>
            `
          ).join('')}

        </div>`
      ).join('');


    }, (error) => {
      closeModal();
      alert('Erro ao carregar! Verifique sua conex??o e carregue novamente a p??gina!');
      console.log('Erro ao carregar dados!');
    })
  } catch {
    closeModal();
    alert('Erro ao carregar! Verifique sua conex??o e carregue novamente a p??gina!');
  }
}

await loadFirebase();

//begin code

let productsInCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}

const parentElement = document.querySelector('#buyItems');

window.convertToReal = function convertToReal(value) {
  const valueConverted = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  return valueConverted;
}

window.clearsessionStorage = function clearsessionStorage() {
  productsInCart = [];
  updateShoppingCartHTML();
}


var pizzasImages = {
  imgCarneSeca: 'https://i.ibb.co/QkXsPkf/carne-seca-1.jpg',
  imgFrangCatup: 'https://i.ibb.co/WBDKTTP/frangocat-1.jpg',
  imgPortuguesa: 'https://i.ibb.co/1r6bfxp/portuguesa-1.png',
  imgTradicional: 'https://i.ibb.co/jyFWrVw/tradicional-1.jpg',
  imgAtum: 'https://i.ibb.co/26HhcjG/atum-1.jpg',
  imgCaipira: 'https://i.ibb.co/6m0t23k/caipira-1.jpg',
  imgCalabresa: 'https://i.ibb.co/q0wWqPP/calabresa-1.jpg'
}

var sorveteriaImages = {
  imgMSP: 'https://i.ibb.co/jW57QPs/p.jpg',
  imgMSM: 'https://i.ibb.co/JrgQQcw/m.jpg',
  imgMSG: 'https://i.ibb.co/hRbLcFp/mkg.png',
  imgBola: 'https://i.ibb.co/fdbq07c/bola.jpg',
  imgCasquinha: 'https://i.ibb.co/QNd0kT8/casquinha.jpg',
  imgCascao: 'https://i.ibb.co/94n6vXB/cascao.png',
  imgpicCremoso: 'https://i.ibb.co/jJbh7Pd/picole-cremoso.png',
  imgpicCristalizado: 'https://i.ibb.co/Hd0t7bw/pic-cristalizado.jpg',
  imgpicCasquinha: 'https://i.ibb.co/YtKBNq0/picole-skimo.jpg',
  imgCremosinho: 'https://i.ibb.co/hmpQCP2/cremosinho.jpg',
  imgAcaiPP: 'https://i.ibb.co/ZWHjbvv/pp.jpg',
  imgAcaiP: 'https://i.ibb.co/kXLSpQj/p.png',
  imgAcaiM: 'https://i.ibb.co/rx7STdG/m.png',
  imgAcaiG: 'https://i.ibb.co/zFDsx6D/g.png'
}

var muitoMaisImages = {
  imgBomboniere: 'https://i.ibb.co/sgWBhGb/doces.jpg',
  imgSalgadosFesta: 'https://i.ibb.co/M9P0Z2B/mini-Salgados.jpg',
  imgBebidas: 'https://i.ibb.co/X3mCXFZ/refrigerantes.jpg',
  imgBebidasAlcoolicas: 'https://i.ibb.co/my1kZNY/whiskey.jpg',
  imgGelo: 'https://i.ibb.co/JRGtpS8/icephoto.jpg'
}

var padariaImages = {
  imgChimango: 'https://i.ibb.co/zNpjQBJ/chimango.jpg',
  imgPaoSal: 'https://i.ibb.co/mTCKxjs/paosal.jpg',
  imgPaoDoce: 'https://i.ibb.co/vzq0vym/paodoce.jpg',
  imgRosca: 'https://i.ibb.co/YW0GHjj/rosca-4.jpg',
  imgBoloCenoura: 'https://i.ibb.co/9vnGb0q/bolocenoura.jpg',
  imgDoceLeite: 'https://i.ibb.co/xLZT76F/doceleite.jpg',
  imgarrozpequeno: 'https://i.ibb.co/BVDc0mf/arroz-pequeno.jpg',
  imgarrozgrande: 'https://i.ibb.co/S68BMGJ/arroz-grande.png',
  imgavoador: 'https://i.ibb.co/b5LpLF0/avoador.jpg',
  imgbrevidadegrande: 'https://i.ibb.co/1nT10jg/brevidade-grande.jpg',
  imgbrevidadepequena: 'https://i.ibb.co/stqNnpN/brevidade-pequena.jpg',
  imgformigueiro: 'https://i.ibb.co/Xj331wv/formigueiro.jpg',
  imgmilho: 'https://i.ibb.co/7jwBhYK/milho.jpg',
  imgpaoqueijo: 'https://i.ibb.co/Gsh2JC8/paoqueijo.jpg',
  imgprima: 'https://i.ibb.co/ZTV65fW/prima.jpg',
  imgbolachinha: 'https://i.ibb.co/dp9FJgH/bolachinha.jpg',
  imgSonho: 'https://i.ibb.co/gyp243X/sonho.jpg',
  imgDonut: 'https://i.ibb.co/wNGzT0Y/donut.jpg'
}

const updateShoppingCartHTML = function () {  // 3
	sessionStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
    let numberOfItens = 0;
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.img}">
					<div>
						<h5 class="cartProdName">${product.name}</h5>
						<h6>${convertToReal(product.priceNumb)}</h6>
            <div class="adittionals">${product.adittionals ? product.adittionals : ''}</div>
						<div>
							<button class="button-minus" data-id=${product.id} 
              onclick="changeCountOfItens('${product.id}', false)"
              >-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}
              onclick="changeCountOfItens('${product.id}', true)"
              >+</button>
						</div>
					</div>
				</li>`
		});

    let stringItems = 'Ol??! O meu pedido ??:';
    let sumTotal = 0;
    productsInCart.map(prod => {
      numberOfItens = numberOfItens + prod.count;
      stringItems = `${stringItems}\n\n- *${prod.name}* (${prod.count} unid.) [${convertToReal(prod.priceNumb)}]${prod.adittionals ? ` \n${prod.isPizza ? 'Sabor:' : 'Complemento:'} _${prod.adittionals}_` : ''}${prod.whichFlavor ? `\n${prod.count>1 ? 'Sabores: ' : 'Sabor: '}` : ''}`;
      sumTotal  = sumTotal + prod.priceNumb;
    });
    let maskedSumTotal = convertToReal(sumTotal);
    stringItems = `${stringItems}\n\n*****************\nSubtotal: *${maskedSumTotal}* \n*****************\nObserva????es: `;
    
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
    document.getElementById("badgeId").innerHTML = `${numberOfItens>99 ? '<i class="fas fa-infinity" style="font-size: 0.9rem"></i>' : numberOfItens}`;
    document.getElementById("buttonWhatsapp").href=`https://api.whatsapp.com/send?phone=+5577991998770&text=${encodeURI(stringItems)}`;
    document.getElementById("cartSumTotal").innerHTML = `<i class="fas fa-trash-alt" title="Limpar Sacola" onclick="clearsessionStorage()"></i>${maskedSumTotal}`;
	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Sua sacola est?? vazia!</h4>';
    document.getElementById("badgeId").innerHTML = '0';
    document.getElementById("cartSumTotal").innerHTML = '';
	}
}

window.sentIce = function sentIce(){
  let objIce = {
    id: '5tab4',
    name: 'Gelo',
    priceOne: 5.00,
    priceNumb: 5.00,
    img: 'https://i.ibb.co/JRGtpS8/icephoto.jpg',
    count: 1
  };
  addItemToCart(objIce);
}

window.addItemToCart = function addItemToCart(prodObj) {
  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == prodObj.id) {
			productsInCart[i].count = productsInCart[i].count + 1;
			productsInCart[i].priceNumb = productsInCart[i].priceOne*productsInCart[i].count;
      updateShoppingCartHTML();
			return;
		}
	}
	productsInCart.push(prodObj);
  updateShoppingCartHTML();
}

window.addAcaiToCart = function addAcaiToCart() {
  let adittionalsString = '';

  fbArray.adittionals.map(add => {
    if (add.selected) {
      adittionalsString = `${adittionalsString}${add.name}-`;
    }
  })

  let idString = `ACAI-${catAcais[0].priceOriginalAcai}.${adittionalsString}`;

  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id === idString) {
			productsInCart[i].count = productsInCart[i].count + 1;
			productsInCart[i].priceNumb = catAcais[0].priceTotalAcai*productsInCart[i].count;
      updateShoppingCartHTML();
			return;
		}
	}

  let acaiObj = {
    id: `${idString}`,
    name: `${catAcais[0].name}`,
    adittionals: `${adittionalsString==='' ? 'Sem adicionais' : adittionalsString}`,
    priceOne: catAcais[0].priceTotalAcai,
    priceNumb: catAcais[0].priceTotalAcai,
    img: `${catAcais[0].img}`,
    count: 1
  };

	productsInCart.push(acaiObj);
  updateShoppingCartHTML();
}

window.addMSToCart = function addMSToCart() {
  let adittionalsStringMS = '';

  additionalsMilkShake.map(add => {
    if (add.selected) {
      adittionalsStringMS = `${adittionalsStringMS}${add.name}-`;
    }
  })

  let idStringMS = `MILKSHAKE-${catMilkShakes[0].priceOriginalMS}.${adittionalsStringMS}`;

  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id === idStringMS) {
			productsInCart[i].count = productsInCart[i].count + 1;
			productsInCart[i].priceNumb = catMilkShakes[0].priceTotalMS*productsInCart[i].count;
      updateShoppingCartHTML();
			return;
		}
	}

  let msObj = {
    id: `${idStringMS}`,
    name: `${catMilkShakes[0].name}`,
    adittionals: `${adittionalsStringMS==='' ? 'Sem adicionais' : adittionalsStringMS}`,
    whichFlavor: true,
    priceOne: catMilkShakes[0].priceTotalMS,
    priceNumb: catMilkShakes[0].priceTotalMS,
    img: `${catMilkShakes[0].img}`,
    count: 1
  };

	productsInCart.push(msObj);
  updateShoppingCartHTML();
}

window.changeCountOfItens = function changeCountOfItens(idProd, IsIncrease) {
  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == idProd) {
      if (IsIncrease) {
        productsInCart[i].count = productsInCart[i].count + 1;
      } else {
        productsInCart[i].count = productsInCart[i].count - 1;
      }
			productsInCart[i].priceNumb = productsInCart[i].priceOne*productsInCart[i].count;
      if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
	}
  updateShoppingCartHTML();
}

$(document).ready(function(){

  $('#menu-bar').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll',function(){

      $('#menu-bar').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      $('section').each(function(){

          let top = $(window).scrollTop();
          let height = $(this).height();
          let id = $(this).attr('id');
          let offset = $(this).offset().top - 200;

          if(top > offset && top < offset + height){
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }

      });

  });


  $('.list .btn').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
  });
  
  $('.listInside .btnInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  });

  /*$('.boxAcaiSizes .acaiSizeInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  }); */

  $('.boxMSSizes .msSizeInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  });
});

/*swiper */
const slider = document.querySelector(".scroll");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

/*Cart functions*/

function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	/*document.querySelector('body').classList.toggle('stopScrolling') */
}

const openShopCart = document.querySelector('.bagDiv');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	/*document.querySelector('body').classList.toggle('stopScrolling'); */
});

/*close cart when click the closeButton */
const closeShopCart = document.querySelector('#closeButton');
closeShopCart.addEventListener('click', closeCart);
/*close cart when click on overlay */
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeCart);


/*CATEGORIES*/

/* Sess??o 2
PIZZARIA (2tab1)*/
var pizzaPrices1 = [
  {
    price: 6.00,
    size: 'Brotinho'
  },
  {
    price: 9.00,
    size: 'Brot. Especial'
  },
  {
    price: 17.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 22.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 28.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 34.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices2 = [
  {
    price: 7.00,
    size: 'Brotinho'
  },
  {
    price: 10.00,
    size: 'Brot. Especial'
  },
  {
    price: 19.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 24.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 30.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 37.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices3 = [
  {
    price: 10.00,
    size: 'Brotinho'
  },
  {
    price: 15.00,
    size: 'Brot. Especial'
  },
  {
    price: 27.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 33.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 40.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 46.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices4 = [
  {
    price: 8.00,
    size: 'Brotinho'
  },
  {
    price: 12.00,
    size: 'Brot. Especial'
  },
  {
    price: 22.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 28.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 34.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 40.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var catPizzas = [
  {
    id: '2tab1.1',
    number: 1,
    name:"Tradicional",
    description: "Queijo, presunto, milho e tomate.",
    img: pizzasImages.imgTradicional,
    display: "display:flex",
    prices: pizzaPrices1
  },
  {
    id: '2tab1.2',
    number: 2,
    name:"Calabresa",
    description: "Queijo, calabresa e cebola.",
    img: pizzasImages.imgCalabresa,
    display: "display:none",
    prices: pizzaPrices1
  },
  {
    id: '2tab1.3',
    number: 3,
    name:"Caipira",
    description: "Queijo, frango desfiado, milho, tomate e cebola.",
    img: pizzasImages.imgCaipira,
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.4',
    number: 4,
    name:"Portuguesa",
    description: "Queijo, presunto, ovo, tomate, azeitona e cebola.",
    img: pizzasImages.imgPortuguesa,
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.5',
    number: 5,
    name:"Frango Catupiry",
    description: "Queijo, frango e catupiry.",
    img: pizzasImages.imgFrangCatup,
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.6',
    number: 6,
    name:"Carne Seca",
    description: "Carne seca, azeitona, cebola + (mu??arela ou catupiry ou cheddar)",
    img: pizzasImages.imgCarneSeca,
    display: "display:none",
    prices: pizzaPrices3
  },
  {
    id: '2tab1.7',
    number: 7,
    name:"Atum",
    description: "Atum, mu??arela, azeitona e cebola.",
    img: pizzasImages.imgAtum,
    display: "display:none",
    prices: pizzaPrices4
  },
]

document.getElementById('catPizzas').innerHTML = catPizzas.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabPizzas" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <p>${prod.description}</p>
              
              <div class="boxManyPrices">
                  ${prod.prices.map((price =>
                    `
                    <div class="manyPrices manyPricesPizza">
                      <h3 class="headerManyPrices">${price.size} ${price.slices ? `<text class="slicesPizza">${price.slices}</text>` : ''}</h3>
                      <div class="bodyManyPrices">${convertToReal(price.price)}</div>
                    </div>
                    `
                  )).join('')}
              </div>

          </div>
      </div>
    </div>
  </div>`
).join('')

/* Sess??o 3 - SORVETERIA
 A??a??s (3tab1)*/

window.changeSelect = function changeSelect(id) {
  var contador = 0;
  var valor = 0;
  var simpleAdd = true;
  var wasSelected = true;
  fbArray.adittionals.map(add => {
    if (add.id === id) {
      valor = add.value;
      simpleAdd = add.fourFree;
      wasSelected = add.selected;

      const elemento = document.getElementById(add.idAddName);
      if (add.selected){ //desmarcando
        add.selected=false;
        if (elemento.classList) {
          elemento.classList.remove("active");
        } else {
          elemento.className -= " active";
        }
      }else { //marcando
        add.selected=true;
        if (elemento.classList) {
          elemento.classList.add("active");
        } else {
          elemento.className += " active";
        }
      }
    }
    if(add.fourFree && add.selected) {
      contador = contador + 1;
    }
  })
  
  var oldTotal = catAcais[0].priceTotalAcai;
  if (wasSelected){ //desmarcando
    if (!simpleAdd) {
      var newTotal = oldTotal - valor;
      catAcais[0].priceTotalAcai = newTotal;
      document.getElementById("idChangePriceAcai").innerHTML = convertToReal(newTotal);
    } else {
      if (contador >= 4) {
        var newTotal = oldTotal - valor;
        catAcais[0].priceTotalAcai = newTotal;
        document.getElementById("idChangePriceAcai").innerHTML = convertToReal(newTotal);
      }
    }
  } else { //marcando
    if (!simpleAdd) {
      var newTotal = oldTotal + valor;
      catAcais[0].priceTotalAcai = newTotal;
      document.getElementById("idChangePriceAcai").innerHTML = convertToReal(newTotal);
    } else {
      if (contador > 4) {
        var newTotal = oldTotal + valor;
        catAcais[0].priceTotalAcai = newTotal;
        document.getElementById("idChangePriceAcai").innerHTML = convertToReal(newTotal);
      }
    }
  }
}

window.changeSelectedSizeAcai = function changeSelectedSizeAcai(sizeId, divIdAcai) {
  var priceSize = 5.00;
  var newName = 'A??a??';
  var imgPath = sorveteriaImages.imgAcaiPP;

  switch (sizeId) {
    case 1:
      priceSize = 5.00;
      newName = 'A??a?? (250ml)';
      imgPath = sorveteriaImages.imgAcaiPP;
      break;
    case 2:
      priceSize = 7.00;
      newName = 'A??a?? (300ml)';
      imgPath = sorveteriaImages.imgAcaiP;
      break;
    case 3:
      priceSize = 10.00;
      newName = 'A??a?? (400ml)';
      imgPath = sorveteriaImages.imgAcaiM;
      break;
    case 4:
      priceSize = 12.00;
      newName = 'A??a?? (500ml)';
      imgPath = sorveteriaImages.imgAcaiG;
      break;

    default:
      priceSize = 5.00;
      newName = 'A??a??';
      imgPath = sorveteriaImages.imgAcaiPP;
      break;
  }

  var subtotal = catAcais[0].priceOriginalAcai;
  var total = catAcais[0].priceTotalAcai;
  var newTotal = total - subtotal + priceSize;
  catAcais[0].priceOriginalAcai = priceSize;
  catAcais[0].priceTotalAcai = newTotal;
  catAcais[0].img = imgPath;
  catAcais[0].name = newName;
  document.getElementById("idChangePriceAcai").innerHTML = convertToReal(newTotal);
  document.getElementById("nameH3Acai").innerHTML = `<span>0${sizeId}.</span> ${newName}`;
  document.getElementById("imgAcai").src=imgPath;

  var el = document.querySelectorAll('.boxAcaiSizes .acaiSizeInside');
    for (let i = 0; i < el.length; i++) { 
      el[i].className = 'manyPrices acaiSizeInside';
    }

  document.getElementById(divIdAcai).className = "manyPrices acaiSizeInside active";

}




/*MILKSHAKES*/
 var catMilkShakes = [
  {
    id: '3tab2.1',
    number: 1,
    name:"Milk-shake (300ml)",
    description: "Que tal aquele milk-shake super cremoso e delicioso?&#129316;",
    priceOriginalMS: 5.00,
    priceTotalMS: 5.00,
    img: sorveteriaImages.imgMSP,
    display: "display:flex"
  },
]

var additionalsMilkShake = [
  {
    id: 1,
    name: 'Ovomaltine',
    idAddName: 'addMSOvomaltine',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: false
  },
  {
    id: 2,
    name: 'Nutella',
    idAddName: 'addMSNutella',
    available: true,
    price: 'R$2,00',
    value: 2.00,
    selected: false
  },
  {
    id: 3,
    name: 'Pa??oca',
    idAddName: 'addMSPacoca',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: false
  }
]

 window.changeSelectedMS = function changeSelectedMS(id){
  var valorMS = 0;
  var wasSelectedMS = true;

  additionalsMilkShake.map(add => {
    if (add.id === id) {
      valorMS = add.value;
      wasSelectedMS = add.selected;

      const elemento = document.getElementById(add.idAddName);
      if (add.selected){ //desmarcando
        add.selected=false;
        if (elemento.classList) {
          elemento.classList.remove("active");
        } else {
          elemento.className -= " active";
        }
      }else { //marcando
        add.selected=true;
        if (elemento.classList) {
          elemento.classList.add("active");
        } else {
          elemento.className += " active";
        }
      }
    }
  });

  var oldTotalMS = catMilkShakes[0].priceTotalMS;
  /*wasSelectedMS=true -> desmarcando*/
  var newTotalMS = wasSelectedMS ? (oldTotalMS - valorMS) : (oldTotalMS + valorMS);
  catMilkShakes[0].priceTotalMS = newTotalMS;
  document.getElementById("idChangePriceMS").innerHTML = convertToReal(newTotalMS);

}

window.changeSelectedSizeMS = function changeSelectedSizeMS(sizeId) {
  var priceSizeMS = 5.00;
  var newNameMS = 'Milk-Shake';
  var imgPathMS = sorveteriaImages.imgMSP;

  switch (sizeId) {
    case 1:
      priceSizeMS = 5.00;
      newNameMS = 'Milk-Shake (300ml)';
      imgPathMS = sorveteriaImages.imgMSP;
      break;
    case 2:
      priceSizeMS = 7.00;
      newNameMS = 'Milk-Shake (400ml)';
      imgPathMS = sorveteriaImages.imgMSM;
      break;
    case 3:
      priceSizeMS = 9.00;
      newNameMS = 'Milk-Shake (500ml)';
      imgPathMS = sorveteriaImages.imgMSG;
      break;

    default:
      priceSizeMS = 5.00;
      newNameMS = 'Milk-Shake';
      imgPathMS = sorveteriaImages.imgMSP;
      break;
  }

  var subtotalMS = catMilkShakes[0].priceOriginalMS;
  var totalMS = catMilkShakes[0].priceTotalMS;
  var newTotalMS = totalMS - subtotalMS + priceSizeMS;
  catMilkShakes[0].priceOriginalMS = priceSizeMS;
  catMilkShakes[0].priceTotalMS = newTotalMS;
  catMilkShakes[0].img = imgPathMS;
  catMilkShakes[0].name = newNameMS;
  document.getElementById("idChangePriceMS").innerHTML = convertToReal(newTotalMS);
  document.getElementById("nameH3MS").innerHTML = `<span>0${sizeId}.</span> ${newNameMS}`;
  document.getElementById("imgMS").src=imgPathMS;
}

document.getElementById('catMilkShakes').innerHTML = catMilkShakes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabMilkShakes" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img id="imgMS" src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
        <div class="info">
          <h3 id="nameH3MS"> <span>0${prod.number}.</span> ${prod.name}</h3>
          <text id="idChangePriceMS" class="priceCatalog">${convertToReal(prod.priceTotalMS)}</text>
          <p>${prod.description}</p>
          <div class="boxManyPrices boxMSSizes">
            <div id="sizeMSP" class="manyPrices msSizeInside active" onclick="changeSelectedSizeMS(1)">
              <h3 class="headerManyPrices">P</h3>
              <div class="bodyManyPrices">300ml</div>
            </div>
            <div id="sizeMSM" class="manyPrices msSizeInside" onclick="changeSelectedSizeMS(2)">
              <h3 class="headerManyPrices">M</h3>
              <div class="bodyManyPrices">400ml</div>
            </div>
            <div id="sizeMSG" class="manyPrices msSizeInside" onclick="changeSelectedSizeMS(3)">
              <h3 class="headerManyPrices">G</h3>
              <div class="bodyManyPrices">500ml</div>
            </div>
          </div>
          <div class="boxAdittionals">
            ${additionalsMilkShake.map(add =>
              `
                <button type="button" id=${add.idAddName} class="adittional ${add.selected ? 'active' : ''}" ${add.available ? '' : 'disabled'} onClick="changeSelectedMS(${add.id})">${add.name}</button>
              `
            ).join('')}
          </div>
          <button
            class="btnCart btnCart-small addToCart"
            data-product-id=${prod.id}
            style="margin-top: 1rem"
            onclick="addMSToCart()">
              <i class="fas fa-cart-plus"></i>
              Adicionar item
          </button>
          <p>
            <a
            href="https://api.whatsapp.com/send?phone=+5577991998770&text=Ol??, quais os sabores de sorvete dispon??veis para Milk-shake?"
            target="_blank"
            class="linkFlavors">
                <button
                class="btn btnFlavors">
                    <i class="fab fa-whatsapp"></i>
                    Sabores
                </button>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>`
).join('')

/*SORVETES*/
var catSorvetes = [
  {
    id: '3tab3.1',
    number: 1,
    categorySorvete: 'sorvete',
    name:"Bola de sorvete",
    description: "Delicioso sorvete SUUUUPER cremoso!!",
    price:"R$1,00",
    priceNumb: 1.00,
    img: sorveteriaImages.imgBola,
    display: "display:flex"
  },
  {
    id: '3tab3.2',
    number: 2,
    categorySorvete: 'sorvete',
    name:"Sorvete na casquinha",
    description: "1 bola na casquinha desse sorvete maravilhoso e cremoso.",
    price:"R$1,00",
    priceNumb: 1.00,
    img: sorveteriaImages.imgCasquinha,
    display: "display:none"
  },
  {
    id: '3tab3.3',
    number: 3,
    categorySorvete: 'sorvete',
    name:"Sorvete no casc??o",
    description: "2 bolas no casc??o desse sorvete irresist??vel e cremoso!",
    price:"R$2,00",
    priceNumb: 2.00,
    img: sorveteriaImages.imgCascao,
    display: "display:none"
  },
  {
    id: '3tab3.4',
    number: 4,
    categorySorvete: 'picol??',
    name:"Picol?? cremoso",
    description: "Picol?? super cremoso!",
    price:"R$1,50",
    priceNumb: 1.50,
    img: sorveteriaImages.imgpicCremoso,
    display: "display:none"
  },
  {
    id: '3tab3.5',
    number: 5,
    categorySorvete: 'picol??',
    name:"Picol?? cristalizado",
    description: "Picol?? cristalizado super refrescante!",
    price:"R$1,50",
    priceNumb: 1.50,
    img: sorveteriaImages.imgpicCristalizado,
    display: "display:none"
  },
  {
    id: '3tab3.6',
    number: 6,
    categorySorvete: 'picol??',
    name:"Picol?? SKIMO",
    description: "Picol?? super cremoso coberto com uma deliciosa casquinha de chocolate!",
    price:"R$3,00",
    priceNumb: 3.00,
    img: sorveteriaImages.imgpicCasquinha,
    display: "display:none"
  },
  {
    id: '3tab3.7',
    number: 7,
    categorySorvete: 'cremosinho',
    name:"Cremosinho",
    description: "Sorvete no saquinho super cremoso!",
    price:"R$1,00",
    priceNumb: 1.00,
    img: sorveteriaImages.imgCremosinho,
    display: "display:none"
  }
]

document.getElementById('catSorvetes').innerHTML = catSorvetes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabSorvetes" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
              <button
                  class="btnCart btnCart-small addToCart"
                  data-product-id=${prod.id}
                  onclick="addItemToCart({
                    id: '${prod.id}',
                    name: '${prod.name}',
                    whichFlavor: true,
                    priceOne: '${prod.priceNumb}',
                    priceNumb: ${prod.priceNumb},
                    img: '${prod.img}',
                    count: 1
                  })">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar item
              </button>
              <p>
                <a
                href="https://api.whatsapp.com/send?phone=+5577991998770&text=Ol??, quais os sabores de *${prod.categorySorvete}* dispon??veis?"
                target="_blank"
                class="linkFlavors">
                    <button
                    class="btn btnFlavors">
                        <i class="fab fa-whatsapp"></i>
                        Sabores
                    </button>
                </a>
              </p>
          </div>
      </div>
    </div>
  </div>`
).join('')

/* Sess??o 4 - PADARIA
 P??es (4tab1)*/
var catPaes = [
  {
    id: '4tab1.1',
    number: 1,
    name:"P??o de doce",
    description: "P??ozinho de doce caseiro, delicioso e fofinho.",
    price:"R$0,50",
    img: padariaImages.imgPaoDoce,
    display: "display:flex",
    offer: "5 por: R$2,00"
  },
  {
    id: '4tab1.2',
    number: 2,
    name:"P??o de sal",
    description: "P??ozinho de sal caseiro, delicioso e fofinho.",
    price:"R$0,50",
    img: padariaImages.imgPaoSal,
    display: "display:none",
    offer: "5 por: R$2,00"
  },
  {
    id: '4tab1.3',
    number: 3,
    name:"Rosca doce",
    description: "P??ozinho em forma de rosca, super fofo e coberto com leite condensado e coco.",
    price:"R$0,75",
    img: padariaImages.imgRosca,
    display: "display:none",
    offer: "3 por: R$2,00"
  },
  {
    id: '4tab1.4',
    number: 4,
    name:"Sonho",
    description: "Delicioso sonho recheado. ?? de dar ??gua na boca!&#129316;",
    price:"R$1,50",
    img: padariaImages.imgSonho,
    display: "display:none",
  },
  {
    id: '4tab1.5',
    number: 5,
    name:"Donut",
    description: "Imposs??vel resistir a esse Donut coberto com brigadeiro!&#127849;",
    price:"R$2,00",
    img: padariaImages.imgDonut,
    display: "display:none",
  },
]

document.getElementById('catPaes').innerHTML = catPaes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabPaes" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
              ${prod.offer ?
              `<div class="offerDiv">
                <h3 class="headerOfferDiv"><i class="fas fa-certificate"></i>Oferta<i class="fas fa-certificate"></i></h3>
                <div class="bodyOfferDiv">${prod.offer}</div>
              </div>` 
              :``}
          </div>
      </div>
    </div>
  </div>`
).join('')

/* Bolos (4tab2)*/
 var catBolos = [
  {
    id: '4tab2.1',
    number: '01',
    name:"Bolo da prima",
    description: "O tradicional e queiridinho do caf?? de todo dia: Bolo de trigo, super fofinho e saboroso!",
    price:"R$7,00",
    img: padariaImages.imgprima,
    display: "display:flex"
  },
  {
    id: '4tab2.2',
    number: '02',
    name:"Bolo de Formigueiro",
    description: "A del??cia do bolo da prima com um plus: granulado de chocolate!",
    price:"R$7,50",
    img: padariaImages.imgformigueiro,
    display: "display:none"
  },
  {
    id: '4tab2.3',
    number: '03',
    name:"Bolo de Milho",
    description: "Delicioso bolo cremoso feito com fub?? de milho e milho verde. Uma del??cia!",
    price:"R$6,00",
    img: padariaImages.imgmilho,
    display: "display:none"
  },
  {
    id: '4tab2.4',
    number: '04',
    name:"Bolo de Arroz (G)",
    description: "Delicioso bolo de arroz (tamanho normal).",
    price:"R$6,00",
    img: padariaImages.imgarrozgrande,
    display: "display:none"
  },
  {
    id: '4tab2.5',
    number: '05',
    name:"Bolo de Arroz (P)",
    description: "Delicioso bolo de arroz (tamanho pequeno).",
    price:"R$3,50",
    img: padariaImages.imgarrozpequeno,
    display: "display:none"
  },
  {
    id: '4tab2.6',
    number: '06',
    name:"Brevidade (G)",
    description: "A famosa brevidade, delicioso bolo feito com tapioca e rapadura (tamanho normal).",
    price:"R$7,00",
    img: padariaImages.imgbrevidadegrande,
    display: "display:none"
  },
  {
    id: '4tab2.7',
    number: '07',
    name:"Brevidade (P)",
    description: "A famosa brevidade, delicioso bolo feito com tapioca e rapadura (tamanho pequeno).",
    price:"R$4,00",
    img: padariaImages.imgbrevidadepequena,
    display: "display:none"
  },
  {
    id: '4tab2.8',
    number: '08',
    name:"Bolo de Cenoura",
    description: "Aquele maravilhoso bolo de cenoura com uma deliciosa e generosa cobertura de chocolate.",
    price:"R$6,00",
    img: padariaImages.imgBoloCenoura,
    display: "display:none"
  }
]

document.getElementById('catBolos').innerHTML = catBolos.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabBolos" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
          </div>
      </div>
    </div>
  </div>`
).join('')

/* DiversosPad (4tab3)*/
var catDiversosPad = [
  {
    id: '4tab3.1',
    number: '01',
    name:"Chimango",
    description: "O tradicional e delicioso chimango (jo??o duro), feito com tapioca.",
    price:"R$1,00",
    offer: '4 por R$3,00',
    img: padariaImages.imgChimango,
    display: "display:flex"
  },
  {
    id: '4tab3.2',
    number: '02',
    name:"P??o de queijo",
    description: "Delicioso e fofinho p??o de queijo. Vem sentir o gostinho de Minas na Bahia.",
    price:"R$1,00",
    img: padariaImages.imgpaoqueijo,
    display: "display:none"
  },
  {
    id: '4tab3.3',
    number: '03',
    name:"Bolachinha de tapioca",
    description: "200g da famosa e deliciosa bolachinha de tapioca!",
    price:"R$4,00",
    img: padariaImages.imgbolachinha,
    display: "display:none"
  },
  {
    id: '4tab3.4',
    number: '04',
    name:"Doce de Leite",
    description: "O maravilhoso doce de leite caseiro, super cremoso e delicioso.",
    manyPrices: [
      {
        price: 'R$ 5,00',
        size: '250g'
      },
      {
        price: 'R$ 9,00',
        size: '500g'
      },
      {
        price: 'R$ 18,00',
        size: '1Kg'
      }
    ],
    img: padariaImages.imgDoceLeite,
    display: "display:none"
  },
  {
    id: '4tab3.5',
    number: '05',
    name:"Avoador",
    description: "O t??o conhecido biscoito de polvilho (avoador).",
    price:"R$4,00",
    img: padariaImages.imgavoador,
    display: "display:none"
  }
]

document.getElementById('catDiversosPad').innerHTML = catDiversosPad.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabDiversosPad" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>${prod.number}.</span> ${prod.name}</h3>
              ${prod.price ? `<text class="priceCatalog">${prod.price}</text>` : ``}
              <p>${prod.description}</p>
              ${prod.manyPrices ?
                `
                <div class="boxManyPrices">
                  ${prod.manyPrices.map((price =>
                    `
                    <div class="manyPrices manyPricesDoceLeite">
                      <h3 class="headerManyPrices">${price.size}</h3>
                      <div class="bodyManyPrices">${price.price}</div>
                    </div>
                    `
                  )).join('')}
                </div>
                `
                :
                ``
              }
              ${prod.offer ?
                `<div class="offerDiv">
                  <h3 class="headerOfferDiv"><i class="fas fa-certificate"></i>Oferta<i class="fas fa-certificate"></i></h3>
                  <div class="bodyOfferDiv">${prod.offer}</div>
                </div>`
                : ``
              }
          </div>
      </div>
    </div>
  </div>`
).join('')

let sizePizzaSelected = 'M';

let flavorLeftPizzaSelected = 'Tradicional';
let priceLeftPizzaSelected = 22.00;
let typeLeftPizzaSelected = 1;

let flavorRightPizzaSelected = 'Frango Catupiry';
let priceRightPizzaSelected = 24.00;
let typeRightPizzaSelected = 2;

let priceMakedPizza = 23.00;

let isToTakeOut = false;

/*changing sizes*/

window.changePizzaSizeSelection = function changePizzaSizeSelection(size, isJustOne){
  document.getElementById("choosePizzaSize").innerHTML = size;
  sizePizzaSelected = size;
  
  if (isJustOne) {
    document.querySelector('.boxImgPizzaChoose').classList.add('oneFlavor');
    document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavorRightPizzaSelected}">${flavorRightPizzaSelected}</p>`;
    flavorLeftPizzaSelected = flavorRightPizzaSelected;
    typeLeftPizzaSelected = typeRightPizzaSelected;
    priceLeftPizzaSelected = priceRightPizzaSelected;
    priceMakedPizza = priceRightPizzaSelected;
  } else {
    document.querySelector('.boxImgPizzaChoose').classList.remove('oneFlavor');
  }
  
  if (typeLeftPizzaSelected === typeRightPizzaSelected) {
    calculateMakedPizzaValueChangingSize(true, true);
  } else {
    calculateMakedPizzaValueChangingSize(false, true);
    calculateMakedPizzaValueChangingSize(false, false);
  }

  priceMakedPizza = (priceLeftPizzaSelected+priceRightPizzaSelected)/2;
  document.getElementById('idPriceMakedPizza').innerHTML = convertToReal(priceMakedPizza);
}

window.changePricesByChangingSize = function changePricesByChangingSize(isEqual, isLeft, price) {
  if (isEqual){
    priceLeftPizzaSelected = price;
    priceRightPizzaSelected = price;
  } else {
    isLeft 
    ? priceLeftPizzaSelected = price
    : priceRightPizzaSelected = price;
  }
}

window.calculateMakedPizzaValueChangingSize = function calculateMakedPizzaValueChangingSize(isEqual, isLeft){
  switch (isLeft ? typeLeftPizzaSelected : typeRightPizzaSelected) {
    case 1:
      pizzaPrices1.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 2:
      pizzaPrices2.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 3:
      pizzaPrices3.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 4:
      pizzaPrices4.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;
  
    default:
      break;
  }
}

/*changing flavors*/

window.changePrices = function changePrices(isLeft, price, isJustOne) {
  if (isJustOne) {
    priceRightPizzaSelected = price;
    priceLeftPizzaSelected = price;
  } else {
    isLeft 
      ? priceLeftPizzaSelected = price
      : priceRightPizzaSelected = price;
  }
  priceMakedPizza = (priceLeftPizzaSelected+priceRightPizzaSelected)/2;
  document.getElementById('idPriceMakedPizza').innerHTML = convertToReal(priceMakedPizza);
}

window.calculateMakedPizzaValue = function calculateMakedPizzaValue(type, isLeft, isJustOne){
  switch (type) {
    case 1:
      pizzaPrices1.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 2:
      pizzaPrices2.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 3:
      pizzaPrices3.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 4:
      pizzaPrices4.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;
  
    default:
      break;
  }
}

window.changeLeftPizzaSelection = function changeLeftPizzaSelection(flavor,type){
  document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavor}">${flavor}</p>`;
  flavorLeftPizzaSelected = flavor;
  typeLeftPizzaSelected = type;
  calculateMakedPizzaValue(type, true);
}

window.changeRightPizzaSelection = function (flavor, type){
  document.getElementById("choosePizzaFlavorRight").innerHTML = `<p title="${flavor}">${flavor}</p>`;
  flavorRightPizzaSelected = flavor;
  typeRightPizzaSelected = type;
  if (sizePizzaSelected==='Brotinho' || sizePizzaSelected==='Brot. Especial') {
    flavorLeftPizzaSelected = flavorRightPizzaSelected;
    typeLeftPizzaSelected = typeRightPizzaSelected;
    document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavorRightPizzaSelected}">${flavorRightPizzaSelected}</p>`;
    calculateMakedPizzaValue(type, false, true);
  } else {
    calculateMakedPizzaValue(type, false);
  }
  
}

window.toggleCheckbox = function toggleCheckbox(element) {
  isToTakeOut = element.checked;
}

window.chooseMakedPizza = function chooseMakedPizza(){
  let stringLevar = isToTakeOut ? ' - [levar]' : '';

  let stringFlavor = 
    flavorLeftPizzaSelected===flavorRightPizzaSelected
    ? flavorRightPizzaSelected
    : `${flavorLeftPizzaSelected}/${flavorRightPizzaSelected}`;

  let objMakedPizzaChoosed = {
    id: `${stringFlavor} - ${sizePizzaSelected}${stringLevar}`,
    name:`Pizza (${sizePizzaSelected})`,
    adittionals: `${stringFlavor}${stringLevar}`,
    isPizza: true,
    priceOne: priceMakedPizza,
    priceNumb: priceMakedPizza,
    img: "images/pizzaIcon.png",
    count: 1
  };

  addItemToCart(objMakedPizzaChoosed);
}

updateShoppingCartHTML();