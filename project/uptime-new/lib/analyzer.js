/**
 * Module dependencies.
 */
var Check      = require('../models/check');
var CheckEvent = require('../models/checkEvent');
var Ping       = require('../models/ping');

/**
 * Analyzer constructor
 *
 * The analyzer aggregates the ping data into QoS scores for checks and tags.
 *
 * The constructor expects a configuration object as parameter, with these properties:
 *   updateInterval: Interval between each update of the QoS score in milliseconds, defaults to 1 minute
 *   qosAggregationInterval: Interval between each daily and hourly aggregation the QoS score in milliseconds, defaults to 1 hour
 *   pingHistory: Oldest ping and checkEvent age to keep in milliseconds, defaults to 3 months
 *
 * @param {Object} Monitor configuration
 * @api   public
 */
function Analyzer(config) {
  config.updateInterval = config.updateInterval || 60 * 1000;
  config.qosAggregationInterval = config.qosAggregationInterval || 60 * 60 * 1000;
  config.pingHistory = config.pingHistory || 3 * 31 * 24 * 60 * 60 * 1000;
  this.config = config;
}

/**
 * Start the analysis of all checks.
 *
 * The polling actually starts after the pollingInterval set to the constructor.
 *
 * @api   public
 */
Analyzer.prototype.start = function() {
  // schedule updates
  this.intervalForUpdate = setInterval(this.updateAllChecks.bind(this), this.config.updateInterval);
  this.intervalForAggregation = setInterval(this.aggregateQos.bind(this), this.config.qosAggregationInterval);
}

/**
 * Stop the analysis of all checks
 *
 * @api   public
 */
Analyzer.prototype.stop = function() {
  clearInterval(this.intervalForUpdate);
  clearInterval(this.intervalForAggregation);
}

/**
 * Update the QoS scores for each check once
 * 
 * @api private
 */
Analyzer.prototype.updateAllChecks = function() {
  Ping.updateLast24HoursQos.apply(Ping);
  Ping.updateLastHourQos.apply(Ping);
}

/**
 * Aggregate the QoS scores for each check
 * 
 * @api private
 */
Analyzer.prototype.aggregateQos = function() {
  var CheckHourlyStat = require('../models/checkHourlyStat');
  CheckHourlyStat.updateLastDayQos.apply(CheckHourlyStat);
  CheckHourlyStat.updateLastMonthQos.apply(CheckHourlyStat);
  var TagHourlyStat = require('../models/tagHourlyStat');
  TagHourlyStat.updateLastDayQos.apply(TagHourlyStat);
  TagHourlyStat.updateLastMonthQos.apply(TagHourlyStat);
  Ping.cleanup(this.config.pingHistory);
  CheckEvent.cleanup(this.config.pingHistory);
}

/**
 * Create an analyzer to update the check and tag qos scores.
 * 
 * Example:
 *
 *    m = analyzer.createAnalyzer({ updateInterval: 60000});
 *    m.start();
 *    // the analysis starts, every 60 seconds
 *    m.stop();
 *
 * @param {Object} Configuration object
 * @api   public
 */
exports.createAnalyzer = function(config) {
  return new Analyzer(config);
}
