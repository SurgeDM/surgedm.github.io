const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const benchmarks = document.getElementById('benchmarks');
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    benchmarks.classList.add('animate-bars');
    observer.disconnect();
  }, { threshold: 0.25 });
  observer.observe(benchmarks);
}

const copyStatus = document.getElementById('copy-status');

document.querySelectorAll('.copy-btn').forEach(button => {
  const command = button.previousElementSibling;
  const icon = button.querySelector('.material-symbols-outlined');
  let resetFeedback;

  button.addEventListener('click', async () => {
    clearTimeout(resetFeedback);
    try {
      await navigator.clipboard.writeText(command.textContent.trim());
      copyStatus.textContent = 'Command copied.';
      button.classList.add('copied');
      icon.textContent = 'check';
    } catch {
      button.classList.remove('copied');
      const range = document.createRange();
      range.selectNodeContents(command);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Command selected. Use your keyboard shortcut to copy it.';
      icon.textContent = 'error';
    }
    resetFeedback = setTimeout(() => {
      button.classList.remove('copied');
      icon.textContent = 'content_copy';
      copyStatus.textContent = '';
    }, 2500);
  });
});

function setUpRotation({ region, buttons, toggle, label, show, canRotate = () => true }) {
  let index = 0;
  let playing = !reducedMotion.matches;
  let visible = !('IntersectionObserver' in window);
  let timer;

  function select(next) {
    index = next;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    show(index);
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    const action = playing ? 'Pause' : 'Play';
    toggle.textContent = action;
    toggle.setAttribute('aria-label', `${action} ${label} rotation`);
    if (!playing || !visible || document.hidden || !canRotate() || region.matches(':hover, :focus-within')) return;
    timer = setTimeout(() => select((index + 1) % buttons.length), 12000);
  }

  buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
  toggle.addEventListener('click', () => {
    playing = !playing;
    schedule();
  });
  for (const event of ['pointerenter', 'pointerleave', 'focusin', 'focusout']) {
    region.addEventListener(event, () => setTimeout(schedule, 0));
  }
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => {
    playing = !event.matches;
    schedule();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.25;
      schedule();
    }, { threshold: 0.25 }).observe(region);
  }
  schedule();

  return schedule;
}

const features = document.getElementById('features');
const panels = [...features.querySelectorAll('[data-feature-panel]')];
setUpRotation({
  region: features,
  buttons: [...features.querySelectorAll('[aria-pressed]')],
  toggle: document.getElementById('feature-rotation'),
  label: 'feature',
  show(index) {
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
  },
});

const preview = document.querySelector('.carousel-container');
const slides = [...preview.querySelectorAll('.carousel-slide')];
const viewport = preview.querySelector('.carousel-viewport');
const title = document.getElementById('preview-title');
const description = document.getElementById('preview-description');
const dialog = document.getElementById('media-lightbox');
const image = document.getElementById('media-lightbox-image');
const video = document.getElementById('media-lightbox-video');
let activeSlide = slides[0];

const schedulePreview = setUpRotation({
  region: preview,
  buttons: [...preview.querySelectorAll('[aria-pressed]')],
  toggle: document.getElementById('preview-toggle'),
  label: 'preview',
  canRotate: () => !dialog.open,
  show(index) {
    activeSlide = slides[index];
    title.textContent = activeSlide.dataset.title;
    description.textContent = activeSlide.dataset.description;
    slides.forEach(slide => { slide.hidden = slide !== activeSlide; });
  },
});

viewport.addEventListener('click', () => {
  const isVideo = Boolean(activeSlide.dataset.video);
  image.hidden = isVideo;
  video.hidden = !isVideo;
  if (isVideo) {
    video.src = activeSlide.dataset.video;
  } else {
    image.src = activeSlide.src;
    image.alt = activeSlide.alt;
  }
  dialog.showModal();
  schedulePreview();
});

document.getElementById('media-lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  video.pause();
  video.removeAttribute('src');
  video.load();
  image.removeAttribute('src');
  viewport.focus();
  schedulePreview();
});
