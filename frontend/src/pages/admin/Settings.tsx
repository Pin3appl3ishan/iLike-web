import { useState } from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState({
    appName: 'iLike Dating',
    appDescription: 'Find your perfect match',
    maxDistance: 100,
    ageRange: [18, 80],
    emailNotifications: true,
    pushNotifications: true,
    maintenanceMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAgeRangeChange = (index: number, value: string) => {
    const newAgeRange = [...settings.ageRange] as [number, number];
    newAgeRange[index] = parseInt(value, 10) || 0;
    setSettings(prev => ({
      ...prev,
      ageRange: newAgeRange
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to save settings
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

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
              <Link to="/admin/settings" className="block px-4 py-2 rounded bg-indigo-900">
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
            <h1 className="text-2xl font-semibold text-gray-900">Application Settings</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  className="h-8 w-8 rounded-full" 
                  src="https://via.placeholder.com/40" 
                  alt="Admin"
                />
              </div>
            </div>
          </div>
        </header>


        {/* Settings Form */}
        <main className="p-6">
          <form onSubmit={handleSave} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="appName" className="block text-sm font-medium text-gray-700">
                      Application Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="appName"
                        id="appName"
                        value={settings.appName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="appDescription" className="block text-sm font-medium text-gray-700">
                      Application Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="appDescription"
                        name="appDescription"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        value={settings.appDescription}
                        onChange={(e) => setSettings(prev => ({ ...prev, appDescription: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="maxDistance" className="block text-sm font-medium text-gray-700">
                      Maximum Distance (miles)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="maxDistance"
                        id="maxDistance"
                        min="1"
                        max="1000"
                        value={settings.maxDistance}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24">
                        <input
                          type="number"
                          min="18"
                          max={settings.ageRange[1] - 1}
                          value={settings.ageRange[0]}
                          onChange={(e) => handleAgeRangeChange(0, e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="w-24">
                        <input
                          type="number"
                          min={settings.ageRange[0] + 1}
                          max="100"
                          value={settings.ageRange[1]}
                          onChange={(e) => handleAgeRangeChange(1, e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Configure how users receive notifications.
                  </p>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Send email notifications for new matches and messages.</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className={`${
                          settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Enable push notifications on mobile devices.</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className={`${
                          settings.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={() => setSettings(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Maintenance Mode</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enable maintenance mode to take your application offline for maintenance.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500">
                      {settings.maintenanceMode ? 'Your application is currently in maintenance mode.' : 'Your application is currently live.'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className={`${
                        settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                      onClick={() => {
                        const confirm = window.confirm(
                          settings.maintenanceMode 
                            ? 'Are you sure you want to take the application online?' 
                            : 'Are you sure you want to put the application in maintenance mode?'
                        );
                        if (confirm) {
                          setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
                        }
                      }}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Settings;
