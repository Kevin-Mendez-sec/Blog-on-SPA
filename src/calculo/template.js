yo = require('yo-yo');

module.exports= yo`
<div class=" text-justify wow rollIn">
    <h1 class="  p-2 text-center titulo">
        CALCULO DIFERENCIAL
    </h1>
    <div>
        <div class="card mb-3">
            <img src="https://www.fisicalab.com/sites/all/files/contenidos/matematicas/2311_calcular_limites_punto/concepto_limite.gif"
                class="card-img-top rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title"> <a
                        href="https://www.mindomo.com/es/mindmap/linea-de-tiempo-limite-de9e25074e8a7a40309601438a8ce49b">Evolución
                        del concepto de limite de una función</a> </h5>
            </div>
        </div>
    </div>

    <h5 style="background-color: lightgreen;" class="  rounded-pill text-center subtitulo">Aplicación de límites de una función en diferentes</h5>
    En el área de las ciencias biológicas, en la enseñanza media ya aparecen aplicaciones matemáticas, como son los
    logaritmos para calcular el pH en química, las ecuaciones químicas, el cálculo de mezclas... En biología, la forma
    en que los padres transmiten su información a sus hijos, o genética, es una materia que utiliza mucho la estadística
    y probabilidad. Es el caso de los estudios de Mendel, por ejemplo, quién se dedicó a estudiar el comportamiento de
    ciertas plantas a las que cruzó y determinó cómo se relacionaban genéticamente los padres con los hijos, hablando de
    Genotipo y Fenotipo.
    Aplicaciones de la Topografía a la Construcción.
    Un levantamiento topográfico del lugar, para utilizarse en la preparación de los planos de las estructuras; el
    establecimiento en el terreno de un sistema de estacas o de otras marcas, tanto en planta como en elevaciones, de
    las cuales se pueden tomar medidas para las terracerías y para las estructuras por el personal encargado de la
    construcción; dar línea y niveles según sea necesario, para reponer las estacas movidas por la construcción o para
    localizar puntos adicionales en la misma estructura.

    <div>

        <div>
            <br>
            <h5  style="background-color: darkcyan;" class=" subtitulo text-center rounded-pill">COTINUIDAD DE UNA FUNCIÓN A LO LARGO DE LA HISTORIA</h5>
            <div> <br>
                <img src="linea-calculo.jpg" class=" imgzoom img-fluid" width="100%" height="auto">
            </div>
                <br>
        </div>


        <h5 style="background-color: darksalmon;" class=" rounded-pill text-center subtitulo">PROBLEMA DE OPTIMIZACIÓN</h5>
        En la asignatura de Cálculo Diferencial se nos solicitó realizar un modelo matemático en el cual aplicáramos
        todos
        los conocimientos previos obtenidos durante el semestre en esta materia. El ejercicio que planteamos es un
        problema
        de optimización, los cuales cabe aclarar son utilizados cuando se quiere sacar mayor provecho a algo, por
        ejemplo,
        ¿Cuál es la mayor cantidad de terreno que puedo cercar con x cantidad de malla? O también se puede preguntar
        ¿Cuál
        es la forma más barata de cercar un terreno?, etc. A partir de estos ejemplos planteados en clase, logramos
        generar
        y resolver nuestro propio problema de optimización con el cual se quiere reducir el material que se ocupa al
        construir un semáforo.
        <h6 class=" text-center p-2 objetivos">Problema de optimización:</h6>
        <p class="pb-2">
            Con lámina de plástico reciclado se pretende hacer la cubierta de un semáforo que tiene forma de cilindro.
            Determine
            las dimensiones del semáforo si se quiere usar la menor lámina posible y obtener 20 000 cm3 de volumen.
        </p>
        <div class=" text-center">
            V = r<sup>2</sup>πh = 20000cm<sup>3</sup> <br>
            A = 2r<sup>2</sup>π + 2rπh <br>
            <p class=" font-weight-bolder">Oteniendo el valor de h en terminos de r </p> <br>
            h=
            <div class=" fraction">
                <span>2000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
            </div> <br>

            <p class=" font-weight-bolder">Sustituyendo el valor de h en A </p> <br>

            A = 2r<sup>2</sup>π + 2rπ (
            <div class=" fraction">
                <span>2000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
            </div>
            ) <br>
            A = 2r<sup>2</sup>π+ <div class=" fraction">
                <span>4000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i></span>
            </div> F.O. <br>
            <p class=" font-weight-bolder">Primera dervada</p> <br>
            A<sup>'</sup> = 4rπ-<div class=" fraction">
                <span>4000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup></span>
            </div> <br>
            0 = 4rπ-<div class=" fraction">
                <span>4000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup></span>
            </div> <br>
            <img src="http://asp.adicae.net/proyectos/nacionales/hipotecas/images/semaforo-verde.gif"
                class=" float-right" alt="">
            4rπ =<div class=" fraction">
                <span>4000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup></span>
            </div> <br>
            4πr<sup>3</sup>= 40000 <br>

            r =
            <span class="radical"><span class="n-root">3</span>√</span><span class="radicand">
                <div class=" fraction">
                    <span class=" pt-3">4000</span>
                    <span class="bar">/</span>
                    <span class="fdn"> 4π</span>
                </div>
                = 14.7101cm
            </span>
        </div>
        <br>
        <br>


        <div class=" text-center">
            <p class=" font-weight-bolder">Segunda derivada</p>
            A<sup>''</sup> = 4π + <div class=" fraction">
                <span>80000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>3</sup></span>
            </div> <br>
            <div>
                A<sup>''</sup> = <span>37.69 </span> <span>mayor que</span> 0 Mínimo
            </div> <br>
            <p class=" font-weight-bolder"> Solución de h</p>
            h =
            <div class=" fraction">
                <span>20000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
            </div> <br>
            h =
            <div class=" fraction">
                <span>20000</span>
                <span class="bar">/</span>
                <span class="fdn"> <i>(14.7101)</i> <sup>2</sup>π</span>
            </div> <br>
            h = 29.4204 cm

        </div>
        <br> <br> <br> <br>
    </div>
    `;