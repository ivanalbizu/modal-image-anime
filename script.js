document.addEventListener('DOMContentLoaded', () => {

  //Activar Listeners Modales
  var mds = document.querySelectorAll('[data-modal]');
  mds.forEach(function(md) {
    md.addEventListener('click', openModal, false);
  });

  var closes = document.querySelectorAll('.md-close');
  closes.forEach(function(close) {
    close.addEventListener('click', closeModal, false);
  });
  document.querySelector('.md-overlay').addEventListener('click', closeModal, false);

});


const imgPosition = el => {
  const rect = el.getBoundingClientRect();
  return { 
    top: rect.top+'px',
    left: rect.left+'px',
    width: rect.width+'px',
    height: rect.height+'px',
   }
}

const move = (el, position) => {
  el.style.left = position.left;
  el.style.top = position.top;
  el.style.width = position.width;
  el.style.height = position.height;
}

const openModal = event => {
  const target = event.target;
  target.style.pointerEvents = 'none';
  const srcImageClicked = target.getAttribute('src');
  const dataModalID = 'modal-'+target.getAttribute('data-modal');
  const modal = document.querySelector('#'+dataModalID);
  const mdImage = modal.querySelector('.md-image');
  modal.classList.add('md--active');
  mdImage.style.backgroundImage = 'url('+srcImageClicked+')';
  
  const bg = document.createElement('div');
  bg.classList.add('bg-animation');
  bg.style.backgroundImage = 'url('+srcImageClicked+')';
  
  //Inicio posición de la imagen
  move(bg, imgPosition(target))
  
  target.parentNode.append(bg);
  
  //Fin posición de la imagen
  move(bg, imgPosition(mdImage))

  setTimeout(() => {
    bg.remove();
    target.style.pointerEvents = '';
  }, 800);
}

const closeModal = () => {
  if (document.querySelector('.md--active')) document.querySelector('.md--active').classList.remove('md--active');
}
