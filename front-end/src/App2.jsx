// rafce cria function automatico
// import React from "react";

// const App2 = () => {
//   return (
//     <div>
//       <h1>Olá, Mundo!</h1>;
//     </div>
//   );
// };

// export default App2;

// rafce

// Arrow Function
//  return <h1>Olá, Mundo!</h1>;
// Nomeação de Componente
// PascalCase  =  Header Title MainSection

// export default, posso importar com qualquer nome e sem chaves
// export "sem default", só posso importar entre chaves e com o nome exportado

// Self closing Tag
// <Header>

// element.style {
//     background-color: antiquewhite;
//     padding: 19px;
//     margin: 20px;
//     border: solid 5px black;
// }

// Nomeação de classes em CSS
// Metodologia
// Blocks
// Elements
// Modifiers
// bloco__elemento--modificador
// header
// header__link
// header__link--small
// item-list__header
// Nomes compostos são separados por -

//Tag Vazia em React se chama Fragment ou Fragmento

// Componentes recebem "props"

// if (5 == "5") {
//   console.log("É verdadeiro");
// } else {
//   console.log("É Falso");
// }

// 5 == "5" ? console.log("Verdadeiro") : console.log("falso")

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }
// const myArray = { 1, 2 , 3, 4, 5 }
// for (let index = 0; index < 5; index++) {
//   console.log(myArray(index));
// }
// {
//   items === 5 ? (
//     <>
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//     </>
//   ) : (
//     <>
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//       <SingleItem />
//     </>
//   );
// }

// {
//   Array(items)
//     .fill()
//     .map(() => <SingleItem />);
// }

//  <div className="item-list__container">
//    {Array(items)
//      .fill()
//      .map((currentvalue, index) => (
//        // <SingleItem />
//        <SingleItem key={`${title}-${index}`} />
//      ))}
//  </div>;

// const myArray3 = [121. 213123, 12310956, 1271. 123401]
// myArray3.filter((correntValue, index)=> currentValue > 100000)
// myArray3.filter((correntValue, index)=> index < 3) mostra só os 3 primeiros

// <div className="item-list__container">
//   {artistArray
//     .filter((currentValue, index) => index < items)
//     //muda aqui o nome do objeto currObj
//     .map((currObj, index) => (
//       // <SingleItem />
//       // <SingleItem key={`${title}-${index}`} />
//       <SingleItem
//         id={currObj.id}
//         name={currObj.name}
//         image={currObj.image}
//         banner={currObj.banner}
//         key={`${title}-${index}`}
//       />
//     ))}
// </div>;

// Spread operator
// ... cria a cópia
// const newObj = {...obj} endereço onde estão os objetos
// QUANDO componentes se re-renderizão ?
// Umas das ocasiões é quando uma variável de estado usada por esse componente é atualizada
// Hook - useState
