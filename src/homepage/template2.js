var yo = require('yo-yo');

module.exports = yo`
<div>
  <h3 class="pb-4 mb-4 font-italic border-bottom">
    From the Firehose
  </h3>

  <div class="blog-post">
    <h2 class="blog-post-title">Sample blog post</h2>
    <div class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></div>

    <div>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
      typography, images, and code are all supported.</div>
    <hr>
    <div>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu
      leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras
      mattis consectetur purus sit amet fermentum.</div>
    <blockquote>
      <div>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
    </blockquote>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <h2>Heading</h2>
    <div>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus,
      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum
      at eros.</div>
    <h3>Sub-heading</h3>
    <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
    <divre><code>Example code block</code></pre>
      <div>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus,
        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</div>
      <h3>Sub-heading</h3>
      <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum
        nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</div>
      <ul>
        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
        <li>Donec id elit non mi porta gravida at eget metus.</li>
        <li>Nulla vitae elit libero, a pharetra augue.</li>
      </ul>
      <div>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</div>
      <ol>
        <li>Vestibulum id ligula porta felis euismod semper.</li>
        <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
        <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
      </ol>
      <div>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</div>
  </div><!-- /.blog-post -->

  <div class="blog-post">
    <h2 class="blog-post-title">Another blog post</h2>
    <div class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></div>

    <div>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu
      leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras
      mattis consectetur purus sit amet fermentum.</div>
    <blockquote>
      <div>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
    </blockquote>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <div>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus,
      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum
      at eros.</div>
  </div><!-- /.blog-post -->

  <div class="blog-post">
    <h2 class="blog-post-title">New feature</h2>
    <div class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></div>

    <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum
      nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
      tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</div>
    <ul>
      <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
      <li>Donec id elit non mi porta gravida at eget metus.</li>
      <li>Nulla vitae elit libero, a pharetra augue.</li>
    </ul>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <div>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</div>
  </div><!-- /.blog-post -->

  <nav class="blog-pagination">
    <a class="btn btn-outline-primary" href="#">Older</a>
    <a class="btn btn-outline-secondary disabled" href="#" tabindex="-1" aria-disabled="true">Newer</a>
  </nav>

</div>`;