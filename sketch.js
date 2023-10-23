var song;
var fft;
var particles = [];

function preload() {
    inputbtn = createFileInput((file) => {
        song = loadSound(file);
        document.getElementsByTagName("input")[0].setAttribute("type", "hidden");
        alert("Click on the screen to play or pause");
    });
    var inputELE = document.getElementsByTagName("input")[0];
    inputbtn.position(windowWidth / 2 - 120, 15);
    inputELE.style.backgroundColor = '#fe00e8';
    inputELE.style.height = '42px';
    inputELE.style.padding = '10px';
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    fft = new p5.FFT(0.9, 256);

    for (let i = 0; i < fft.waveform().length; i++) {
        particles.push(new Particle());
    }

    noLoop();
}

function draw() {
    background(0);

    let spectrum = fft.analyze();

    for (let particle of particles) {
        particle.update(spectrum);
        particle.display();
    }
}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause();
        noLoop();
    } else {
        song.play();
        loop();
    }
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(10, 30);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
    }

    update(spectrum) {
        this.size = map(spectrum[int(random(spectrum.length))], 0, 255, 10, 100);
        this.x += this.speedX * this.size * 0.05;
        this.y += this.speedY * this.size * 0.05;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    display() {
        noStroke();
        fill(random(150, 255), 255, 255, 100);
        ellipse(this.x, this.y, this.size);
    }
}



