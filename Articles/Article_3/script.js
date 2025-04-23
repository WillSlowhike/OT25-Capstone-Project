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
        image: "The-Communication-Skills-Affected-by-Online-Video-Games.png",
        alt: "Communication skills affected by online video games",
        title: "Language Skills",
        desc: `Research has shown that excessive screen time can reduce reading time, which in turn negatively affects language skills. As screen time increases, time for activities like reading decreases, impacting the development of vocabulary and comprehension. In younger users, this can delay language acquisition and reduce the richness of verbal expression. "Spending less time on books and conversations in favor of screens can hinder the growth of strong communication skills."`      },
      {
        image: "game-addict-laying-on-the-floor.webp",
        alt: "Academic struggles due to gaming",
        title: "Behavioral Issues",
        desc: `Teens who spend excessive time on screens are more likely to display behavioral challenges, including impulsivity, irritability, and attention problems. This can be attributed to overstimulation and a lack of real-world interaction, which are crucial for developing emotional intelligence and social behavior. "Extended screen exposure can make it harder for teens to regulate their emotions and behavior in real-life situations."`      },
      {
        image: "id5821306-3-2-0306.jpg",
        alt: "Brain Effect Infographic",
        title: "Brain Volume",
        desc: `Studies suggest that excessive screen time may reduce brain volume, particularly in areas responsible for memory, learning, and attention. These structural changes can interfere with critical thinking and emotional regulation, especially during adolescence when the brain is still developing. "Excessive exposure to screens during formative years can hinder healthy brain growth and impact cognitive abilities long-term."`      },
      {
        image: "63c13731bb7865.98261060.jpg",
        alt: "Video game aggression",
        title: "Mental Health Risks",
        desc: `Prolonged screen use is linked to mental health challenges, including increased depression and anxiety. The overuse of screens often displaces other activities like physical exercise or sleep, both of which are essential for mental well-being. It can also isolate individuals from support systems, making it harder to cope with stress and emotional difficulties. "Excessive screen time can significantly affect mood, self-esteem, and stress levels, particularly in teens navigating emotional development."`      },
      {
        image: "social-effects-of-gaming.jpg",
        alt: "Teen playing games with bad posture",
        title: "Social Impact",
        desc: `Excessive screen time can reduce opportunities for in-person interactions, leading to feelings of loneliness and difficulties in forming relationships. Over time, this may result in a lack of social confidence and difficulty understanding nonverbal cues or emotional expressions. "Teens who spend less time socially engaging in person may struggle to connect with peers or navigate social dynamics effectively."`      },
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