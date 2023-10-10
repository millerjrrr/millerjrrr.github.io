function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}


class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }

  sumNeighbours(x,y){
    let sum = 0;
    for(let i=-1;i<2;++i){
      for(let j=-1;j<2;++j)
      {
        if(x+i>=0 && x+i<this.width && y+j>=0 && y+j<this.height
         && !(i==0 && j==0)) 
          sum+=this.get(x+i, y+j);
      }
    }
    return sum;
  }
}


class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}


Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};


function drawGridFromGridMatrix(matrix, scale) {

  rows = [];

  for(let i=0;i<matrix.height;++i){
    let row = [];
    let colour;
    
      for(let j=0;j<matrix.width;++j){

    if(matrix.get(j,i)==0){ colour = "white"; } else {colour = "black";} 
    row.push(elt("td",{id: `${i},${j}`,style: `background-color: ${colour}`}));
  }
    rows.push(elt("tr", {style: `height: ${scale}px`},
        ...row));
  }

  return elt("table", {
    class: "background",
    style: `width: ${matrix.width*scale}px`
  }, ...rows
  );
}
  


function updateGrid(matrix){

let colour;
  for (let {x, y, value} of matrix) {
if(value == 0) colour = "white"; else if(value == 1) colour = "black";
else colour = "red"; 
document.getElementById(`${x},${y}`).setAttribute("style",`background-color:${colour}`);
}

}

function addGridInteraction(matrix){

  for(let {x,y,value} of matrix)
  document.getElementById(`${x},${y}`).addEventListener("click", () => {
    if(workingMatrix.get(x,y)==0)
    workingMatrix.set(x,y,1); else workingMatrix.set(x,y,0);

    updateGrid(workingMatrix);
  });

}









function initializeMatrix(matrix){

  for (let {x, y, value} of matrix) {
matrix.set(x,y,Math.round(Math.random()));
  }

}

function blackoutMatrix(matrix,n){

  for (let {x, y, value} of matrix) {
matrix.set(x,y,n);
  }

}


//defining a method SumNeighbours for this inside the Matrix class
function conwayUpdateMatrix(matrix){
let newMatrix =new Matrix(matrix.width,matrix.height,(x,y)=>0);
  for (let {x, y, value} of matrix) {
    newMatrix.set(x,y,matrix.get(x,y));
    if(matrix.sumNeighbours(x,y)<2 || matrix.sumNeighbours(x,y)>3) 
    newMatrix.set(x,y,0);
    if(matrix.sumNeighbours(x,y)==3)
    newMatrix.set(x,y,1);
  }

  for (let {x, y, value} of matrix) {
     
    matrix.set(x,y,newMatrix.get(x,y));
    
  }
}

function mostNeighbours(matrix){
 let sum = 0;
  for (let {x, y, value} of matrix) {
    if(matrix.sumNeighbours(x,y)>sum) sum=matrix.sumNeighbours(x,y);
  }
return sum;
}

function showNeighbours(matrix){

  for(let {x,y,value} of matrix){

    document.getElementById(`${x},${y}`).innerText=matrix.sumNeighbours(x,y);
  }

}

//Comands ----------------------

let workingMatrix = new Matrix(30,30,(x,y)=>(x+y)%2);
document.getElementById("grid").appendChild(drawGridFromGridMatrix(workingMatrix,25));
initializeMatrix(workingMatrix);
updateGrid(workingMatrix);
addGridInteraction(workingMatrix);



//blackoutMatrix(workingMatrix);

document.getElementById("conwayEvolution").addEventListener("click", () => {
conwayUpdateMatrix(workingMatrix);
updateGrid(workingMatrix);
});

document.getElementById("randomReset").addEventListener("click", () => {
  initializeMatrix(workingMatrix);
  updateGrid(workingMatrix);
  });

  document.getElementById("mostNeighbours").addEventListener("click", () => {
    document.getElementById("mostNeighboursValue").innerText=mostNeighbours(workingMatrix);

    });

    document.getElementById("showNeighbours").addEventListener("click", () => {
      showNeighbours(workingMatrix);
  
      });

      document.getElementById("clearGrid").addEventListener("click", () => {
        blackoutMatrix(workingMatrix,0);
        updateGrid(workingMatrix);
        });
  

//workingMatrix.set(3,3,1);
//updateGrid(workingMatrix);
//console.log(workingMatrix.sumNeighbours(29,4));

//let newMatrix = conwayUpdateMatrix(workingMatrix);
//updateGrid(newMatrix);




  /*let paras = document.body.getElementsByTagName("td");
  for (let para of Array.from(paras)) {
    document.getElementById("tests").appendChild(
      document.createTextNode(" " + para.getAttribute("style")));
  }

  for (let para of Array.from(paras)) {
    para.setAttribute("style","background-color:white");
  }*/