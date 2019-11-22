yo = require('yo-yo');

module.exports= yo`
<div class=" wow rollIn">
    <h1 class="  p-2 text-center titulo">
        CALCULO DIFERENCIAL
    </h1>
    <h5 class=" text-center subtitulo">PROBLEMA DE OPTIMIZACIÓN</h5>
    En la asignatura de Cálculo Diferencial se nos solicitó realizar un modelo matemático en el cual aplicáramos todos
    los conocimientos previos obtenidos durante el semestre en esta materia. El ejercicio que planteamos es un problema
    de optimización, los cuales cabe aclarar son utilizados cuando se quiere sacar mayor provecho a algo, por ejemplo,
    ¿Cuál es la mayor cantidad de terreno que puedo cercar con x cantidad de malla? O también se puede preguntar ¿Cuál
    es la forma más barata de cercar un terreno?, etc. A partir de estos ejemplos planteados en clase, logramos generar
    y resolver nuestro propio problema de optimización con el cual se quiere reducir el material que se ocupa al
    construir un semáforo.
    <h6 class=" text-center p-2 objetivos">Problema de optimización:</h6>
    <p class="pb-2">
        Con lámina de plástico reciclado se pretende hacer la cubierta de un semáforo que tiene forma de cilindro. Determine
    las dimensiones del semáforo si se quiere usar la menor lámina posible y obtener 20 000 cm3 de volumen.
    </p> 
    <div class=" text-center">
        V = r<sup>2</sup>πh = 20000cm<sup>3</sup> <br>
        A = 2r<sup>2</sup>π + 2rπh <br>
        <p class=" font-weight-bolder">Oteniendo el valor de h en terminos de r </p> <br>
        h=
        <div class=" fraction">
            <span >2000</span>
            <span class="bar">/</span>
            <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
        </div> <br>
    
        <p class=" font-weight-bolder">Sustituyendo el valor de h en A </p> <br>
    
        A = 2r<sup>2</sup>π + 2rπ (
        <div class=" fraction">
            <span >2000</span>
            <span class="bar">/</span>
            <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
        </div>
        ) <br>
        A = 2r<sup>2</sup>π+ <div class=" fraction">
            <span >4000</span>
            <span class="bar">/</span>
            <span class="fdn"> <i>r</i></span>
        </div> F.O. <br>
        <p class=" font-weight-bolder">Primera dervada</p>  <br>
        A<sup>'</sup> = 4rπ-<div class=" fraction">
            <span >4000</span>
            <span class="bar">/</span>
            <span class="fdn"> <i>r</i> <sup>2</sup></span>
        </div> <br>
        0 = 4rπ-<div class=" fraction">
            <span >4000</span>
            <span class="bar">/</span>
            <span class="fdn"> <i>r</i> <sup>2</sup></span>
        </div> <br>
        <img src="http://asp.adicae.net/proyectos/nacionales/hipotecas/images/semaforo-verde.gif" class=" float-right" alt="">
        4rπ =<div class=" fraction">
            <span >4000</span>
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
                    <span >80000</span>
                    <span class="bar">/</span>
                    <span class="fdn"> <i>r</i> <sup>3</sup></span>
                </div> <br>
           <div>
               A<sup>''</sup> = <span>37.69 </span> <span>mayor que</span> 0 Mínimo 
           </div> <br>
            <p class=" font-weight-bolder"> Solución de h</p>
            h =
            <div class=" fraction">
                    <span >20000</span>
                    <span class="bar">/</span>
                    <span class="fdn"> <i>r</i> <sup>2</sup>π</span>
                </div> <br>
            h =
            <div class=" fraction">
                    <span >20000</span>
                    <span class="bar">/</span>
                    <span class="fdn"> <i>(14.7101)</i> <sup>2</sup>π</span>
                </div> <br>
            h = 29.4204 cm
            
    </div>
    <br> <br> <br> <br>
</div>
`;