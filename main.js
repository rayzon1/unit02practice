const title = document.querySelector('h1');
const color = document.querySelector('#button');
const addExcl = document.querySelector('#addExcl');
const deleteExcl = document.querySelector('#deleteExcl');
const div = document.getElementsByTagName('div')[0];
const list = document.getElementsByClassName('list');
const listOl = document.querySelector('ol');
const li = document.querySelector('li.list');
const buttonUp = document.querySelector('button.up');
const removeText = document.querySelector('button.remove_text');
const input = document.querySelector('input');
const addFruit = document.querySelector('button.add_fruit');
const addVegetable = document.querySelector('button.add_vegetable')
const checkFruit = document.querySelector('#checkbox_fruit');
const checkVegetable = document.querySelector('#checkbox_vegetable');



// cycles through rgb values to generate random colors
const randomColor = () => {
    let rand1 = Math.floor(Math.random() * 255);
    let rand2 = Math.floor(Math.random() * 255);
    let rand3 = Math.floor(Math.random() * 255);
    return `rgba(${rand1}, ${rand2}, ${rand3}, 0.5)`;
}

// adds random background color to the title
color.addEventListener('click', () => {
    title.style.color = randomColor();
    color.style.backgroundColor = randomColor();
});

addExcl.addEventListener('click', () => {
    addExcl.style.backgroundColor = randomColor();
    title.textContent += '!';
});

// removes exclamation from the end of title
deleteExcl.addEventListener('click', () => {
    let list = '';
    for(let i = 0; i < title.innerHTML.length - 1; i ++ ){
        list += title.innerHTML[i];
    }
    title.innerHTML = list;
});


// moves the li elements up by swapping with previous element
// second if statement moves the element down by swapping with next element
listOl.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON"){ 
        if (e.target.className === "down"){
            let li = e.target.parentNode;
            let nextLi = li.nextElementSibling;
            let ol = li.parentNode;
            if(nextLi){
                ol.insertBefore(nextLi, li);
            }   

        } else if (e.target.className === "up"){
            let li = e.target.parentNode;
            let prevLi = li.previousElementSibling;
            let ol = li.parentNode;
            if(prevLi){
                ol.insertBefore(li, prevLi);
            }                

        } else if (e.target.textContent === "Edit"){
            let li = e.target.parentNode;
            let input = document.createElement('input');
            let attr = document.createAttribute('class');
            let span = li.firstElementChild;
            attr.value = 'editInput';
            input.setAttributeNode(attr);
            input.value = span.textContent;
            input.type = 'text';
            li.insertBefore(input, span);
            li.removeChild(span);
            e.target.textContent = 'Save';  

        } else if (e.target.textContent === "Save"){
            let li = e.target.parentNode;
            let span = document.createElement('span');
            let attr = document.createAttribute('class');
            let input = li.firstElementChild;
            attr.value = 'span';
            span.setAttributeNode(attr);
            span.textContent = input.value;
            li.insertBefore(span, input );
            li.removeChild(input);
            e.target.textContent = 'Edit';                                                            
        }
    }
});

// this will add a li item to the ol when clicking Add Fruit button.
// assigns class list fruit to list item
addFruit.addEventListener('click', () => {
    let newEl = document.createElement('li');
    let listClass = document.createAttribute('class');
    listClass.value = "list fruit";
    newEl.setAttributeNode(listClass);
    newEl.innerHTML =  `<span class="span">${input.value}</span>
                        <button class="up">Up</button>
                        <button class="down">Down</button>
                        <button class="edit">Edit</button>`;
    listOl.append(newEl);
    document.querySelector('input').value = '';
});

addVegetable.addEventListener('click', () => {
    let newEl = document.createElement('li');
    let listClass = document.createAttribute('class');
    listClass.value = "list vegetable";
    newEl.setAttributeNode(listClass);
    newEl.innerHTML =  `<span class="span">${input.value}</span>
                        <button class="up">Up</button>
                        <button class="down">Down</button>
                        <button class="edit">Edit</button>`;
    listOl.append(newEl);
    document.querySelector('input').value = '';
});

checkFruit.addEventListener('change', (e) => {
    let lis = listOl.children;
    let isChecked = e.target.checked;
    if (isChecked){
        for (let i = 0; i < lis.length; i ++){
            if (lis[i].className === 'list fruit'){
                lis[i].style.display = '';
                console.log(true);
            } else {
                lis[i].style.display = 'none';
            }
        }
    } else {
        for(let i = 0; i < lis.length; i ++){
            lis[i].style.display = '';
        }
    }
});

// this will remove the last element in the ol
removeText.addEventListener('click', () => {
    listOl.lastElementChild.remove();
});

// will add click function to addText in order to mirror click on button
input.addEventListener('keyup', (e) => {
    if (e.which == 13){
        addText.click();
    }
});
