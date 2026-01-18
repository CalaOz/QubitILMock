console.log("Qubit Replica Loaded");

// Sticky Header Logic
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '5px 0'; // Compact on scroll
    } else {
        header.classList.remove('scrolled');
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.padding = '';
    }
});

// Slider Logic (Simple Implementation)
const setupSlider = (id) => {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;

    const prevBtn = document.getElementById('events-prev');
    const nextBtn = document.getElementById('events-next');

    // Check if slider fits container
    // For simplicity, just horizontal scroll logic

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -320, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // Enable basic drag
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        wrapper.scrollLeft = scrollLeft - walk;
    });
};

setupSlider('events-slider');

// Form Logic
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting Qubit! We will get back to you shortly.');
        form.reset();
    });
}


// Course Modal Logic
// Course Modal Logic
function initModal() {
    const modal = document.getElementById('course-modal');
    if (!modal) {
        console.error("Modal element not found!");
        return;
    }

    console.log("Initializing Modal Logic");

    const closeBtn = document.getElementById('close-modal');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    console.log(`Found ${readMoreBtns.length} Read More buttons`);

    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalAudience = document.getElementById('modal-audience');
    const modalOverview = document.getElementById('modal-overview');
    const modalGain = document.getElementById('modal-gain');

    // Open Modal
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior if any
            console.log("Read More clicked");
            const card = this.closest('.course-card');

            if (!card) {
                console.error("Parent card not found");
                return;
            }

            // Populate Modal
            modalTitle.textContent = card.dataset.title;
            modalTag.textContent = card.dataset.category;
            modalAudience.textContent = card.dataset.audience;
            modalOverview.textContent = card.dataset.overview;
            modalGain.textContent = card.dataset.gain;

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event Listeners for Closing
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Run immediately if DOM is ready, or wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
} else {
    initModal();
}
