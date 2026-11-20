import { useState } from 'react';
import {
  LayoutDashboard,
  Leaf,
  Zap,
  Settings,
  Bell,
  Menu,
  X,
  Wifi,
  Thermometer,
  Droplets,
} from 'lucide-react';
import Dashboard from './components/Dashboard';

type Tab = 'dashboard' | 'plants' | 'devices' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: 'dashboard' as Tab, label: 'Панель управления', icon: LayoutDashboard },
    { id: 'plants' as Tab, label: 'Растения', icon: Leaf },
    { id: 'devices' as Tab, label: 'Устройства', icon: Zap },
    { id: 'settings' as Tab, label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900/80 border-r border-gray-800 fixed h-full z-30">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">IoT Plant Control</h1>
              <p className="text-xs text-gray-400">ESP32 Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Система</span>
              <span className="flex items-center gap-1 text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Активна
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Устройства</span>
              <span className="text-gray-200">4/4</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">WiFi</span>
              <span className="flex items-center gap-1 text-green-400">
                <Wifi className="w-3 h-3" />
                Подключено
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-white text-sm">IoT Plant Control</h1>
                  <p className="text-xs text-gray-400">ESP32 Dashboard</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {navItems.find((n) => n.id === activeTab)?.label}
                </h2>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Мониторинг в реальном времени • ESP32 IoT
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-3 mr-4">
                <div className="flex items-center gap-1.5 text-xs bg-gray-800/50 px-3 py-1.5 rounded-lg">
                  <Thermometer className="w-3 h-3 text-orange-400" />
                  <span className="text-gray-300">24.5°C</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-gray-800/50 px-3 py-1.5 rounded-lg">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">58%</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-4 z-50">
                    <h3 className="text-sm font-semibold text-white mb-3">Уведомления</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300">
                        🚨 Базилик: Критическая влажность почвы
                      </div>
                      <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-300">
                        ⚠️ ESP32-ZoneD: Слабый WiFi сигнал
                      </div>
                      <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-300">
                        ⚠️ Фикус: Низкая влажность почвы
                      </div>
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                        ℹ️ Автополив Зона A завершён
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                А
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'plants' && <PlantsPage />}
          {activeTab === 'devices' && <DevicesPage />}
          {activeTab === 'settings' && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

// ===== PLANTS PAGE =====
function PlantsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">🌿 Управление растениями</h2>
        <p className="text-sm text-gray-300">
          Мониторинг состояния растений в реальном времени. Данные поступают с датчиков ESP32 каждые 5 секунд.
          Автоматический полив включён для большинства растений.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { emoji: '🌿', name: 'Монстера', zone: 'Зона A', temp: '24.5°C', hum: '68%', soil: '72%', status: 'healthy' },
          { emoji: '🌳', name: 'Фикус', zone: 'Зона A', temp: '23.1°C', hum: '55%', soil: '35%', status: 'warning' },
          { emoji: '🌵', name: 'Кактус', zone: 'Зона B', temp: '28.3°C', hum: '30%', soil: '15%', status: 'healthy' },
          { emoji: '🌸', name: 'Орхидея', zone: 'Зона C', temp: '25.8°C', hum: '72%', soil: '58%', status: 'healthy' },
          { emoji: '🌱', name: 'Базилик', zone: 'Зона D', temp: '22.0°C', hum: '60%', soil: '22%', status: 'critical' },
          { emoji: '🪴', name: 'Алоэ Вера', zone: 'Зона B', temp: '26.2°C', hum: '35%', soil: '28%', status: 'healthy' },
        ].map((plant, i) => (
          <div
            key={i}
            className={`border rounded-2xl p-5 transition-all hover:scale-[1.02] ${
              plant.status === 'critical'
                ? 'border-red-500/30 bg-red-500/5'
                : plant.status === 'warning'
                ? 'border-yellow-500/30 bg-yellow-500/5'
                : 'border-green-500/20 bg-green-500/5'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{plant.emoji}</span>
              <div>
                <h3 className="font-bold text-white">{plant.name}</h3>
                <p className="text-xs text-gray-400">{plant.zone}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-400">Темп.</p>
                <p className="text-sm font-bold text-orange-400">{plant.temp}</p>
              </div>
              <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-400">Влажн.</p>
                <p className="text-sm font-bold text-blue-400">{plant.hum}</p>
              </div>
              <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-400">Почва</p>
                <p className={`text-sm font-bold ${parseInt(plant.soil) < 30 ? 'text-red-400' : 'text-green-400'}`}>
                  {plant.soil}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== DEVICES PAGE =====
function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">⚡ Устройства ESP32</h2>
        <p className="text-sm text-gray-300">
          Все контроллеры ESP32 подключены к локальной сети и обмениваются данными через протокол MQTT.
          Каждое устройство оснащено датчиками температуры, влажности и освещённости.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            name: 'ESP32-ZoneA-Master',
            ip: '192.168.1.101',
            status: 'online',
            uptime: '14д 6ч',
            rssi: -45,
            sensors: ['DHT22', 'BH1750', 'Soil Cap.'],
            actuators: ['Насос', 'Вентилятор'],
          },
          {
            name: 'ESP32-ZoneB-Succulent',
            ip: '192.168.1.102',
            status: 'online',
            uptime: '14д 6ч',
            rssi: -52,
            sensors: ['DHT22', 'BH1750', 'Soil Cap.'],
            actuators: ['Насос'],
          },
          {
            name: 'ESP32-ZoneC-Orchid',
            ip: '192.168.1.103',
            status: 'online',
            uptime: '7д 12ч',
            rssi: -61,
            sensors: ['DHT22', 'BH1750', 'Soil Cap.', 'DS18B20'],
            actuators: ['Насос', 'Туман', 'Вентилятор'],
          },
          {
            name: 'ESP32-ZoneD-Herbs',
            ip: '192.168.1.104',
            status: 'warning',
            uptime: '0д 2ч',
            rssi: -72,
            sensors: ['DHT22', 'BH1750', 'Soil Cap.'],
            actuators: ['Насос', 'Свет', 'Вентилятор'],
          },
        ].map((device, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  } animate-pulse`}
                />
                <h3 className="font-bold text-white text-sm">{device.name}</h3>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  device.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {device.status === 'online' ? 'Онлайн' : 'Предупр.'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-gray-400">IP адрес</p>
                <p className="text-white font-mono">{device.ip}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-gray-400">Время работы</p>
                <p className="text-white">{device.uptime}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-gray-400">WiFi RSSI</p>
                <p className="text-white">{device.rssi} dBm</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-gray-400">Прошивка</p>
                <p className="text-white">v2.4.1</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400 mb-1">Датчики:</p>
                <div className="flex flex-wrap gap-1">
                  {device.sensors.map((s) => (
                    <span key={s} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Актуаторы:</p>
                <div className="flex flex-wrap gap-1">
                  {device.actuators.map((a) => (
                    <span key={a} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Diagram */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">🏗️ Архитектура системы</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 w-40">
            <p className="text-2xl mb-1">📡</p>
            <p className="text-xs text-blue-400 font-bold">Датчики</p>
            <p className="text-[10px] text-gray-400">DHT22, BH1750, Soil</p>
          </div>
          <div className="text-gray-500 text-2xl">→</div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 w-40">
            <p className="text-2xl mb-1">🔌</p>
            <p className="text-xs text-green-400 font-bold">ESP32</p>
            <p className="text-[10px] text-gray-400">WiFi + MQTT Client</p>
          </div>
          <div className="text-gray-500 text-2xl">→</div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 w-40">
            <p className="text-2xl mb-1">🖥️</p>
            <p className="text-xs text-purple-400 font-bold">Веб-панель</p>
            <p className="text-[10px] text-gray-400">React Dashboard</p>
          </div>
          <div className="text-gray-500 text-2xl">→</div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 w-40">
            <p className="text-2xl mb-1">💧</p>
            <p className="text-xs text-orange-400 font-bold">Актуаторы</p>
            <p className="text-[10px] text-gray-400">Насосы, вентиляторы</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SETTINGS PAGE =====
function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">⚙️ Настройки системы</h2>
        <p className="text-sm text-gray-300">
          Конфигурация пороговых значений, расписания полива и параметров сети.
        </p>
      </div>

      {/* Thresholds */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4">🌡️ Пороговые значения</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Мин. температура (°C)</label>
              <input
                type="number"
                defaultValue={18}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Макс. температура (°C)</label>
              <input
                type="number"
                defaultValue={32}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Мин. влажность воздуха (%)</label>
              <input
                type="number"
                defaultValue={40}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Макс. влажность воздуха (%)</label>
              <input
                type="number"
                defaultValue={80}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Мин. влажность почвы (%)</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Интервал опроса датчиков (сек)</label>
              <input
                type="number"
                defaultValue={5}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Network */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4">🌐 Сетевые настройки</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">MQTT Broker</label>
              <input
                type="text"
                defaultValue="192.168.1.10"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">MQTT Port</label>
              <input
                type="number"
                defaultValue={1883}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">WiFi SSID</label>
              <input
                type="text"
                defaultValue="GreenhouseNet_5G"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Topic Prefix</label>
              <input
                type="text"
                defaultValue="iot/greenhouse/"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4">🕐 Расписание полива</h3>
        <div className="space-y-3">
          {[
            { zone: 'Зона A - Тропические', schedule: 'Каждые 6 часов', next: '14:00' },
            { zone: 'Зона B - Суккуленты', schedule: 'Каждые 72 часа', next: 'Завтра 08:00' },
            { zone: 'Зона C - Орхидеи', schedule: 'Каждые 12 часов', next: '18:00' },
            { zone: 'Зона D - Травы', schedule: 'Каждые 8 часов', next: '16:00' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-900/30 rounded-xl p-3">
              <div>
                <p className="text-sm text-white">{item.zone}</p>
                <p className="text-xs text-gray-400">{item.schedule}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Следующий:</p>
                <p className="text-sm text-green-400">{item.next}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all">
        💾 Сохранить настройки
      </button>
    </div>
  );
}

export default App;
