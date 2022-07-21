import React from "react";

const createAlwaysIncreaseNum =()=>{
  const d = new Date();
  let time = d.getTime() - 1648558999999 - 870000;   //since 1970
  
}

let getNodes = str => new DOMParser().parseFromString(str, "text/html").body.childNodes;

let createJSX = (nodeArray) => {
  //const className = nodeArray[0].className;
  let time = createAlwaysIncreaseNum();

  return nodeArray.map( node => {
    const d = new Date();
    let time = d.getTime() - 1648558999999 - 870000;   //since 1970
    let t = Math.round(time * Math.random());

    // t is always different number
    let attributeObj = {key: t};
    
    const {
      localName,        //element/tag name = <div>, <p>, <a> or <white space>
                        //<white space> for separating nodes, 
                        //<white space> has nothing inside

      attributes,       //arrays of attributes == name, id, style...
      childNodes,       //remain [child-nodes] inside this node
      nodeValue         //value of this node = innerHTML == TextContent
    } = node;           

    if (attributes) {
      Array.from(attributes).forEach(attribute => {
        
        if (attribute.name === "style") {
          let styleAttributes = attribute.nodeValue.split(";");
          let styleObj = {};
          
          styleAttributes.forEach(attribute => {
            let [key, value] = attribute.split(":");

            if (key ==='text-align') styleObj['textAlign'] = value;
            else styleObj[key] = value;
          });
          
          attributeObj[attribute.name] = styleObj;
        } 
        else if (attribute.name === "class"){
          attributeObj['className'] = attribute.nodeValue;
        }
        else 
        {
          attributeObj[attribute.name] = attribute.nodeValue;
        }
      });
    }

    return localName ?
      React.createElement(
        localName,              //types == element/tag name
        attributeObj,             //props
        
        //children
        childNodes && Array.isArray(Array.from(childNodes)) ?
            createJSX(Array.from(childNodes)) 
            :
            []
      ) 
      :
      nodeValue;
  });
};

export const ConvertStringToHTML = (props) => {

  //eliminate the whitespace between '> <' to become '><'
  //also repal
  let data = JSON.stringify(props.domString);
  
  //Remove \n
  const d1 = data.replace(/\\n/g, "");

  //remvoe white space
  const d2 = d1.replace(/>\s+</g , "><");

  //Replace  \"  to  " <=> help regex recognise \ by adding \
  const d3 = d2.replace(/\\"/g, '"');

  //Remove " and " at both head
  const d4 = d3.slice(1, d3.length-2)
  
  //console.log(d4);

  return createJSX(Array.from(getNodes(d4)));
};