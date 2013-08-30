/*
	       Name: JS Financial
	Description: Some finance functions for JavaScript
	    Version: 0.2
	     Author: Daniel Mullins
*/

var JSfinancial = (function() {
	return {
		pmt: function(rate_per_period, number_of_payments, present_value, future_value, type){
	
			if(rate_per_period != 0.0){
				// Interest rate exists
				var q = Math.pow(1 + rate_per_period, number_of_payments);
				return (rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

			} else if(number_of_payments != 0.0){
				// No interest rate, but number of payments exists
				return (future_value + present_value) / number_of_payments;
			}

			return 0;
		},
		fv: function(rate_per_period, number_of_payments, payment, present_value, type) {
			if ( type === 1) {  payment = payment * (1 + rate_per_period); }
			return -(payment * (Math.pow(1 + rate_per_period, number_of_payments) - 1) / rate_per_period + present_value * Math.pow(1 + rate_per_period, number_of_payments));
		},
		ipmt: function(rate_per_period, period, number_of_payments, present_value, future_value, type) {
			var theFv = fv(rate_per_period, period - 1, pmt(rate_per_period, number_of_payments, present_value, future_value, type), present_value, type),
				ipmt = theFv * rate_per_period;
		
			if (type === 1) { ipmt = ipmt / (1 + rate_per_period); }
	
			return ipmt;
		},
		ppmt: function(rate_per_period, period, number_of_payments, present_value, future_value, type) {
			if(typeof future_value === "undefined") { future_value = 0.0; }
			if(typeof type === "undefined") { type = 0.0; }
	
			var thePmt = pmt(rate_per_period, number_of_payments, present_value, future_value, type),
				theIpmt = ipmt(rate_per_period, period, number_of_payments, present_value, future_value, type);
	
			return thePmt + theIpmt;
		};
	};
})();