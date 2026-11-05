import { useState, useEffect } from 'react';
import {
  Thermometer,
  Droplets,
  Sun,
  Leaf,
  Wifi,
  WifiOff,
  AlertTriangle,
  AlertCircle,
  Info,
  Activity,
  Zap,
  Clock,
  Signal,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  generateSensorHistory,
  plants,
  esp32Devices,
  actuators,
  alerts,
  type Plant,
  type Actuator,
} from '../data/mockData';

// ===== STAT CARD =====
function StatCard({
  icon,
  title,
  value,
  unit,
  color,
  trend,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  color: string;
  trend?: string;
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
        {trend && (
          <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{trend}</span>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">
        {value}
        <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}

// ===== PLANT CARD =====
function PlantCard({ plant, onToggleWatering }: { plant: Plant; onToggleWatering: (id: string) => void }) {
  const statusColors = {
    healthy: 'border-green-500/30 bg-green-500/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    critical: 'border-red-500/30 bg-red-500/5',
  };
  const statusBadge = {
    healthy: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    critical: 'bg-red-500/20 text-red-400',
  };
  const statusText = {
    healthy: 'Здоровое',
    warning: 'Внимание',
    critical: 'Критическое',
  };

  return (
    <div className={`border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] ${statusColors[plant.status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{plant.image}</span>
          <div>
            <h3 className="font-semibold text-white text-sm">{plant.name}</h3>
            <p className="text-xs text-gray-400 italic">{plant.species}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[plant.status]}`}>
          {statusText[plant.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs">
          <Thermometer className="w-3 h-3 text-orange-400" />
          <span className="text-gray-300">{plant.temperature}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Droplets className="w-3 h-3 text-blue-400" />
          <span className="text-gray-300">{plant.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-amber-600 text-[10px]">💧</span>
          <span className="text-gray-300">Почва: {plant.soilMoisture}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Sun className="w-3 h-3 text-yellow-400" />
          <span className="text-gray-300">{plant.lightLevel} lux</span>
        </div>
      </div>

      {/* Soil moisture bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Влажность почвы</span>
          <span className={plant.soilMoisture < 30 ? 'text-red-400' : 'text-green-400'}>{plant.soilMoisture}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              plant.soilMoisture < 30 ? 'bg-red-500' : plant.soilMoisture < 50 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${plant.soilMoisture}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <Clock className="w-3 h-3 inline mr-1" />
          Полив: {plant.lastWatered}
        </span>
        <button
          onClick={() => onToggleWatering(plant.id)}
          className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
            plant.autoWatering
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
          }`}
        >
          {plant.autoWatering ? 'Авто ✓' : 'Авто ✗'}
        </button>
      </div>
    </div>
  );
}

// ===== DEVICE CARD =====
function DeviceCard({ device }: { device: typeof esp32Devices[0] }) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    warning: 'bg-yellow-500',
  };
  const statusText = {
    online: 'Онлайн',
    offline: 'Оффлайн',
    warning: 'Предупреждение',
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 hover:border-gray-600/50 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${statusColors[device.status]} animate-pulse`} />
          <h3 className="font-semibold text-white text-sm">{device.name}</h3>
        </div>
        <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded-full">
          {statusText[device.status]}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">IP адрес:</span>
          <span className="text-gray-200 font-mono">{device.ip}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Прошивка:</span>
          <span className="text-gray-200">{device.firmware}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Время работы:</span>
          <span className="text-gray-200">{device.uptime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Сигнал WiFi:</span>
          <span className="text-gray-200 flex items-center gap-1">
            <Signal className="w-3 h-3" />
            {device.rssi} dBm
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-xs text-gray-400 mb-1">Датчики:</p>
        <div className="flex flex-wrap gap-1">
          {device.sensors.map((s) => (
            <span key={s} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">
              {s}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-1 mt-2">Актуаторы:</p>
        <div className="flex flex-wrap gap-1">
          {device.actuators.map((a) => (
            <span key={a} className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ACTUATOR CONTROL =====
function ActuatorControl({
  actuator,
  onToggle,
}: {
  actuator: Actuator;
  onToggle: (id: string) => void;
}) {
  const typeIcons = {
    pump: '💧',
    fan: '🌀',
    light: '💡',
    heater: '🔥',
    valve: '🚿',
  };
  const typeNames = {
    pump: 'Насос',
    fan: 'Вентилятор',
    light: 'Освещение',
    heater: 'Нагреватель',
    valve: 'Клапан',
  };

  return (
    <div className="flex items-center justify-between bg-gray-800/30 border border-gray-700/30 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">{typeIcons[actuator.type]}</span>
        <div>
          <p className="text-sm text-white font-medium">{actuator.name}</p>
          <p className="text-xs text-gray-400">
            {typeNames[actuator.type]} • {actuator.zone}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {actuator.auto && (
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">AUTO</span>
        )}
        <button
          onClick={() => onToggle(actuator.id)}
          className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
            actuator.status ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
              actuator.status ? 'left-5.5' : 'left-0.5'
            }`}
            style={{ left: actuator.status ? '22px' : '2px' }}
          />
        </button>
      </div>
    </div>
  );
}

// ===== ALERT ITEM =====
function AlertItem({ alert }: { alert: typeof alerts[0] }) {
  const icons = {
    critical: <AlertCircle className="w-4 h-4 text-red-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    info: <Info className="w-4 h-4 text-blue-400" />,
  };
  const colors = {
    critical: 'border-red-500/20 bg-red-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
    info: 'border-blue-500/20 bg-blue-500/5',
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${colors[alert.type]}`}>
      <div className="mt-0.5">{icons[alert.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200">{alert.message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{alert.time}</span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-500">{alert.zone}</span>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN DASHBOARD =====
export default function Dashboard() {
  const [sensorData, setSensorData] = useState(generateSensorHistory(24));
  const [plantsList, setPlantsList] = useState(plants);
  const [actuatorList, setActuatorList] = useState(actuators);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateSensorHistory(24));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const togglePlantWatering = (id: string) => {
    setPlantsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, autoWatering: !p.autoWatering } : p))
    );
  };

  const toggleActuator = (id: string) => {
    setActuatorList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: !a.status } : a))
    );
  };

  const avgTemp = (sensorData[sensorData.length - 1]?.temperature ?? 0).toFixed(1);
  const avgHumidity = (sensorData[sensorData.length - 1]?.humidity ?? 0).toFixed(0);
  const avgSoil = (sensorData[sensorData.length - 1]?.soilMoisture ?? 0).toFixed(0);
  const onlineDevices = esp32Devices.filter((d) => d.status === 'online' || d.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Thermometer className="w-5 h-5 text-orange-400" />}
          title="Температура"
          value={avgTemp}
          unit="°C"
          color="bg-orange-500/10"
          trend="↑ +0.5°"
        />
        <StatCard
          icon={<Droplets className="w-5 h-5 text-blue-400" />}
          title="Влажность воздуха"
          value={avgHumidity}
          unit="%"
          color="bg-blue-500/10"
          trend="↓ -2%"
        />
        <StatCard
          icon={<Leaf className="w-5 h-5 text-green-400" />}
          title="Влажность почвы"
          value={avgSoil}
          unit="%"
          color="bg-green-500/10"
          trend="Стабильно"
        />
        <StatCard
          icon={<Wifi className="w-5 h-5 text-purple-400" />}
          title="Устройства ESP32"
          value={`${onlineDevices}/${esp32Devices.length}`}
          unit="онлайн"
          color="bg-purple-500/10"
          trend="Все работают"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Temperature & Humidity Chart */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Температура и влажность (24ч)
            </h3>
            <span className="text-xs text-gray-400">Обновлено: {currentTime.toLocaleTimeString('ru-RU')}</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sensorData}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} interval={3} />
              <YAxis stroke="#6b7280" fontSize={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#tempGrad)" name="Температура °C" />
              <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#humGrad)" name="Влажность %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Soil Moisture Chart */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" />
              Влажность почвы (24ч)
            </h3>
            <span className="text-xs text-gray-400">Все зоны</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} interval={3} />
              <YAxis stroke="#6b7280" fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="soilMoisture" stroke="#22c55e" strokeWidth={2} dot={false} name="Влажность почвы %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plants Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            Растения
          </h2>
          <span className="text-xs text-gray-400">
            {plantsList.filter((p) => p.status === 'healthy').length} здоровых •{' '}
            {plantsList.filter((p) => p.status === 'warning').length} внимание •{' '}
            {plantsList.filter((p) => p.status === 'critical').length} критические
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plantsList.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onToggleWatering={togglePlantWatering} />
          ))}
        </div>
      </div>

      {/* Devices & Actuators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESP32 Devices */}
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            Устройства ESP32
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {esp32Devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>

        {/* Actuator Controls */}
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-400" />
            Управление устройствами
          </h2>
          <div className="space-y-2">
            {actuatorList.map((actuator) => (
              <ActuatorControl key={actuator.id} actuator={actuator} onToggle={toggleActuator} />
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Уведомления и события
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Network Info Footer */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-green-400" />
              WiFi: GreenhouseNet_5G
            </span>
            <span>MQTT Broker: 192.168.1.10:1883</span>
            <span>Протокол: MQTT v3.1.1</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Пинг: 12ms</span>
            <span>Пакетов получено: 48,291</span>
            <span>Ошибок: 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
