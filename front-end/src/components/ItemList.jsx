import React from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
  // const ItemList = (props) => {
  // console.log(props.title);  // elimina o props acima
  // console.log(items);
  // const pathname = useLocation().pathname;
  // abaixo usamos o conceito de desestruturação
  const { pathname } = useLocation();
  //console.log(pathname);
  const isHome = pathname === "/";
  const finalItems = isHome ? items : Infinity;

  // let finalItems;
  // isHome ? (finalItems = items) : (finalItems = Infinity);

  return (
    <div className="item-list">
      <div className="item-list__header">
        <h2>{title} populares</h2>
        {/* o link abaixo tem de vir montado do main.jsx */}
        {isHome ? (
          <Link to={path} className="item-list__link">
            Mostrar tudo
          </Link>
        ) : (
          <></>
        )}
        {/* console.log(path); */}
      </div>
      <div className="item-list__container">
        {itemsArray
          .filter((currentValue, index) => index < finalItems)
          //muda aqui o nome do objeto currObj
          .map((currObj, index) => (
            // <SingleItem />
            // <SingleItem key={`${title}-${index}`} />
            <SingleItem
              // id={currObj.id}
              // name={currObj.name}
              // image={currObj.image}
              // banner={currObj.banner}
              idPath={idPath}
              {...currObj}
              key={`${title}-${index}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemList;
