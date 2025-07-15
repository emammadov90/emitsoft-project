function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || '';
  const duration = 2000;
  const stepTime = 20;
  const steps = Math.ceil(duration / stepTime);
  const increment = target / steps;
  let current = 0;
  const isFloat = target % 1 !== 0;

  const updateCounter = () => {
    current += increment;
    if (current >= target) {
      counter.innerText = target + suffix;
    } else {
      counter.innerText = (isFloat ? current.toFixed(1) : Math.ceil(current)) + suffix;
      setTimeout(updateCounter, stepTime);
    }
  };

  updateCounter();
}

// Use IntersectionObserver to trigger animation when visible
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
});
