var yo =require('yo-yo');

module.exports = yo`
<div>
  <h1 class="blog-post-title text-center">ESTRATEGIAS</h1>
    <h2 class="blog-post-title text-center"> <img class="bd-placeholder-img" width="40" height="40" src="data:image/png;base64,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">
    Semáforos Inteligentes 
    <img class="bd-placeholder-img" width="40" height="40" src="data:image/png;base64,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"> 
  </h2>
    <h3>Visión</h3>
    <div class="text-justify">Nuestro prototipo consiste en un semáforo inteligente, el cual será alimentado con una celda solar y con él se busca mejorar los intervalos de tiempo de espera: siga, precaución y pare, esto se quiere lograr automatizando y programando las decisiones que tomaría un policía de tránsito cuando un semáforo no funciona. </div>
    <h3>Misión</h3>
    <div class="text-justify">Queremos desarrollar este prototipo ya que es una forma sustentable para resolver el contratiempo que causa el tráfico, es un proyecto verde o ecológico porque como lo dice su definición un proyecto ecológico es aquel que está orientado al desarrollo de prácticas responsables con su entorno y con el diseño de soluciones. En este proyecto se busca disminuir la cantidad de contaminación producida por los automóviles y esto se logrará de una forma amigable con el ambiente.</div>
    <h3>Metas</h3>
    <div class="text-justify">Se lograría la reducción de tiempos que se emplean en los recorridos en vehículo,  la contaminación ambiental, auditiva y visual, lo cual se pretende lograr a finales de este semestre.</div>
</div>`;