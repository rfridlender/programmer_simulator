const inventorsBornIn1500s = inventors.filter(function(inventor){
  inventor.year > 1500 && inventor.year < 1600
})


const counts = data.reduce(function(acc, item) {
  acc[item] = acc[item] ? acc[item] + 1 : 1
}, {})