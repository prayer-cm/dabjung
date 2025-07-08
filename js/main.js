// Smooth scrolling for navigation links
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });
    });

  // Add scroll animation for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all feature cards
  document
    .querySelectorAll('.feature-card, .platform-item, .stat-item')
    .forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });

  // Header background change on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
      header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  });

  // Button click animations
  document
    .querySelectorAll('button')
    .forEach(button => {
      button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

  // Add ripple effect CSS
  const style = document.createElement('style');
  style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document
    .head
    .appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.image-slider');
  const slider_second = document.querySelector('.image-slider-second');

  let currentTranslateX = 0;
  let currentTranslateX2 = 0;
  const animationSpeed = 4;

  // 각 슬라이더의 전체 길이의 절반(이미 HTML에서 반복된 이미지 기준)
  const sliderWidth = slider.scrollWidth / 2;
  const sliderSecondWidth = slider_second.scrollWidth / 2;

  currentTranslateX2 = sliderSecondWidth;
  function animateSlider() {
    // 왼쪽으로 흐름
    currentTranslateX -= animationSpeed;
    if (currentTranslateX <= -sliderWidth) {
      currentTranslateX += sliderWidth;
    }
    slider.style.transform = `translateX(${currentTranslateX}px)`;

    // 오른쪽으로 흐름
    currentTranslateX2 += animationSpeed;
    if (currentTranslateX2 >= sliderSecondWidth) {
      currentTranslateX2 -= sliderSecondWidth;
    }
    slider_second.style.transform = `translateX(${currentTranslateX2}px)`;

    requestAnimationFrame(animateSlider);
  }

  animateSlider();
});

//function to format phone number input
function formatPhoneNumber(input) {
  // 숫자만 남기기
  let value = input.value.replace(/\D/g, '');

  // 010-0000-0000 형식으로 변환
  if (value.length < 4) {
    input.value = value;
  } else if (value.length < 8) {
    input.value = value.slice(0, 3) + '-' + value.slice(3);
  } else if (value.length <= 11) {
    input.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
  } else {
    input.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
  }
}

function validatePhoneNumber() {
  const phone = document.getElementById('phone').value.trim();

  const phonePattern = /^01[0-9]-\d{3,4}-\d{4}$/;
  if (!phonePattern.test(phone)) {
    alert('연락처를 010-1234-5678 형식으로 입력해 주세요.');
    document.getElementById('phone').focus();
    return false;
  }
  return true;
}

function submitContactForm(event) {
  event.preventDefault();
  if (!validatePhoneNumber()) return false;

  const form = event.target;
  const url = "https://script.google.com/macros/s/AKfycbwCh36JV-2sTGKaJkN1d2nboeoSpoRY9RGAcZ5by_wri7uXAgFAuyEqjFu6nog7giU/exec";
  const formData = new FormData(form);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        alert("성공적으로 접수가 완료되었습니다.");
        form.reset();
      } else if(data.result === "fail") {
        alert("이미 접수된 연락처입니다. 다른 연락처로 시도해 주세요.");
      }
      else {
        alert("문의하기 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    })
    .catch(() => {
      alert("문의하기 오류가 발생했습니다. 다시 시도해 주세요.");
    });

  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  ['go-contact-btn-header', 'go-contact-btn-hero'].forEach(function(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});