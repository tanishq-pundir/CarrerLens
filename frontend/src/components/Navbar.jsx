export default function Navbar({ setView }) {
  return (
    <nav className="bg-white/80 backdrop-blur shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span
          onClick={() => setView("home")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          CareerLens
        </span>

        <div className="space-x-6 text-gray-700">
          <button
            onClick={() => setView("home")}
            className="hover:text-indigo-600 transition"
          >
            Home
          </button>

          <button
            onClick={() => setView("uploads")}
            className="hover:text-indigo-600 transition"
          >
            Uploads
          </button>
        </div>
      </div>
    </nav>
  );
}
