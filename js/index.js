function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function applyTitleCaseTo(str) {
  var notCapitalized = ['a', 'an', 'and',
    'at', 'but', 'by',
    'for', 'in', 'nor',
    'of', 'on', 'or',
    'so', 'the', 'to',
    'up', 'yet'
  ];

  return str.replace(/(\w|['])+/g, function(txt) {
    if ($.inArray(txt.toLowerCase(), notCapitalized) > 1) {
      return txt.toLowerCase();
    } else {
      return capitalize(txt);
    }
  });
}

// sentences
// (\w|\s|[,;:'"])+(\b)([.!?]|$)

function applySentenceCaseTo(str) {
  return str.replace(/(\w|\s|[,'])+([.!?]\s|[.!?]|$)/g, function(txt) {
      return capitalize(txt);
  });
  // return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/*
function applyCamelCaseTo(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
*/
function applySpinalCaseTo(str) {
  return str.replace(/_/g, ' ')
    .replace(/\'|"+/g, '-')
    .replace(/\W+/g, '-')
    .replace(/^\W+|\W+$/, '')
//    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
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