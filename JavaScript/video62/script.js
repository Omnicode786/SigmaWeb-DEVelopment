  let allnodes = document.body.childNodes;
        console.log(allnodes);
let container = allnodes[1];
console.log(container);
let childofcontainer = container.childNodes;
console.log("These are the direct children of container");
console.log(childofcontainer);


// console.log(container.children);
// children property gives only element nodes
let childsofcontainer2 = container.children;
console.log("These are the direct children of container using children property");
console.log(childsofcontainer2);

// ye jo childofcontainer he ye text node bhi show krta he
// isliye hum isko filter krte hen
// text basically whitespace hota he
let childsofcontainer = Array.from(childofcontainer).filter((node) => {
    return node.nodeType === 1;
    
    // 1 means element node where as text is 3 and is called text node and 2 is comment node and 4 is cdata node
    // similarly tehre are many following are 11 node types
    // 1: Element node is the element itself
    // 2: Attribute node is the attribute of an element
    // 3: Text node is the text content of an element it is also the text spaces between elements
    // 4: CDATA section node is a section of text that is not parsed by the parser
    // 5: Entity reference node is a reference to an entity
    // 6: Entity node is an entity
    // 7: Processing instruction node is an instruction for the processor
    // 8: Comment node is a comment in the code
    // 9: Document node is the root node of the document
    // 10: Document type node is the type of the document
    // 11: Document fragment node is a lightweight container for holding nodes
});
console.log(childsofcontainer);

let box5 =  childsofcontainer[3].nextElementSibling;
console.log("Next sibling of Box4 is: ");
console.log(box5);
let box3 = childsofcontainer[3].previousElementSibling;
console.log("Previous sibling of Box4 is: ");
console.log(box3);
// here it is showing box1 
