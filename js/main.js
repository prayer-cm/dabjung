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
  const sliderContainer = document.querySelector('.image-slider-container');
  const slider = document.querySelector('.image-slider');
  const images = Array.from(slider.children); // 이미지 요소들을 배열로 변환

  let currentTranslateX = 0; // 현재 X축 이동 값
  const animationSpeed = 0.6; // 픽셀/프레임 (값을 줄이면 느려지고, 늘리면 빨라집니다)

  // 1. 이미지를 복제하여 슬라이더에 추가
  // 슬라이더 컨테이너 너비보다 충분히 많은 이미지가 있도록 복제
  // 최소 2배 이상 복제하여 끊김 없는 루프를 만듭니다.
  // 실제 슬라이더 너비를 계산하여 복제 횟수를 조절할 수도 있습니다.
  const initialSliderWidth = slider.scrollWidth; // 초기에 모든 이미지의 총 너비
  let cloneCount = 0;
  // 컨테이너 너비의 최소 2배 이상 되는 이미지를 확보하여 자연스러운 연결을 만듭니다.
  while (slider.scrollWidth < sliderContainer.offsetWidth * 2) {
    images.forEach(img => {
      const clonedImg = img.cloneNode(true);
      slider.appendChild(clonedImg);
    });
    cloneCount++;
    if (cloneCount > 10) break; // 무한 루프 방지용 (매우 큰 이미지라면)
  }

  // 2. 애니메이션 루프 함수 정의
  function animateSlider() {
    currentTranslateX -= animationSpeed; // 왼쪽으로 이동

    // 첫 번째 원본 이미지 그룹의 너비만큼 이동했는지 확인
    // 즉, 첫 번째 그룹이 완전히 화면 밖으로 나갔을 때 위치를 리셋하여 두 번째 그룹이 나타나게 함
    if (currentTranslateX <= -initialSliderWidth) {
      currentTranslateX += initialSliderWidth; // 첫 번째 그룹 너비만큼 다시 추가하여 위치 리셋
    }

    slider.style.transform = `translateX(${currentTranslateX}px)`;

    requestAnimationFrame(animateSlider); // 다음 프레임에서 애니메이션 반복
  }

  // 3. 애니메이션 시작
  animateSlider();

  // (선택 사항) 마우스 오버 시 일시 정지 기능 추가
  let animationPaused = false;
  sliderContainer.addEventListener('mouseenter', () => {
    animationPaused = true;
  });
  sliderContainer.addEventListener('mouseleave', () => {
    animationPaused = false;
    // 다시 시작할 때 부드럽게 이어지도록 약간의 딜레이 후 다시 애니메이션 요청
    // (선택 사항, 필요에 따라 제거 가능)
    // requestAnimationFrame(animateSlider);
  });

  // 애니메이션 루프를 마우스 오버 시 일시 정지하도록 수정 (더 나은 방법)
  let animationFrameId; // requestAnimationFrame ID 저장
  function startAnimation() {
    if (!animationPaused) {
      currentTranslateX -= animationSpeed;
      if (currentTranslateX <= -initialSliderWidth) {
        currentTranslateX += initialSliderWidth;
      }
      slider.style.transform = `translateX(${currentTranslateX}px)`;
    }
    animationFrameId = requestAnimationFrame(startAnimation);
  }

  // 초기 애니메이션 시작
  startAnimation();
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
  // 010-1234-5678 또는 01012345678 허용
  const phonePattern = /^01[0-9]-\d{3,4}-\d{4}$/;
  if (!phonePattern.test(phone)) {
    alert('연락처를 010-1234-5678 형식으로 입력해 주세요.');
    document.getElementById('phone').focus();
    return false; // 전송 중단
  }
  return true; // 전송 진행
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

  return false; // 폼 기본 제출 막기
}

// document.getElementById('myForm').addEventListener('submit', async function(event) {
//   event.preventDefault(); // 기본 폼 제출 동작 방지

//   const formData = new FormData(this);
//   const data = Object.fromEntries(formData.entries());
//   try {
//     validatePhoneNumber();
//     // Vercel/Netlify 서버리스 함수 엔드포인트로 데이터 전송
//     // 실제 배포된 서버리스 함수의 경로로 변경하세요.
//     const response = await fetch('https://script.google.com/macros/s/AKfycbwCh36JV-2sTGKaJkN1d2nboeoSpoRY9RGAcZ5by_wri7uXAgFAuyEqjFu6nog7giU/exec', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//     console.log('서버 응답:', response);
//     if (response.ok) {
//       alert('데이터가 성공적으로 전송되었습니다!');
//       this.reset(); // 폼 초기화
//     } else {
//       const errorData = await response.json();
//       alert('데이터 전송 실패: ' + (errorData.message || '알 수 없는 오류'));
//     }
//   } catch (error) {
//     console.error('전송 중 오류 발생:', error);
//     alert('데이터 전송 중 네트워크 오류가 발생했습니다.');
//   }
// });

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