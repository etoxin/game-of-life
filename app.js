
/**
 * 
 * 
 * @class component
 */
class component {
    
  /**
   * Creates an instance of component.
   * 
   * 
   * @memberOf component
   */
  constructor () {
    this.dataTable = [];
    
    this.documentWidth = window.innerWidth || document.body.clientWidth;
    this.documentHeight = window.innerHeight || document.body.clientHeight;

    this.documentWidth = 20;
    this.documentHeight = 20;

    this.evolution = 0;

    this.colorNames = ["red", "blue", "green"];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  /**
   * 
   * 
   * 
   * @memberOf component
   */
  createDataTable() {
    for (let row = 0; row < this.documentHeight; row++) {
        this.dataTable[row] = [];
        for (let column = 0; column < this.documentWidth; column++) {
            this.dataTable[row][column] = {};
            this.dataTable[row][column].color = this.getRandomColor();
        }
    }

    // console.log(this.dataTable);
  }

  /**
   * 
   * 
   * @returns {string}
   * 
   * @memberOf component
   */
  getRandomColor() {
    const index = _.random(0, this.colorNames.length);
    return this.colorNames[index];
  }

  /**
   * 
   * 
   * 
   * @memberOf component
   */
  build() {
    for (let c = 0; c < this.dataTable.length; c++)  {
        for (let r = 0; r < this.dataTable[c].length; r++)  {
            var cell = this.dataTable[c][r];
            
            cell.geometry = new THREE.BoxGeometry( 1, 1, 1 );
            cell.material = new THREE.MeshBasicMaterial( { color: cell.color } );
            cell.cube = new THREE.Mesh( cell.geometry, cell.material );
            this.scene.add( cell.cube );
            cell.cube.position.x = c * 2;
            cell.cube.position.y = r * 2;

        }
    }
    this.camera.position.z = 75;
  }

  update() {
    for (let c = 0; c < this.dataTable.length; c++)  {
        for (let r = 0; r < this.dataTable[c].length; r++)  {
            var cell = this.dataTable[c][r];
            cell.cube.material.color.set(cell.color);
        }
    }
  }

  evolve() {
    for (let row = 0; row < this.documentHeight; row++) {
        for (let column = 0; column < this.documentWidth; column++) {

            var evolve = _.random(0, 10);
            var strength = _.random(1, 4);
            
            var currentColor = this.dataTable[row][column].color;

            if (evolve > 9) {

                for (var i = 1; i < strength; i++)  {
                    var directionToEvolve = _.random(1, 4);
                    switch (directionToEvolve) {
                        case 1:
                            let r = row === 0 ? 0 : row - 1;
                            this.dataTable[r][column].color = currentColor;
                            break;
                        case 2:
                            if (_.isUndefined(this.dataTable[row][(column + 1)])) break;
                            this.dataTable[row][(column + 1)].color = currentColor;
                            break;
                        case 3:
                            let v = row === (this.documentHeight - 1) ? (this.documentHeight - 1) : row + 1;
                            this.dataTable[v][column].color = currentColor;
                            break;
                        case 4:
                            if (_.isUndefined(this.dataTable[row][(column - 1)])) break;
                            this.dataTable[row][(column - 1)].color = currentColor;
                            break;
                    }
                }
            }
        }
    }
    console.log('Evoloution: ' + this.evolution);
    this.evolution++;
  }
}

const elm = new component();
elm.createDataTable();
elm.build();
elm.renderer.render( elm.scene, elm.camera );
setInterval(() => {
    window.requestAnimationFrame(() => {
        elm.evolve();
        elm.update();
        elm.renderer.render( elm.scene, elm.camera );
    });
}, 100);



/* */
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(elm.renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
});
