// Set current year in footer and initialize page
document.addEventListener("DOMContentLoaded", function() {
    // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    
    // Highlight active nav link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
  
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
  
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Generate cards dynamically
    const cardsData = [
      {
        image: "Images/video-games-mental-health.png",
        alt: "Gaming addiction illustration",
        title: "Language Skills",
        desc: `One of the most significant concerns with video games is the potential for addiction. Teens who spend excessive hours gaming may experience withdrawal from reality, leading to neglect of responsibilities like schoolwork and relationships. "Excessive gaming can lead to negative outcomes like increased stress and decreased social interactions." Gaming addiction can also contribute to heightened stress, anxiety, and depression as teens withdraw further from social interactions and real-world obligations.`
      },
      {
        image: "Images/teen-boy-playing-video-game.jpg",
        alt: "Academic struggles due to gaming",
        title: "Behavioral Issues",
        desc: `Video games can significantly affect academic performance. Teens who invest long hours in gaming may find it difficult to focus on their studies. Sleep deprivation, a common result of late-night gaming, further exacerbates cognitive performance, making it harder for students to retain information and perform well in school. "The constant focus on gaming can interfere with academics, leading to lower grades and decreased motivation."`
      },
      {
        image: "Images/Podcast2.webp",
        alt: "Teen isolated with headphones",
        title: "Brain Volume",
        desc: `Although online multiplayer games can offer social connections, they often replace face-to-face interactions. This shift can lead to a decline in social skills and emotional intelligence. Teens who immerse themselves in virtual worlds may find it increasingly difficult to navigate real-world social situations, leading to feelings of loneliness and isolation. "Teenagers who spend significant time gaming may find it challenging to engage in meaningful social interactions outside of the gaming environment."`
      },
      {
        image: "Images/vidgameviolence-1.jpg",
        alt: "Video game aggression",
        title: "Mental Health Risks",
        desc: `A growing concern is the exposure to violent content in video games. Studies have shown that teens who regularly play violent video games may become desensitized to aggression and exhibit more hostile behaviors in real life. "Excessive exposure to violent video games may lead to an increase in aggressive behavior and desensitization to real-life violence." This exposure can alter a teen's perception of conflict resolution, leading to an increased likelihood of aggression in real-world situations.`
      },
      {
        image: "Images/bad-posture-kids.jpg",
        alt: "Teen playing games with bad posture",
        title: "Social Impact",
        desc: `Extended gaming sessions are often sedentary, which can contribute to physical health issues such as obesity, poor posture, and eye strain. The lack of physical activity can also lead to a decline in overall health and fitness, affecting mental clarity and emotional stability. "Sitting for long periods of time while gaming can lead to a decline in physical health, including poor posture, eye strain, and weight gain."`
      }
    ];
    
    const container = document.querySelector('.photo-cont');
    if (container) {
      cardsData.forEach(card => {
        const cardHTML = `
          <div class="card">
            <img src="${card.image}" alt="${card.alt}" loading="lazy">
            <div class="card-text">
              <p class="title">${card.title}</p>
              <hr>
              <span>MORE</span>
            </div>
            <div class="card-text-hover">
              <div class="card-text-hover-inner">
                <p class="title">${card.title}</p>
                <hr>
                <div class="scroll-desc">${card.desc}</div>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
      });
    }
});

// Preload the images for the carousel
const preloadImages = () => {
  const images = document.querySelectorAll('.carousel-item img');
  images.forEach(image => {
    const src = image.getAttribute('data-src');
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
};

// Call preloadImages when the page loads
window.onload = preloadImages;
// Example of using template literals
let backtick_string = `This string contains "double quotes" and 'single quotes'.`;

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  document.getElementById('scroll-progress').style.width = scrollPercent + '%';
});