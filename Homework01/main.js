const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clean = document.getElementById('todo-clean');
const count = document.getElementById('todo-total');
const all_button = document.getElementById('all-button');
const active_button = document.getElementById('active-button');
const completed_button = document.getElementById('completed-button');
let id = 0;
let state = 0;
const items = [];

const findItemsIndex = id => items.findIndex(e => Number(e.id) === Number(id));

const setCompleted = (event) => {
  const node = event.target;
  const index = findItemsIndex(event.target.id);
  items[index].isComplete = !items[index].isComplete;
  node.closest('.todo-app__item').classList.toggle('completed');
  if (state !== 0) {
    node.closest('.todo-app__item').parentNode.removeChild(node.closest('.todo-app__item'));
  }
  setCleanButton();
  refleshCount();
}

const removeItem = (event) => {
  const id = event.target.parentNode.firstChild.firstChild.id;
  const node = event.target.parentNode;
  node.parentNode.removeChild(node);
  const index = findItemsIndex(id);
  items.splice(index, 1);
  refleshCount();
  setCleanButton();
  if (items.length === 0) {
    document.getElementById('todo-footer').classList.add('hide');
  }
}

const refleshList = () => {
  list.innerHTML = '';
  if (state === 0) {
    items.forEach(e => {
      list.appendChild(e.node);
    });
  } else if (state === 1) {
    items.filter(ele => !ele.isComplete).forEach(e => {
      list.appendChild(e.node);
    });
  } else {
    items.filter(ele => ele.isComplete).forEach(e => {
      list.appendChild(e.node);
    });
  }
}

const refleshCount = () => {
  count.innerHTML = items.filter(ele => !ele.isComplete).length + ' left';
}

const setCleanButton = () => {
  if (items.some(ele => ele.isComplete)) {
    clean.classList.remove('hide');
  } else {
    clean.classList.add('hide');
  }
}

const CreateNewItem = (value) => {
  const itemNode = document.createElement('LI');
  const wrapper = document.createElement('DIV');
  const checkbox = document.createElement('INPUT');
  const label = document.createElement('LABEL');
  const detail = document.createElement('P');
  const img = document.createElement('IMG');
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  itemNode.appendChild(wrapper);
  itemNode.appendChild(detail);
  itemNode.appendChild(img);
  itemNode.setAttribute("class", "todo-app__item");
  checkbox.setAttribute("id", id);
  checkbox.setAttribute("onClick", "setCompleted(event)");
  checkbox.setAttribute("type", "checkbox");
  label.setAttribute("for", id);
  wrapper.setAttribute("class", "todo-app__checkbox");
  detail.innerHTML = value;
  detail.setAttribute("class", "todo-app__item-detail");
  img.setAttribute("src", "./img/x.png");
  img.setAttribute("class", "todo-app__item-x");
  img.setAttribute("onClick", "removeItem(event)");
  return {
    id: id,
    node: itemNode,
    isComplete: false
  };
}

input.addEventListener('keyup', event => {
  if (event.keyCode === 13 && event.target.value !== '') {
    if (items.length === 0) {
      document.getElementById('todo-footer').classList.remove('hide');
    }
    const new_item = CreateNewItem(event.target.value);
    items.push(new_item);
    if (state !== 2) {
      list.appendChild(new_item.node);
      refleshCount();
    }
    event.target.value = '';
    id++;
  }
});

all_button.addEventListener('click', event => {
  all_button.classList.add('selected');
  active_button.classList.remove('selected');
  completed_button.classList.remove('selected');
  state = 0;
  refleshList();
})

active_button.addEventListener('click', event => {
  all_button.classList.remove('selected');
  active_button.classList.add('selected');
  completed_button.classList.remove('selected');
  state = 1;
  refleshList();
})

completed_button.addEventListener('click', event => {
  all_button.classList.remove('selected');
  active_button.classList.remove('selected');
  completed_button.classList.add('selected');
  state = 2;
  refleshList();
})

clean.addEventListener('click', event => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isComplete === true) {
      items.splice(i, 1);
      i--;
    }
  }
  refleshList();
  setCleanButton();
  if (items.length === 0) {
    document.getElementById('todo-footer').classList.add('hide');
  }
})