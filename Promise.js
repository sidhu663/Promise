function Promise(executor) {
	var successCallbacks = [];
  var failureCallbacks = [];
  var state = 'pending'; 
  
  var resolve = function(resolutionValue) {
		if (state != 'pending') { return; }
    successCallbacks.forEach(f => f(resolutionValue));
    state = 'resolved';
    result = resolutionValue;
  }
  
  var reject = function(rejectionValue) {
  	if (state != 'pending') { return; }
    failureCallbacks.forEach(f => f(rejectionValue));
    state = 'rejected';
    result = rejectionValue;
  }
  
  this.then = function(s, f) {
  	s = s || (x => x);
    f = f || (x => x);
  	return new Promise(function(resolve, reject) {
    	var successCallback = function(resolution) {
      	var callbackResult = s(resolution);
        if (typeof callbackResult == 'object' && 'then' in callbackResult) {
        	callbackResult.then(resolve, reject);
        } else {
        	resolve(callbackResult);
        }
      };
      
      var failureCallback = function(rejection) {
      	var callbackResult = s(resolution);
        if (typeof callbackResult == 'object' && 'then' in callbackResult) {
        	callbackResult.then(resolve, reject);
        } else {
        	reject(callbackResult);
        }
      };
      
    	if (state != 'pending') {
      	state == 'resolved' ? successCallback(result) : failureCallback(result);
      } else {
      	successCallbacks.push(successCallback);
        failureCallbacks.push(failureCallback);
      }
    });
  };
  
  executor(resolve, reject);
}

export default Promise;
