// Ortak fallback component
function FallbackLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-500">Loading section...</p>
      </div>
    </div>
  );
} export default FallbackLoader;