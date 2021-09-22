// This code requires CryptoJs: https://www.npmjs.com/package/crypto-js

/**
 * Returns a query string for a list of parameters, with or without
 * delimiters.  For HMAC, set includeDelimiters = false
 *
 * @param parameters
 * @param includeDelimiters
 * @returns {string}
 */
function stringFromParameters(parameters, includeDelimiters) {
  if (parameters == null || Object.keys(parameters).length == 0) {
	return "";
  }
  var parametersString = "";
  var sortedParameterKeys = Object.keys(parameters).sort();
  for (var i = 0; i < sortedParameterKeys.length; i++) {
	var parameter = parameters[sortedParameterKeys[i]];
	if (parameter != null) {
	  if (parameter instanceof Array || parameter instanceof Object) {
		parameter = JSON.stringify(parameter);
	  }
	  parameter = encodeURIComponent(parameter);
	  if (includeDelimiters == true) {
		parametersString = parametersString + "&" + sortedParameterKeys[i] + "=" + parameter;
	  } else {
		parametersString = parametersString + sortedParameterKeys[i] + parameter;
	  }
	}
  }
  return parametersString;
}

/**
 * Returns the HMAC encoded (signed) signature for a query string
 *
 * @param plaintext
 * @param key
 * @returns {*|string|void}
 */
function getHmacSignature(plaintext, key) {
  if (plaintext == null || key == null || !CryptoJS) {
	return "";
  }

  plaintext = plaintext.replaceAll(" ", "%20");
  plaintext = plaintext.replaceAll("+", "%2B");
  plaintext = plaintext.replaceAll(",", "%2C");
  var hmac = CryptoJS.HmacSHA256(plaintext, key);
  var base64EncodedHMAC = CryptoJS.enc.Base64.stringify(hmac);
  var percentEscapedHMAC = base64EncodedHMAC.replaceAll("+", "%2B");
  return percentEscapedHMAC;
}

