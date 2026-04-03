import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const celebrateBtn = document.getElementById('celebrate-btn');
  
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      confetti();
    });
  }
});