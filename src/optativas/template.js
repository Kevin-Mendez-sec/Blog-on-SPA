yo = require('yo-yo');

module.exports= yo`

<div class="container wow bounceInDown">
  <div class="card mb-3 shadow-lg bg-white rounded">
    <img class="card-img-top" width="200" height="250"
      src="http://observatorio.edomex.gob.mx/sites/observatorio.edomex.gob.mx/files/images/banners_mision%2C-vis-y-obj.jpg">
    <div class="card-body">
      <h5 class="card-title text-primary">Estrategias para la resolucion de conflictos </h5>
      <h3 class="mb-0">Misión,Visión,Metas</h3>
      <div class="card-text mb-auto">Dentro de este apartado se habla acerca de la misión que se tiene con el proyecto ,
        asi como la vision y las metas sobre el mismo</div>
      <a href="/optativas/estrategias" class="stretched-link">Conocer más...</a>
    </div>
  </div>
  <div
    class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
    <div class="col p-4 d-flex flex-column position-static">
      <h5 class="d-inline-block mb-2 text-success">Etimologías</h5>
      <h3 class="mb-0">Glosario de 50 palabras </h3>
      <div class="mb-auto">Contiene un glosario etimologico de palabras relacionadas con el medio ambiente.
      </div>
      <a href="/optativas/etimologias" class="stretched-link">Ver Glosario</a>
    </div>
    <div class="col-auto d-none d-lg-block">
      <img class="bd-placeholder-img" width="200" height="250"
        src="data:image/png;base64,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">
    </div>
  </div>

  <div
    class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
    <div class="col p-4 d-flex flex-column position-static">
      <h5 class="d-inline-block mb-2 text-success">Bioquímica</h5>
      <h3 class="mb-0"> Mapa conceptual  </h3>
      <div class=" mb-auto"> Acerca de los factores de la diabetes y obesidad y su prevención reflexión sobre las causas y consecuencias de estos problemas de salud</div>
    <a href="/optativas/bioquimica" class="stretched-link">Saber más...</a>
  </div>
  <div class="col-auto d-none d-lg-block">
    <img class="bd-placeholder-img" src="https://image.flaticon.com/icons/png/512/2015/2015191.png" width="200" height="250">
  </div>
</div>

<div
  class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
  <div class="col p-4 d-flex flex-column position-static">
    <h5 class="d-inline-block mb-2 text-success">Herencia y evolución</h5>
    <h3 class="mb-0">Alimentos transgénicos </h3>
    <div class=" mb-auto"> Concepto, la razón de su existencia y sus posibles consecuencias. Desarrolla particularmente el caso del jitomate, sus efectos ambientales, a la salud y técnicas de modificación genética.</div>
  <a href="/optativas/herencia" class="stretched-link">Saber más...</a>
</div>
  
<div class="col-auto d-none d-lg-block">
  <img
    src="https://images.vexels.com/media/users/3/159257/isolated/preview/1b111da2b3901960d586e994c1e1731b-bosquejo-de-la-cadena-de-adn-by-vexels.png"
    class="bd-placeholder-img" width="200" height="250">
</div>
</div>

<div
  class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
  <div class="col p-4 d-flex flex-column position-static">
    <h5 class="d-inline-block mb-2 text-success">Dibujo</h5>
    <h3 class="mb-0">Vídeo </h3>
    <div class="mb-auto">Vídeo sobre la realización de una maqueta desde su representación isométrica hasta la representación ortogonal
    </div>
    <a href="/optativas/dibujo" class="stretched-link">Saber más...</a>
  </div>
  <div class="col-auto d-none d-lg-block">
    <img src="https://cdn.pixabay.com/photo/2013/07/12/14/46/sketch-148769_960_720.png" class="bd-placeholder-img"
      width="200" height="250">
  </div>
</div>
</div>

`;