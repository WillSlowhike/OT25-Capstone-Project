document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-copy functionality for DOIs
    document.querySelectorAll('.doi-badge').forEach(badge => {
      badge.addEventListener('click', function() {
        const doi = this.textContent.replace('DOI: ', '');
        navigator.clipboard.writeText(doi);
        
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.backgroundColor = '#28a745';
        this.style.color = 'white';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.backgroundColor = '#e9ecef';
          this.style.color = '#495057';
        }, 2000);
      });
    });
  
    // Filter functionality (optional)
    const filterInput = document.createElement('input');
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('placeholder', 'Search sources...');
    filterInput.className = 'form-control mb-4';
    document.querySelector('.container').prepend(filterInput);
  
    filterInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll('.source-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
      });
    });
  });