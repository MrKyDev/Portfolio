// Tab switching
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active", "text-black"));
        button.classList.add("active", "text-black");

        tabContents.forEach(tab => {
          tab.classList.add("hidden");
          tab.classList.remove("opacity-100");
        });

        const activeTab = document.getElementById(`tab-${button.dataset.tab}`);
        activeTab.classList.remove("hidden");
        setTimeout(() => activeTab.classList.add("opacity-100"), 50);

        revealOnScroll(); // Trigger animations for new content
      });
    });

    // Scroll reveal effect
    function revealOnScroll() {
      const reveals = document.querySelectorAll(".reveal");
      const triggerBottom = window.innerHeight * 0.85;

      reveals.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

   function showTab(event, tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    event.currentTarget.classList.add('bg-blue-500', 'text-white');
  }

// Section for CV
function openCV() {
  document.getElementById('cvModal').style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Disable scroll
}

function closeCV() {
  document.getElementById('cvModal').style.display = 'none';
  document.body.style.overflow = ''; // Enable scroll
}

function downloadCV() {
  const img = document.getElementById("cvImage");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const imgObj = new Image();
  imgObj.crossOrigin = "anonymous";
  imgObj.src = img.src;

  imgObj.onload = function () {
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;

    ctx.drawImage(imgObj, 0, 0);

    // Add watermark
    const fontSize = canvas.width * 0.12;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "rgba(150, 150, 150, 0.68)";
    ctx.textAlign = "center";
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 6); // -30 degrees
    ctx.fillText("KYDEV PROPERTY", 0, 0);

    const link = document.createElement("a");
    link.download = "KyDev_CV.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}

// Custom logic for "Works" tab and featured project
document.addEventListener('DOMContentLoaded', function () {
  const worksBtn = document.getElementById('worksBtn');
  const featuredBanner = document.getElementById('featured-project-banner');
  const tabWorks = document.getElementById('tab-works');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabButtons = document.querySelectorAll('.tab-button');

  // Show featured banner only for Works tab
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(tb => tb.classList.remove('active'));
      btn.classList.add('active');
      tabContents.forEach(tc => tc.classList.add('hidden'));
      featuredBanner.classList.add('hidden');
      if (btn.getAttribute('data-tab') === 'works') {
        featuredBanner.classList.remove('hidden');
      } else {
        document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.remove('hidden');
      }
    });
  });

  // Carousel logic
  const carouselBtns = document.querySelectorAll('.carousel-btn');
  const carouselSections = document.querySelectorAll('.carousel-section');
  carouselBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const section = btn.getAttribute('data-carousel');
      carouselSections.forEach(sec => {
        if (sec.getAttribute('data-section') === section) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    });
  });

  // Show Website Projects by default
  if (featuredBanner) {
    const defaultSection = featuredBanner.querySelector('.carousel-section[data-section="website"]');
    if (defaultSection) defaultSection.classList.remove('hidden');
    carouselSections.forEach(sec => {
      if (sec.getAttribute('data-section') !== 'website') sec.classList.add('hidden');
    });
  }
});
