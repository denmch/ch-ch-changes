function capitalize(str) {
  // Just make sure the first is caps but don't fuss
  // otherwise so as not to disturb acronyms, etc.
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function initialize(str) {
  // Force all but first char to lowercase. Draconian.
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function applyTitleCaseTo(str) {
  // List of words not to be capitalized
  var notCapitalized = ['a', 'an', 'and',
                        'at', 'but', 'by',
                        'for', 'in', 'nor',
                        'of', 'on', 'or',
                        'so', 'the', 'to',
                        'up', 'yet'];

  var result = str.replace(/(\w|['])+/g, function(txt) {
    // Only capitalize words that aren't in the list
    if ($.inArray(txt.toLowerCase(), notCapitalized) > -1) {
      return txt.toLowerCase();
    } else {
      return capitalize(txt);
    }
  });

  // Capitalize the first letter of the sentence
  // just in case it happens to be on the list.
  return capitalize(result);
}

function applySentenceCaseTo(str) {
  // Split on punctuation but retain it
  var matches = str.match(/([^?.!]+([?.!]|$))(?:\s|$)/g);
  if (matches === null) {
    return matches = str;
  }
  
  // Capitalize each sentence
  for (var i = 0; i < matches.length; i++) {
    matches[i] = initialize(matches[i]);
  }
  
  return matches.join('');
}

function applySpinalCaseTo(str) {
  return str.replace(/_/g, ' ')
    .replace(/\'|"+/g, '')
    .replace(/\W+/g, '-')
    .replace(/^\W+|\W+$/, '')
    .toLowerCase();
}

function applyCamelCaseTo(str) {
  var tempStr = str.replace(/(\w|['])+/g, function(txt) {
    return capitalize(txt);
  }).replace(/\W/g, '');
  return tempStr.charAt(0).toLowerCase() + tempStr.slice(1);
}

$('#convertible').keyup(function(e) {
  var textToBeConverted = this.value.replace(/[_]/g, ' ');

  $('#title-case').on('click', function() {
    $('#convertible').val(applyTitleCaseTo(textToBeConverted));
  });

  $('#sentence-case').on('click', function() {
    $('#convertible').val(applySentenceCaseTo(textToBeConverted));
  });

  $('#uppercase').on('click', function() {
    $('#convertible').val(textToBeConverted.toUpperCase());
  });

  $('#lowercase').on('click', function() {
    $('#convertible').val(textToBeConverted.toLowerCase());
  });

  $('#camel-case').on('click', function() {
    $('#convertible').val(applyCamelCaseTo(textToBeConverted));
  });

  $('#spinal-case').on('click', function() {
    $('#convertible').val(applySpinalCaseTo(textToBeConverted));
  });

  $('button').on('click', function() {
    $('button').removeAttr('disabled');
    $(this).attr('disabled');
  });
});