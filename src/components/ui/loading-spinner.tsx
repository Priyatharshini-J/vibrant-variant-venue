const LoadingSpinner = () => {
  const brandColor = "hsl(222, 63.90%, 28.20%)"; // This is a deep blue

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-10 w-10"
          style={{ color: brandColor }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p
          className="text-xl font-semibold animate-pulse"
          style={{ color: brandColor }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
