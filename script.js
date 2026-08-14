// A. SIDEBAR FUNCTIONALITY
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (openBtn && sidebar && overlay) {
  openBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  });
}

function closeSidebar() {
  if (sidebar && overlay) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }
}

if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);
menuLinks.forEach(link => link.addEventListener('click', closeSidebar));

// B. ACCORDION FUNCTIONALITY
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion-content');

    if (accordionItem.classList.contains('active')) {
      accordionItem.classList.remove('active');
      accordionContent.style.maxHeight = null;
    } else {
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      });

      accordionItem.classList.add('active');
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    }
  });
});

// C. SEARCH BAR FUNCTIONALITY
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noResults = document.getElementById('noResults');

function performSearch() {
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  const accordionItems = document.querySelectorAll('.accordion-item');
  let visibleCount = 0;

  if (query === '') {
    accordionItems.forEach(item => {
      item.style.display = 'block';
      item.classList.remove('active');
      item.querySelector('.accordion-content').style.maxHeight = null;
    });
    if (noResults) noResults.style.display = 'none';
    return;
  }

  accordionItems.forEach(item => {
    const questionText = item.querySelector('.accordion-header').textContent.toLowerCase();
    const answerText = item.querySelector('.accordion-content').textContent.toLowerCase();

    if (questionText.includes(query) || answerText.includes(query)) {
      item.style.display = 'block';
      item.classList.add('active');
      const content = item.querySelector('.accordion-content');
      content.style.maxHeight = content.scrollHeight + "px";
      visibleCount++;
    } else {
      item.style.display = 'none';
      item.classList.remove('active');
    }
  });

  if (noResults) {
    noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
  }
  
  const qnaSection = document.getElementById('qna');
  if (qnaSection) {
    qnaSection.scrollIntoView({ behavior: 'smooth' });
  }
}

if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });
}
