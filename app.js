
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

    // this.documentWidth = 250;
    // this.documentHeight = 250;

    this.evolution = 0;


    this.canvasElement = document.createElement('canvas');
    this.canvasElement.setAttribute("width", this.documentWidth);
    this.canvasElement.setAttribute("height", this.documentHeight);
    this.canvasElement.setAttribute("id", "canvas");
    document.body.appendChild(this.canvasElement);
    this.ctx = this.canvasElement.getContext('2d');
    this.colorNamePool = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    this.colorNames = ["purple","Orchid","green","PaleGreen"];
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
            this.dataTable[row][column] = this.getRandomColor();
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

    this.ctx.clearRect(0, 0, this.documentWidth, this.documentHeight);
    
    for (let c = 0; c < this.dataTable.length; c++)  {
        for (let r = 0; r < this.dataTable[c].length; r++)  {
            let cell = this.dataTable[c][r];
            this.ctx.fillStyle = cell;
            this.ctx.fillRect(c, r, 1, 1);
        }
    }
  }

  evolve() {
    for (let row = 0; row < this.documentHeight; row++) {
        for (let column = 0; column < this.documentWidth; column++) {

            var evolve = _.random(0, 10);
            var strength = _.random(1, 4);
            
            var currentColor = this.dataTable[row][column];

            if (evolve > 9) {

                for (var i = 1; i < strength; i++)  {
                    var directionToEvolve = _.random(1, 4);
                    switch (directionToEvolve) {
                        case 1:
                            let r = row === 0 ? 0 : row - 1;
                            this.dataTable[r][column] = currentColor;
                            break;
                        case 2:
                            this.dataTable[row][(column + 1)] = currentColor;
                            break;
                        case 3:
                            let v = row === (this.documentHeight - 1) ? (this.documentHeight - 1) : row + 1;
                            this.dataTable[v][column] = currentColor;
                            break;
                        case 4:
                            this.dataTable[row][(column - 1)] = currentColor;
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

setInterval(() => {
    window.requestAnimationFrame(() => {
        elm.evolve();
        elm.build();
    });
}, 10);
