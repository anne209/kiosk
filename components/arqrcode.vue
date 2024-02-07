<!-- Wurde nicht benutzt, da schlecht implementierbar -->


<!-- Rahmen wird importiert-->
<script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"
src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>

<!-- style vom loader wird definiert-->
<style>
  .arjs-loader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0; 
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arjs-loader div {
    text-align: center;
    font-size: 1.25em;
    color: white;
  }
</style>

<body style="margin : 0px; overflow: hidden;"></body>
    <div class="arjs-loader">
      Loading, please wait...</div>


  <!-- //a-nft definiert das tracking vom Bild --->
    <a-scene
    vr-mode-ui="enabled: false;"
    renderer="logarithmicDepthBuffer: true;"
    embedded
    arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  
    

    <a-nft
      type="nft"
      url="https://hallo.de"
      smooth="true"
      smoothCount="10"
      smoothTolerance=".01"
      smoothThreshold="5"></a-nft>
      <a-entity
        gltf-model="<path-to-your-model>"
        scale="5 5 5"
        position="50 150 0"> </a-entity>
    
    <a-entity camera></a-entity>
  </a-scene>
