// Spinning Wheel Multiplier App JavaScript
class SpinningWheel {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinButton = document.getElementById('spin-btn');
        this.result = document.getElementById('result');
        this.sections = Array.from(this.wheel.querySelectorAll('.section')).map((el) => el.dataset.value);
        this.isSpinning = false;
        this.currentRotation = 0;

        this.init();
    }

    init() {
        this.spinButton.addEventListener('click', () => this.spin());
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isSpinning) {
                e.preventDefault();
                this.spin();
            }
        });
    }

    spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.spinButton.textContent = 'SPINNING...';
        this.result.textContent = 'Spinning...';
        this.result.className = 'result';

        // Determine random spin rotation and offset
        const spins = 5 + Math.random() * 3; // between 5 and 8 full spins
        const spinDegrees = spins * 360;
        const randOffset = Math.random() * 360; // random landing angle
        const finalRot = this.currentRotation + spinDegrees + randOffset;

        this.currentRotation = finalRot;

        // Apply transform
        this.wheel.style.transition = 'transform 3s ease-out';
        this.wheel.style.transform = `rotate(${finalRot}deg)`;

        // When animation ends, calculate result
        setTimeout(() => {
            this.calculateResult();
        }, 3000);
    }

    calculateResult() {
        const normalized = ((360 - (this.currentRotation % 360)) + 360) % 360;
        const segmentAngle = 360 / this.sections.length;
        const index = Math.floor(normalized / segmentAngle);
        this.handleSpinResult(index);
    }

    handleSpinResult(index) {
        const value = this.sections[index];
        this.result.textContent = `You got ${value}!`;

        // Style result
        this.result.classList.add('winner');
        if (value === '5x') {
            this.result.classList.add('winner');
        } else {
            this.result.classList.remove('winner');
        }

        // Reset button
        this.spinButton.disabled = false;
        this.spinButton.textContent = 'SPIN AGAIN';

        setTimeout(() => {
            if (!this.isSpinning) {
                this.spinButton.textContent = 'SPIN';
            }
        }, 2000);

        this.isSpinning = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SpinningWheel();
});