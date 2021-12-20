const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 25;

const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = MOVE_AMOUNT;


let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x ,y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y)
  switch (key) {
    case 'ArrowUp' :
        y -= MOVE_AMOUNT
        break;
    case 'ArrowRight' :
        x += MOVE_AMOUNT
        break;
    case 'ArrowDown' :
        y += MOVE_AMOUNT
        break;
    case 'ArrowLeft' :
        x -= MOVE_AMOUNT
        break;
        default: 
        break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(e){
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key : e.key });
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height)
  canvas.addEventListener(
    'animationend', 
    function(){
      console.log('done the shake!')
      canvas.classList.remove('shake');
  },
  { once: true }
  );
}

window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);