export default function Button({ label, action }) {
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = label; 
    button.onclick = () => {
      window.location.href = action;
    };
    return button;
  }
  