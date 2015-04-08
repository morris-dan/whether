var config = {}

config.daysOfWeek =  ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
config.dataUrl = 'https://api.forecast.io/forecast/[apiKey]/[lat],[lng]?units=[units]';
config.apiKey = process.env.FORECAST_IO_APIKEY || '<add secret api key here>';
config.port = process.env.WEB_PORT || 3000;
config.units = 'si';

module.exports = config;