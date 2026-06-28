/**
 * Generates placeholder SVG images when real photos are not yet added.
 * Replace assets with your own JPG/PNG files using the same paths in data.js and index.html.
 */
const Placeholders = (() => {
  function svg(label, w, h) {
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFD6E8"/><stop offset="100%" stop-color="#DCC6FF"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Poppins,sans-serif" font-size="${Math.max(16, Math.min(w, h) / 8)}" fill="#9B7BB8">${label}</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svgMarkup);
  }

  function bind(img) {
    if (img.dataset.placeholderBound) return;
    img.dataset.placeholderBound = '1';
    img.addEventListener('error', function onErr() {
      this.removeEventListener('error', onErr);
      const label = this.alt || 'Photo';
      const w = parseInt(this.getAttribute('width'), 10) || 600;
      const h = parseInt(this.getAttribute('height'), 10) || 400;
      this.src = svg(label, w, h);
    }, { once: true });
  }

  function init(root = document) {
    root.querySelectorAll('img').forEach(bind);
  }

  return { init, bind };
})();

window.Placeholders = Placeholders;
document.addEventListener('DOMContentLoaded', () => Placeholders.init());
