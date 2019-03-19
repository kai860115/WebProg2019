let cvsWrapper = null;
let bgImg;
let baseImg;
let startImg;
let gameoverImg;
let pipeImg;
let pipeGen;
let numberImg = [];
let birdImg;
let width;
let height;
let scale;
let vx = -2.5;
let bird;
let bg;
let bs;
let pipes = [];
let firstUnpassedPipe;
let state = 0;
let score;
let sound = {};
let bgType = 0;
let pipeType = 0;


// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
function Bird() {
    this.color = Math.floor(Math.random() * 3);
    this.flap = 0;
    this.width = width / bgImg[bgType].width * birdImg[this.color][this.flap].width;
    this.height = height / bgImg[bgType].height * birdImg[this.color][this.flap].height;
    this.x = width / 2 - this.width / 2;
    this.y = (height + baseImg.height * width / baseImg.width) / 2;
    this.vy = 0;
    this.ay = 0;
    this.angular = 0;
    this.angularV = 0;
    this.reset = () => {
        this.x = width / 2 - this.width / 2;
        this.y = (height + baseImg.height * width / baseImg.width) / 2;
        this.vy = 0;
        this.ay = 0;
        this.angular = 0;
        this.angularV = 0;
    }
    this.jump = () => {
        this.angular = -30 / 180 * Math.PI;
        this.vy = -13;
        sound.wing.play();
    }
    this.draw = () => {
        translate(this.x + this.width / 2, this.y + this.height / 2);
        rotate(this.angular);
        image(birdImg[this.color][this.flap], -this.width / 2, -this.height / 2, this.width, this.height);
        rotate(-this.angular);
        translate(-this.x - this.width / 2, -this.y - this.height / 2);
    }
    this.changeFlap = setInterval(() => {
        this.flap += 1;
        this.flap %= 3;
    }, 100);
    this.update = () => {
        if (this.angular < 75 / 180 * Math.PI / 2)
            this.angular += this.angularV;
        this.vy += this.ay;
        this.y = constrain(this.y + this.vy, 0, height - baseImg.height * width / baseImg.width - this.height);
    }
}

function Score() {
    this.score = 0;
    this.width = numberImg[0].width * 1.5;
    this.height = numberImg[0].height * 1.5;
    this.y = 100;
    this.space = 0;
    this.draw = () => {
        let scoreArr = numberToArray(this.score);
        let x = width / 2 - scoreArr.length * this.width / 2 - (scoreArr.length - 1) * this.space / 2;
        for (let i = 0; i < scoreArr.length; i++) {
            image(numberImg[scoreArr[i]], x + (this.width + this.space) * i, this.y, this.width, this.height);
        }
    }
    this.update = () => {
        if (firstUnpassedPipe) {
            if (firstUnpassedPipe.x + firstUnpassedPipe.width < bird.x) {
                firstUnpassedPipe.passed = true;
                this.score += 1;
                sound.point.play();
            }
        }
    }
    this.reset = () => {
        this.score = 0;
        this.y = 100;
    }
}

function Pipe() {
    this.width = scale * pipeImg[pipeType].upper.width;
    this.height = scale * pipeImg[pipeType].upper.height;
    this.slitHeight = 200;
    this.passed = false;
    this.active = true;
    this.bound = 90;
    this.x = width;
    this.y = Math.random() * (height - baseImg.height * width / baseImg.width - this.slitHeight - this.bound * 2) + this.bound;
    this.draw = () => {
        image(pipeImg[pipeType].upper, this.x, this.y - this.height, this.width, this.height);
        image(pipeImg[pipeType].lower, this.x, this.y + this.slitHeight, this.width, this.height);
    }
    this.update = () => {
        this.x += vx;
        if (this.x + this.width <= 0) {
            this.active = false;
        }
    }
}

function Background(x) {
    this.x = x;
    this.y = 0;

    this.draw = () => {
        image(bgImg[bgType], this.x, this.y, width, height);
    }
    this.update = () => {
        this.x += vx;
        if (this.x + width <= 0) {
            this.x += (width - 10) * 3;
        }
    }
}

function Base(x) {
    this.x = x;
    this.y = 0;

    this.draw = () => {
        image(baseImg, this.x, this.y + height - baseImg.height * width / baseImg.width, width, baseImg.height * width / baseImg.width);
    }
    this.update = () => {
        this.x += vx;
        if (this.x + width <= 0) {
            this.x += width * 2;
        }
    }

}

function preload() {
    bgImg = ["day", "night"].map(e => loadImage(`assets/sprites/background-${e}.png`))
    baseImg = loadImage("assets/sprites/base.png");
    startImg = loadImage("assets/sprites/message.png");
    gameoverImg = loadImage("assets/sprites/gameover.png");
    pipeImg = ["green", "red"].map(color => {
        return {
            upper: loadImage(`assets/sprites/pipe-${color}-upper.png`),
            lower: loadImage(`assets/sprites/pipe-${color}-lower.png`)
        }
    })
    birdImg = ["blue", "red", "yellow"].map(
        color => ["upflap", "midflap", "downflap"].map(
            flap => loadImage(`assets/sprites/${color}bird-${flap}.png`)
        )
    );
    for (let i = 0; i <= 9; i++) {
        numberImg.push(loadImage(`assets/sprites/${i}.png`));
    }
    sound.hit = loadSound("assets/audio/hit.wav");
    sound.die = loadSound("assets/audio/die.wav");
    sound.point = loadSound("assets/audio/point.wav");
    sound.wing = loadSound("assets/audio/wing.wav");
    sound.swoosh = loadSound("assets/audio/swoosh.wav");
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");

    // setup code below
    width = cvsWrapper.offsetWidth;
    height = cvsWrapper.offsetHeight;
    bird = new Bird();
    score = new Score();
    bgType = Math.floor(Math.random() * 2);
    pipeType = Math.floor(Math.random() * 2);
    bg = [new Background(0), new Background(width - 10), new Background(2 * (width - 10))];
    bs = [new Base(0), new Base(width)];
    scale = width / bgImg[bgType].width;
}

function draw() {
    // Render function (called per frame.)
    background(0);
    bg.forEach(element => {
        element.draw();
        element.update();
    });
    pipes = pipes.filter(p => p.active);
    pipes.forEach(p => {
        p.draw();
        p.update();
    })
    bird.update();
    bird.draw();
    bs.forEach(element => {
        element.draw();
        element.update();
    });
    if (state == 0) {
        image(startImg, width / 2 - scale * startImg.width / 2, height / 2 - scale * startImg.height / 2, scale * startImg.width, scale * startImg.height);
    } else if (state == 2) {
        image(gameoverImg, width / 2 - scale * gameoverImg.width / 2, height / 2 - scale * gameoverImg.height / 2 - 100, scale * gameoverImg.width, scale * gameoverImg.height);
        score.y = height / 2;
        score.draw();
    } else {
        if (checkcollision()) {
            sound.hit.play();
            end();
            sound.die.play();
        }
        score.update();
        score.draw();
    }
    
}

function mouseClicked() {
    if (state === 0) {
        bird.jump();
        start();
    } else if (state === 1) {
        bird.jump();
    } else {
        restart();
    }

}

function keyPressed() {
    if (keyCode == 32) {
        if (state === 0) {
            bird.jump();
            start();
        } else if (state === 1) {
            bird.jump();
        } else {
            restart();
        }
    }
}

function checkcollision() {
    firstUnpassedPipe = pipes.filter(p => !p.passed)[0];
    if (bird.y >= height - baseImg.height * width / baseImg.width - bird.height || bird.y <= 0) {
        return true;
    }
    if (firstUnpassedPipe) {
        if (bird.x + bird.width >= firstUnpassedPipe.x && bird.x <= firstUnpassedPipe.x + firstUnpassedPipe.width &&
            (bird.y <= firstUnpassedPipe.y || bird.y + bird.height >= firstUnpassedPipe.y + firstUnpassedPipe.slitHeight)) {
            return true;
        }
    }
    return false;
}

function restart() {
    state = 0;
    vx = -2.5;
    bgType = Math.floor(Math.random() * 2);
    pipeType = Math.floor(Math.random() * 2);
    bird = new Bird();
    bg = [new Background(0), new Background(width - 10), new Background(2 * (width - 10))];
    bs = [new Base(0), new Base(width)];
    while (pipes.length > 0) {
        pipes.pop();
    }
}

function start() {
    score.reset();
    state = 1;
    bird.ay = 1;
    bird.angularV = 0.05;
    pipeGen = setInterval(() => {
        pipes.push(new Pipe());
    }, 2000);
}

function end() {
    state = 2;
    vx = 0;
    clearInterval(pipeGen);
    clearInterval(bird.changeFlap);
}

function numberToArray(number) {
    return number.toString().split('').map(Number);
}
