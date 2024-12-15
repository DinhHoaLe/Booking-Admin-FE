import React, { useState } from 'react';

const SettingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    // Logic to change the language in your app can be added here
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 flex-grow overflow-auto">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Settings</h2>

        {/* Instance ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Instance ID
          </label>
          <div className="mt-2 flex items-center justify-between">
            <input
              type="text"
              readOnly
              value="IQTAWnSk1Bp4GTv2n45cA"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            />
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              Copy
            </button>
          </div>
        </div>

        {/* Account Restrictions */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Account Restrictions</h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Allow creating new accounts</span>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Enabled</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Allow resetting password</span>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Enabled</span>
            </label>
          </div>
        </div>

        {/* User Deletion */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">User Deletion</h3>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Grace delay (days)
          </label>
          <input
            type="number"
            defaultValue={30}
            className="mt-2 p-2 w-20 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>

        {/* Dark Mode */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Display Settings</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Language Settings</h3>
          <div className="flex justify-between">
            <button
              onClick={() => switchLanguage('en')}
              className={`px-4 py-2 rounded-lg ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('vi')}
              className={`px-4 py-2 rounded-lg ${
                language === 'vi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </div>

        <div className="text-right">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
