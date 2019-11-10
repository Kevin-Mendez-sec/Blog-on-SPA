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
      <div class="carousel-item ">
        <img src="semaforos.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h1 class="text-dark">!Los semaforos inteligentes son la solución¡</h5>
        </div>
      </div>
      <div class="carousel-item active">
        <img src="http://mdbootstrap.com/img/Photos/Others/nature4.jpg" class="d-block w-100" alt="...">
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
        <strong class="d-inline-block mb-2 text-primary"> Alguna materia </strong>
        <h3 class="mb-0">Featured post</h3>
        <div class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</div>
        <a href="#" class="stretched-link">Continua Leyendo</a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success">Design</strong>
        <h3 class="mb-0">Post title</h3>
        <div class="mb-1 text-muted">Nov 11</div>
        <div class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</div>
        <a href="#" class="stretched-link">Continua Leyendo</a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      </div>
    </div>
  </div>
  </div>
  </div>
  `;
