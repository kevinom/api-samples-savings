'use strict';

module.exports = function(Plan) {
  Plan.estimate = function(deposit, rate, years, cb) {
    process.nextTick(function() {
      if (deposit < 0 || rate < 0 || years < 0) {
        cb(new Error("Deposits, rate, and years must be positive numbers."));
        return;
      }
      var balance = deposit * (Math.pow(1 + rate, years) - 1) / rate;

      balance = Math.round(balance * 100) / 100;

      cb(null, balance);
    });
  };

  Plan.estimateJSON = function(plan, cb) {
    var deposit = plan.deposit || null;
    var rate    = plan.rate    || null;
    var years   = plan.years   || null;

    if ( null == deposit || null == rate || null == years ) {
      cb(new Error("Expected deposit, rate, years properties in message body."));
    }

    Plan.estimate(deposit, rate, years, cb);
  }
};
