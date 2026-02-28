export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">
        Smart City Monitoring Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-gray-300">
            🚦 Traffic Status
          </h2>
          <p className="text-green-400 mt-4 text-2xl font-bold">
            Smooth Flow
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-gray-300">
            🌫 Air Quality Index
          </h2>
          <p className="text-yellow-400 mt-4 text-2xl font-bold">
            AQI 82 (Moderate)
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-gray-300">
            🌡 Temperature
          </h2>
          <p className="text-blue-400 mt-4 text-2xl font-bold">
            28°C
          </p>
        </div>
      </div>
    </div>
  );
}
