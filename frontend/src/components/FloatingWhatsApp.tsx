export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/916294577453"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{ backgroundColor: '#25D366' }}
    >
      {/* Official WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="32"
        height="32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4z"
          fill="#ffffff"
        />
        <path
          d="M24 6.4C14.3 6.4 6.4 14.3 6.4 24c0 3.4 1 6.6 2.6 9.3L6.4 41.6l8.5-2.6c2.6 1.5 5.7 2.4 9.1 2.4 9.7 0 17.6-7.9 17.6-17.6S33.7 6.4 24 6.4z"
          fill="#25D366"
        />
        <path
          d="M33.5 28.4c-.5-.2-2.9-1.4-3.3-1.6-.4-.2-.7-.2-1 .2-.3.4-1.2 1.6-1.5 1.9-.3.3-.5.4-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-1 .2-.2.5-.5.7-.8.2-.3.3-.5.4-.8.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.4-3.3-.4-.9-.8-.7-1-.7h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.7 4.4 1.9 4.7c.2.3 3.3 5 8 7 1.1.5 2 .8 2.7 1 1.1.3 2.2.3 3 .2.9-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.1-.2-.4-.3-.9-.5z"
          fill="#ffffff"
        />
      </svg>
    </a>
  );
}
