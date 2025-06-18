document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;

    const updateCount = () => {
      const increment = target / 40;
      current += increment;

      if (current < target) {
        counter.innerText = Math.ceil(current).toString().padStart(2, '0');
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toString().padStart(2, '0');
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        startCounter(counter);
        obs.unobserve(counter); 
      }
    });
  }, {
    threshold: 0.6 
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});