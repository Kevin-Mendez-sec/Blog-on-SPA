var yo = require('yo-yo');
module.exports = yo`
<div>
    <div id="carouselExampleIndicators" class="carousel slide pt-2" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="semaforos.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h1  style="color: black;">!Los semaforos inteligentes son la solución¡</h5>
        </div>
      </div>
      <div class="carousel-item ">
        <img src="semaforosinteligentes.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://mdbootstrap.com/img/Photos/Others/images/92.jpg" class="d-block w-100 " alt="...">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    </div>

    <div class="p-2"></div>
  
  <div class="row mb-2">
  <div class="col-md-6 ">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-primary"> ¿ Sabias que ? </strong>
        <h3 class="mb-0">Semáforos inteligentes en la capital</h3>
        <div class="card-text mb-auto">En la capital del pais ya se incorpora un sistema de semaforos inteligentes para mejorar el transito vehicular</div>
        <a href="https://www.elsoldemexico.com.mx/metropoli/cdmx/asi-operan-los-semaforos-inteligentes-en-la-capital-3287849.html" class="stretched-link">Saber más!</a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img src="https://www.elsoldemexico.com.mx/metropoli/dcovee-070419-semaforos-inteligentes-metropoli-web.png/ALTERNATES/FREE_160/070419%20Sema%CC%81foros%20Inteligentes%20Metro%CC%81poli%20WEB.png" alt="" srcset="">
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success">Te podría interesar!</strong>
        <h3 class="mb-0">Semaforos Inteligentes ITESM</h3>
        <div class="mb-auto text-justify"> Semáforos inteligentes es un proyecto que esta siendo desarrollado por Estudiantes del ITESM Campus Toluca.</div>
        <a href="https://www.facebook.com/pg/SemaforointeligenteITESM/about/?ref=page_internal" class="stretched-link">Continua Leyendo</a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img  width="160px" height="240px" src="https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/1796482_1447965538770205_1630895418_n.jpg?_nc_cat=102&_nc_oc=AQm3JXr0mTFhBtLA6u-o38z2pmtVe4YhxZgOTDShBwKnDjC1cn-wpiz62hGyoKnRAgw&_nc_ht=scontent.fmex6-1.fna&oh=ee447ed076e865eb203957d4a0380337&oe=5E4271C8" alt="" srcset="">
      </div>
    </div>
  </div>
  </div>
  </div>
  `;
