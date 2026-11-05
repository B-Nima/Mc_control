export interface SensorReading {
  time: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
  lastWatered: string;
  status: 'healthy' | 'warning' | 'critical';
  autoWatering: boolean;
  zone: string;
}

export interface ESP32Device {
  id: string;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'warning';
  firmware: string;
  uptime: string;
  rssi: number;
  sensors: string[];
  actuators: string[];
}

export interface Actuator {
  id: string;
  name: string;
  type: 'pump' | 'fan' | 'light' | 'heater' | 'valve';
  status: boolean;
  deviceId: string;
  zone: string;
  auto: boolean;
}

export const generateSensorHistory = (hours: number = 24): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      temperature: 22 + Math.sin(i / 4) * 4 + Math.random() * 2,
      humidity: 55 + Math.cos(i / 3) * 10 + Math.random() * 5,
      soilMoisture: 40 + Math.sin(i / 6) * 15 + Math.random() * 8,
    });
  }
  return data;
};

export const plants: Plant[] = [
  {
    id: 'plant-1',
    name: 'Монстера Делициоза',
    species: 'Monstera deliciosa',
    image: '🌿',
    temperature: 24.5,
    humidity: 68,
    soilMoisture: 72,
    lightLevel: 450,
    lastWatered: '2 часа назад',
    status: 'healthy',
    autoWatering: true,
    zone: 'Зона A - Тропические',
  },
  {
    id: 'plant-2',
    name: 'Фикус Бенджамина',
    species: 'Ficus benjamina',
    image: '🌳',
    temperature: 23.1,
    humidity: 55,
    soilMoisture: 35,
    lightLevel: 380,
    lastWatered: '6 часов назад',
    status: 'warning',
    autoWatering: true,
    zone: 'Зона A - Тропические',
  },
  {
    id: 'plant-3',
    name: 'Кактус Эхинокактус',
    species: 'Echinocactus grusonii',
    image: '🌵',
    temperature: 28.3,
    humidity: 30,
    soilMoisture: 15,
    lightLevel: 820,
    lastWatered: '3 дня назад',
    status: 'healthy',
    autoWatering: false,
    zone: 'Зона B - Суккуленты',
  },
  {
    id: 'plant-4',
    name: 'Орхидея Фаленопсис',
    species: 'Phalaenopsis',
    image: '🌸',
    temperature: 25.8,
    humidity: 72,
    soilMoisture: 58,
    lightLevel: 300,
    lastWatered: '1 день назад',
    status: 'healthy',
    autoWatering: true,
    zone: 'Зона C - Орхидеи',
  },
  {
    id: 'plant-5',
    name: 'Базилик',
    species: 'Ocimum basilicum',
    image: '🌱',
    temperature: 22.0,
    humidity: 60,
    soilMoisture: 22,
    lightLevel: 600,
    lastWatered: '12 часов назад',
    status: 'critical',
    autoWatering: true,
    zone: 'Зона D - Травы',
  },
  {
    id: 'plant-6',
    name: 'Алоэ Вера',
    species: 'Aloe vera',
    image: '🪴',
    temperature: 26.2,
    humidity: 35,
    soilMoisture: 28,
    lightLevel: 700,
    lastWatered: '5 дней назад',
    status: 'healthy',
    autoWatering: false,
    zone: 'Зона B - Суккуленты',
  },
];

export const esp32Devices: ESP32Device[] = [
  {
    id: 'esp-1',
    name: 'ESP32-ZoneA-Master',
    ip: '192.168.1.101',
    status: 'online',
    firmware: 'v2.4.1',
    uptime: '14д 6ч 32м',
    rssi: -45,
    sensors: ['DHT22', 'BH1750', 'Capacitive Soil'],
    actuators: ['Relay Pump', 'Relay Fan'],
  },
  {
    id: 'esp-2',
    name: 'ESP32-ZoneB-Succulent',
    ip: '192.168.1.102',
    status: 'online',
    firmware: 'v2.4.1',
    uptime: '14д 6ч 30м',
    rssi: -52,
    sensors: ['DHT22', 'BH1750', 'Capacitive Soil'],
    actuators: ['Relay Pump'],
  },
  {
    id: 'esp-3',
    name: 'ESP32-ZoneC-Orchid',
    ip: '192.168.1.103',
    status: 'online',
    firmware: 'v2.3.8',
    uptime: '7д 12ч 15м',
    rssi: -61,
    sensors: ['DHT22', 'BH1750', 'Capacitive Soil', 'DS18B20'],
    actuators: ['Relay Pump', 'Relay Mist', 'Relay Fan'],
  },
  {
    id: 'esp-4',
    name: 'ESP32-ZoneD-Herbs',
    ip: '192.168.1.104',
    status: 'warning',
    firmware: 'v2.4.1',
    uptime: '0д 2ч 45м',
    rssi: -72,
    sensors: ['DHT22', 'BH1750', 'Capacitive Soil'],
    actuators: ['Relay Pump', 'Relay Light', 'Relay Fan'],
  },
];

export const actuators: Actuator[] = [
  { id: 'act-1', name: 'Насос Зона A', type: 'pump', status: false, deviceId: 'esp-1', zone: 'Зона A', auto: true },
  { id: 'act-2', name: 'Вентилятор Зона A', type: 'fan', status: true, deviceId: 'esp-1', zone: 'Зона A', auto: true },
  { id: 'act-3', name: 'Насос Зона B', type: 'pump', status: false, deviceId: 'esp-2', zone: 'Зона B', auto: false },
  { id: 'act-4', name: 'Насос Зона C', type: 'pump', status: false, deviceId: 'esp-3', zone: 'Зона C', auto: true },
  { id: 'act-5', name: 'Туман Зона C', type: 'valve', status: true, deviceId: 'esp-3', zone: 'Зона C', auto: true },
  { id: 'act-6', name: 'Вентилятор Зона C', type: 'fan', status: false, deviceId: 'esp-3', zone: 'Зона C', auto: false },
  { id: 'act-7', name: 'Насос Зона D', type: 'pump', status: false, deviceId: 'esp-4', zone: 'Зона D', auto: true },
  { id: 'act-8', name: 'Свет Зона D', type: 'light', status: true, deviceId: 'esp-4', zone: 'Зона D', auto: true },
  { id: 'act-9', name: 'Вентилятор Зона D', type: 'fan', status: false, deviceId: 'esp-4', zone: 'Зона D', auto: false },
];

export const alerts = [
  { id: 1, type: 'critical' as const, message: 'Базилик: Критически низкая влажность почвы (22%)', time: '5 мин назад', zone: 'Зона D' },
  { id: 2, type: 'warning' as const, message: 'ESP32-ZoneD-Herbs: Слабый сигнал WiFi (-72 dBm)', time: '15 мин назад', zone: 'Зона D' },
  { id: 3, type: 'warning' as const, message: 'Фикус Бенджамина: Низкая влажность почвы (35%)', time: '1 час назад', zone: 'Зона A' },
  { id: 4, type: 'info' as const, message: 'Автополив Зона A: Завершён цикл полива', time: '2 часа назад', zone: 'Зона A' },
  { id: 5, type: 'info' as const, message: 'ESP32-ZoneD-Herbs: Перезагрузка устройства', time: '3 часа назад', zone: 'Зона D' },
];
