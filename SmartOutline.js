export const SmartOutline = {
  SETTINGS: {
    domId: 'SmartOutline',
    hideFocusCSS:
      '*:focus {outline:0 !important;}::-moz-focus-inner{border:0;}',
    keycodes: [
      { name: 'tab', code: 9 },
      { name: 'space', code: 32 },
      { name: 'esc', code: 27 },
      { name: 'left', code: 37 },
      { name: 'up', code: 38 },
      { name: 'right', code: 39 },
      { name: 'down', code: 40 },
    ],
  },
  init: () => {
    // Bind mouse detection
    window.addEventListener('mousemove', SmartOutline.mouseListener);

    // Build <style> tag in HEAD
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.id = SmartOutline.SETTINGS.domId;
    style.type = 'text/css';

    // Maybe there's no head
    if (!head) return false;

    return head.appendChild(style);
  },
  mouseListener: () => {
    if (document.body !== document.activeElement) return;

    SmartOutline.setCSS(SmartOutline.SETTINGS.hideFocusCSS);
    const html = document.querySelector('html');
    html.classList.remove('outline-enabled');
    html.classList.add('outline-disabled');
    window.removeEventListener('mousemove', SmartOutline.mouseListener, false);
    window.addEventListener('keydown', SmartOutline.keyboardListener);
  },
  keyboardListener: evt => {
    // only remove the outline if the user is using one of the keyboard
    // navigation keys
    if (!SmartOutline.SETTINGS.keycodes.find(obj => obj.code === evt.keyCode)) {
      return;
    }

    SmartOutline.setCSS('');
    const html = document.querySelector('html');
    html.classList.remove('outline-disabled');
    html.classList.add('outline-enabled');
    window.removeEventListener('keydown', SmartOutline.keyboardListener, false);
    window.addEventListener('mousemove', SmartOutline.mouseListener);
  },
  getStyleEl() {
    return document.getElementById(SmartOutline.SETTINGS.domId);
  },
  setCSS(css) {
    SmartOutline.getStyleEl().innerHTML = css;
  },
  destroy() {
    const el = SmartOutline.getStyleEl();
    if (el) {
      const head = document.head || document.getElementsByTagName('head')[0];
      head.removeChild(el);

      window.removeEventListener(
        'keydown',
        SmartOutline.keyboardListener,
        false
      );
      window.removeEventListener(
        'mousemove',
        SmartOutline.mouseListener,
        false
      );
    }
  },
};

export default SmartOutline;
