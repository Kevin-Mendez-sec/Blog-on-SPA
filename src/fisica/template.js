yo = require('yo-yo');

module.exports= yo`
<div>
    <h1 class="p-2 titulo text-center" style=" font-size: 80px; "> Fisica II</h1>
    <div class="text-justify wow fadeInRightBig">
        <h5 class="p-2 text-center rounded-pill subtitulo" style="background-color: #BC8F8F;"> ¿Qué principio físico que sustenta el prototipo?</h5>
        Nuestro prototipo se ve sustentado en el principio físico que se conoce como el efecto fotovoltaico (FV), este
        proceso es la base mediante el cual una célula fotovoltaica convierte la luz solar en electricidad. La luz solar
        está compuesta por fotones. Estos fotones son de diferentes energías, correspondientes a las diferentes
        longitudes de onda del espectro solar. Cuando un fotón es absorbido, la energía del fotón se transfiere a un
        electrón de un átomo de la célula. Con esta nueva energía, el electrón es capaz de escapar de su posición normal
        asociada con un átomo para formar parte de una corriente en un circuito eléctrico.
        <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #FFC0CB;" >¿Qué problemática social resuelve? </h5>
        Lo que nuestro prototipo busca resolver consiste en: disminuir las horas que una persona pasa en el tráfico y al
        mismo tiempo conseguir que se reduzca el nivel de contaminación auditiva y visual del medio en el que se
        desarrollan los estudiantes del plantel “Dr. Ángel María Garibay Kintana” ya que esto afecta a los niveles de
        estrés en los alumnos y causa una baja en sus calificaciones.
        <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #778899;"> ¿A quién va dirigido el proyecto?</h5>
        Este proyecto fue creado pensando en una de las principales problemáticas sociales que afectan a los estudiantes
        del plantel “Dr. Ángel Ma. Garibay Kintana” ubicado en Heriberto Enríquez Esq. Ceboruco, Col. Azteca, Toluca,
        México, sin embargo, esta problemática no solo afecta a los alumnos de Prepa 5 sino que se da en todas partes del país,
        es decir que nuestro proyecto puede ser aplicado en cualquier parte de México.

        <h5 class="text-center rounded-pill subtitulo" style="background-color:cornflowerblue;"> Antecedentes:</h5>
        <div>
            <h6 class="text-center objetivos">1. Definición etimológica.</h6>

            La palabra semáforo proviene del griego σῆμα (sema), que significa señal, y φόρος (foros), que significa
            portador, es
            decir, un semáforo es lo que "lleva las señales".
            <div>
                <img class="img-fluid" width="200" height="300"src="http://elbuho.pe/wp-content/uploads/2018/02/1-1.jpg" alt="">
                <img  class="img-fluid" width="300" height="500" src="https://tropicalizandoberlin.files.wordpress.com/2011/04/p1060355.jpg" alt="" srcset="">
            </div>

            <h6 class="text-center objetivos">2. Concepto. </h6>
            • Los semáforos, también conocidos técnicamente como señales de control de tráfico, son dispositivos de
            señales que se
            sitúan en intersecciones viales y otros lugares para regular el tráfico, y por ende, el tránsito peatonal.
            • El diccionario de la Real Academia Española define el semáforo como: Aparato eléctrico de señales
            luminosas para
            regular la circulación.
            <div>
                <img class="img-fluid" width="600" height="300"src="http://cdn2.atraccion360.com/media/aa/styles/xlarge/public/images/2017/07/headernota.jpg" alt="">
            </div>

            <h6 class="text-center objetivos"> 3. Historia y evolución.</h6>
            • El primer semáforo de luces de tránsito que se instaló en la historia, fue en el exterior del parlamento
            británico de
            Westminster; obra del ingeniero J.P. Knight, especialista en señales de ferrocarril.
            Este aparato empezó a funcionar el 10 de diciembre de 1868 e imitaba a las señales de ferrocarril y sólo
            usaba las luces
            de gas rojas y verdes por la noche. Dos zumbidos señalaban que el tráfico que podía avanzar era el de la
            avenida y un
            sólo zumbido indicaba que era el tráfico de la calle.
            • Debido a la proliferación de autos, el 4 de agosto de 1914 se instaló el primer semáforo «moderno» en
            Estados Unidos,
            inventado por Garrett Augustus Morgan, gestionaba el tráfico entre la avenida Euclid y la calle 105. Contaba
            con luces
            rojas y verdes. Además incorporaba un emisor de zumbidos como su antecesor inglés.
        </div>
        <div>
            <h5 class="text-center subtitulo rounded-pill" style="background-color: gold;">Los materiales que se usaron en la elaboración del prototipo son:</h5>
            • LEDs de colores (rojo, verde y amarillo). <img class="img-fluid" width="100" height="50"src="https://hackster.imgix.net/uploads/attachments/446767/led_AOuhtzYEQe.png?auto=compress%2Cformat&w=600&h=450&fit=min" alt=""><br>
            • Resistencias <br> <br>
            • Cable UTP <br>
            • Arduino UNO. <img class="img-fluid" width="100" height="50"src="https://cdn-reichelt.de/bilder/web/xxl_ws/A300/ARDUINO_UNO_DIP_01.png" alt="" ><br>
            • Sensores de tacto. <br>
            • Panel solar.  <img class="img-fluid" width="100" height="50"src="https://www.electronicaembajadores.com/datos/fotos/articulos/grandes/sa/sa41/sa41s03.jpg" alt=""><br>
            • Diodo rectificador. <br><br>
            • Batería recargable, cargador de batería y un amplificador de corriente. <br> <br>
            • Papel cascaron, popotes y hojas de colores. <br>
            <h5 class="rounded-pill text-center subtitulo" style="background-color:#FA8072">Gráficas y datos estadisticos</h5>
            El funcionamiento del semáforo inteligente se basa en 3 variables las cuales son las entradas analógicas
            producidas por
            las fotorresistencias e interpretadas por la placa (Arduino UNO) estas variables son directamente
            proporcionales a la
            cantidad de luz que capta la fotorresistencia. Se toma como base 5v y dependiendo del voltaje que se reciba
            se dará un
            valor entre 0 y 1024, esta será nuestra variable a evaluar. Esta variable es de suma importancia porque es
            la que
            determina la prioridad que se le dará a cada vía, dicho de otro modo, entre menor sea el valor, mayor será
            la prioridad
            y viceversa.
            Al realizar las pruebas necesarias tapando solo una de las resistencias cada vez obtuvimos los siguientes
            datos:
            <div>
                <img class="img-fluid wow rollIn" width="800" height="500" src="tabla.png" alt="">
            </div>
            En el promedio de los resultados se puede notar que las tres resistencias promedian valores muy similares,
            de los cuales
            se puede concluir: <br>
            <p>
                “Cada que se priva de luz a una fotorresistencia esta arrojará un valor cercano a 827 el cual en el programa puede ser evaluado como x 1000
            </p> 
        </div>
        <div>
            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #DAA520;">Viabilidad del prototipo:</h5>
            Nuestro proyecto “semáforo inteligente” es viable, ya que este prototipo nos ayudará a resolver el tráfico
            el cual
            es una problemática social de la que todos somos conscientes y nos afecta a todos por igual conduzcamos un
            automóvil
            o no. Por otra parte también es viable porque es auto suficiente lo que significa que la energía captada por
            el
            panel solar es almacenada en la batería recargable y esta es su única fuente de energía, una energía verde.
            El punto
            más importante por lo que es viable es el costo de producción, económicamente es muy barato de construir por
            que se
            busca utilizar materiales como el plástico reciclado para la cubierta exterior.
            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #008080">Conclusión:</h5>
            En esta fase se define el cómo este proyecto resuelve un problema social del entorno de los miembros de
            nuestra
            institución educativa, adaptamos el prototipo con las modificaciones creativas necesarias para resolver el
            problema
            social de nuestro entorno, además, se anexaron las correcciones finales, los últimos ajustes de las
            propuestas de
            innovación y aportaciones creativas que se realizaron.
            El resumen final se conjunto en el blog, con ciertos requerimientos como el título del prototipo, el
            principio
            físico que sustenta al prototipo, la problemática social que resuelve el prototipo en este caso la
            disminución de la
            contaminación del aire, a quién va dirigido es decir, a la comunidad que forma parte del Plantel Dr. Ángel
            Ma.
            Garibay Kintana, así como antecedentes, materiales, tablas, gráficas como medios para representar los datos
            obtenidos de las pruebas con el prototipo, además se generó un escrito sobre la viabilidad de la
            implementación del
            prototipo cumpliendo con el lugar dónde se puede usar, la forma en la que se aplica en la comunidad y quién
            lo puede
            usar.
            <p class=" pb-4"></p>
        </div>
    </div>
</div>

`;