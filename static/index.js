// Spinning Wheel Multiplier App JavaScript
class SpinningWheel {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinButton = document.getElementById('spin-btn');
        this.spinCount = document.getElementById('spin-count');
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
        // Increment spin count
        const currentCount = parseInt(this.spinCount.textContent, 10) || 0;
        // Animate the number ticking up
        this.spinCount.classList.add('ticking-up');
        this.spinCount.textContent = currentCount + 1;
        setTimeout(() => {
            this.spinCount.classList.remove('ticking-up');
        }, 500); // Remove class after animation duration
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

        if (value === 'RESPIN') {
            this.result.textContent = 'RESPIN! Spin again for a chance to win!';
            this.result.classList.add('respin');
            const currentCount = parseInt(this.spinCount.textContent, 10) || 0;
            this.spinCount.classList.add('ticking-down');
            this.spinCount.textContent = currentCount - 1; // Decrement spin count
            setTimeout(() => {
                this.spinCount.classList.remove('ticking-down');
            }, 500); // Remove class after animation duration
        } else {
            this.result.classList.remove('respin');
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