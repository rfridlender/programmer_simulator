const bugs = [

  [
    `
    let sandwich = document.querySelector('.sandwich')

    if (sandwich.id = 'tuna') {
      console.log('gross')
    }
    `,
    `letsandwich=document.querySelector('.sandwich')if(sandwich.id==='tuna'){console.log('gross')}`
  ],

  [
    `
    if (sandwich === 'tuna') {
      if (bread === 'wheat') {
        console.log('What a yummy sandwich!')
    
    }
    `,
    `if(sandwich==='tuna'){if(bread==='wheat'){console.log('Whatayummysandwich!')}}`
  ],

  [
    `
    const inventorsBornIn1500s = inventors.filter(function(inventor){
      inventor.year > 1500 && inventor.year < 1600
    })
    `,
    `constinventorsBornIn1500s=inventors.filter(function(inventor){returninventor.year>1500&&inventor.year<1600})`
  ],

  [
    `
    const counts = data.reduce(function(acc, item) {
      acc[item] = acc[item] ? acc[item] + 1 : 1
    }, {})
    `,
    `constcounts=data.reduce(function(acc,item){returnacc[item]=acc[item]?acc[item]+1:1},{})`
  ],

  [
    `const el = document.querySelector("myclass")`,
    `constel=document.querySelector(".myclass")`
  ],

  [
    `const el = document.querySelector("cardId")`,
    `constel=document.querySelector("#cardId")`
  ],

  [
    `
    const array1 = ['a', 'b', 'c']

    forEach(array1 => console.log(element))
    `,
    `constarray1=['a','b','c']array1.forEach(element=>console.log(element))`
  ],

  [
    `
    document.getElementById("specialId").color = "red"
    `,
    `document.getElementById("specialId").style.color = "red"`
  ],

  [
    `
    for (let i = 0; i < 9; i++ {
      console.log(i)
    })
    `,
    `for(leti=0;i<9;i++){console.log(i)})`
  ],

  [
    `let str = 'It's a hard knock life!'`,
    `letstr="It'sahardknocklife!"`
  ],

  [
    `
    fucntion helloWorld(){
      console.log('hello world')
    }
    `,
    `function helloWorld(){console.log('hello world')}`
  ]

]
// const bugs = [

//   [
//     `
//     let sandwich = document.querySelector('.sandwich');

//     if (sandwich.id = 'tuna') {
//       console.log('gross')
//     }
//     `,
//     `
//     let sandwich = document.querySelector('.sandwich');

//     if (sandwich.id === 'tuna') {
//       console.log('gross')
//     }
//     `
//   ],

//   [
//     `
//     if (sandwich === 'tuna') {
//       if (bread === 'wheat') {
//         console.log('What a yummy sandwich!');
    
//     }
//     `,
//     `
//     if (sandwich === 'tuna') {
//       if (bread === 'wheat') {
//         console.log('What a yummy sandwich!');
//       }
//     }
//     `
//   ],

//   [
//     `
//     const inventorsBornIn1500s = inventors.filter(function(inventor){
//       inventor.year > 1500 && inventor.year < 1600
//     })
//     `,
//     `
//     const inventorsBornIn1500s = inventors.filter(function(inventor){
//       return inventor.year > 1500 && inventor.year < 1600
//     })
//     `
//   ],

//   [
//     `
//     const counts = data.reduce(function(acc, item) {
//       acc[item] = acc[item] ? acc[item] + 1 : 1
//     }, {})
//     `,
//     `
//     const counts = data.reduce(function(acc, item) {
//       return acc[item] = acc[item] ? acc[item] + 1 : 1
//     }, {})
//     `
//   ],

//   [
//     `const el = document.querySelector("myclass")`,
//     `const el = document.querySelector(".myclass")`
//   ],

//   [
//     `const el = document.querySelector("cardId")`,
//     `const el = document.querySelector("#cardId")`
//   ],

//   [
//     `
//     const array1 = ['a', 'b', 'c']

//     forEach(array1 => console.log(element))
//     `,
//     `
//     const array1 = ['a', 'b', 'c']

//     array1.forEach(element => console.log(element))
//     `
//   ],

//   [
//     `
//     document.getElementById("specialId").color = "red"
//     `,
//     `
//     document.getElementById("specialId").style.color = "red"
//     `
//   ],

//   [
//     `
//     for (let i = 0; i < 9; i++ {
//       console.log(i)
//     })
//     `,
//     `
//     for (let i = 0; i < 9; i++) {
//       console.log(i)
//     })
//     `
//   ],

//   [
//     `let str = 'It's a hard knock life!'`,
//     `let str = "It's a hard knock life!"`
//   ],

//   [
//     `
//     fucntion helloWorld(){
//       console.log('hello world')
//     }
//     `,
//     `
//     function helloWorld(){
//       console.log('hello world')
//     }
//     `
//   ]

// ]

function assignRandomBug() {
  let randomIdx = Math.floor(Math.random() * bugs.length);
  return bugs[randomIdx];
};

export { assignRandomBug };
