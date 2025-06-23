import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-indigo-800 text-white w-64 p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-indigo-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-indigo-700">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="block px-4 py-2 rounded hover:bg-indigo-700">
                Reports
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="block px-4 py-2 rounded hover:bg-indigo-700">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <img 
                  className="h-8 w-8 rounded-full" 
                  src="
                  https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80
                  " 
                  alt="Admin"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-green-500 text-sm mt-2">+12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Active Today</h3>
              <p className="text-3xl font-bold">567</p>
              <p className="text-green-500 text-sm mt-2">+8% from yesterday</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Reports</h3>
              <p className="text-3xl font-bold">23</p>
              <p className="text-red-500 text-sm mt-2">+3 new today</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Matches Made</h3>
              <p className="text-3xl font-bold">89</p>
              <p className="text-green-500 text-sm mt-2">+5 today</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-b pb-3 last:border-0">
                  <p className="text-gray-700">New user registered: user{item}@example.com</p>
                  <p className="text-sm text-gray-500">{item} hour{item !== 1 ? 's' : ''} ago</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
