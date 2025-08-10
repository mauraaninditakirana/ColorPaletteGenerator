const colorBoxes = document.querySelectorAll('.color-box');
const generateBtn = document.getElementById('generate-btn');

/**
 * @returns {string} Sebuah string kode warna, contoh: '#1A2B3C'
 */
function generateRandomHex() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

/**
 * @param {string} hex 
 * @returns {boolean} 
 */
function isColorDark(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

function generatePalette() {
    colorBoxes.forEach((box, index) => {
        setTimeout(() => {
            const newColor = generateRandomHex();
            const colorPreview = box.querySelector('.color-preview');
            const colorCode = box.querySelector('.color-code');
            
            colorPreview.style.backgroundColor = newColor;
            box.style.background = `linear-gradient(135deg, ${newColor}dd, ${newColor})`;
            
            const textColor = isColorDark(newColor) ? '#ffffff' : '#000000';
            box.style.color = textColor;
            
            colorCode.textContent = newColor.toUpperCase();
            
            box.style.transform = 'scale(0.8) rotateY(180deg)';
            setTimeout(() => {
                box.style.transform = 'scale(1) rotateY(0deg)';
            }, 100);
        }, index * 100);
    });
}

/**
 * @param {HTMLElement} element 
 */
function copyToClipboard(element) {
    const colorCode = element.querySelector('.color-code').textContent;
    const copyHint = element.querySelector('.copy-hint');

    navigator.clipboard.writeText(colorCode).then(() => {
        const originalText = copyHint.textContent;
        copyHint.textContent = 'Copied! ✓';
        copyHint.style.color = '#4ade80';
        element.classList.add('copied');
        
        setTimeout(() => {
            copyHint.textContent = originalText;
            copyHint.style.color = '';
            element.classList.remove('copied');
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generatePalette();
    createParticles();
});

generateBtn.addEventListener('click', generatePalette);

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' && event.target.tagName !== 'BUTTON') {
        event.preventDefault();
        generatePalette();
    }
});

colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        copyToClipboard(box);
    });
});