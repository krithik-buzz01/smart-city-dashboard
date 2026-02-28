export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Smart City Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Traffic Status</h2>
          <p className="text-green-600 mt-3 text-lg">Smooth Flow</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Air Quality Index</h2>
          <p className="text-yellow-600 mt-3 text-lg">AQI 82 (Moderate)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Temperature</h2>
          <p className="text-blue-600 mt-3 text-lg">28°C</p>
        </div>
      </div>
    </div>
  );
}
