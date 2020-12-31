const UP_ARROW = (
  <svg width="16" height="16" viewBox="0 0 12 12" className="mt-1 mr-1">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 7.5l-3-3-3 3"
    ></path>
  </svg>
);
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="px-2 md:px-6 py-6 sm:px-16 items-center">
          <div className="border-4 border-dashed border-gray-200 rounded-lg box-border h-80 w-80 md:h-96 md:w-96 "></div>
        </div>
      </div>
      {/* Toolbar start */}
      <div className="fixed bottom-0 bg-gray-900 text-white p-4">
        <div className="flex items-center">
          <div className="grid grid-flow-col auto-cols-max">
            <button className="grid grid-flow-col" title="Add Background">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              {UP_ARROW}
            </button>
            <button className="grid grid-flow-col" title="Add Text">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
              {UP_ARROW}
            </button>
            <button className="grid grid-flow-col" title="Add Shape">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
              {UP_ARROW}
            </button>
            <button title="Download">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 mr-1"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Toolbar end */}
    </div>
  );
}

export default App;
