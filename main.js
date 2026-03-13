document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Learn More Expandable Sections
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.icon');
      
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.classList.remove('open');
        if(icon) icon.textContent = '+';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.add('open');
        if(icon) icon.textContent = '−';
      }
    });
  });

  // Accordions for Recovery Phases
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.icon');
      
      // Close other open accordions optionally (if desired to keep only one open)
      // Removed to allow multiple phases open at once for easy reading
      
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.classList.remove('open');
        if(icon) icon.textContent = '▼';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.add('open');
        if(icon) icon.textContent = '▲';
      }
    });
  });

  // Self-Monitoring Tracker Logic (if present on the page)
  const painInput = document.getElementById('pain-level');
  const swellingInput = document.getElementById('swelling-level');
  const confidenceInput = document.getElementById('confidence-level');
  const trackerFeedback = document.getElementById('tracker-feedback');

  if (painInput && trackerFeedback) {
    function updateFeedback() {
      const pain = parseInt(painInput.value);
      const swelling = parseInt(swellingInput.value);
      const confidence = parseInt(confidenceInput.value);

      let message = "";
      let color = "var(--text-main)";

      if (pain >= 7 || swelling >= 4) {
        message = "⚠️ Your pain or swelling is currently high. This is a sign to slow down. Focus on resting, elevating the ankle, and gentle, pain-free movements. Do not push through sharp pain.";
        color = "var(--accent)";
      } else if (pain >= 4 || swelling == 3) {
        message = "⚖️ You're experiencing moderate discomfort. Mild discomfort is normal during healing, but monitor how you feel tomorrow. Keep your exercises gentle and don't do too much at once.";
        color = "var(--primary)";
      } else {
        if (confidence >= 4) {
          message = "✅ You seem to be doing well! Little pain and good confidence means you're likely ready to gently progress your current exercises. Keep up the good work.";
          color = "var(--primary-light)";
        } else {
          message = "🪴 Your physical symptoms are low, but it's completely normal to feel a lack of confidence. Take things slowly and let your ankle rebuild trust through small, safe movements.";
        }
      }

      trackerFeedback.innerHTML = message;
      trackerFeedback.style.color = color;
      trackerFeedback.style.fontWeight = "600";
    }

    painInput.addEventListener('input', () => {
      document.getElementById('pain-val').textContent = painInput.value;
      updateFeedback();
    });
    swellingInput.addEventListener('input', () => {
      const vals = ["None", "Mild", "Moderate", "Noticeable", "High"];
      document.getElementById('swelling-val').textContent = vals[swellingInput.value - 1];
      updateFeedback();
    });
    confidenceInput.addEventListener('input', () => {
      document.getElementById('confidence-val').textContent = confidenceInput.value;
      updateFeedback();
    });
    
    // Init state
    updateFeedback();
  }
});
