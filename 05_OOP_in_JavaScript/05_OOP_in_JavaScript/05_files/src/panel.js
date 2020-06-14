import {Dispatcher, Store} from './flux'
import {panelData} from './data'

const userNameEl = document.getElementById('userName')
const contentPage = document.getElementById('content-page')

const panelDispatcher = new Dispatcher();
const CHANGE_USERNAME = "CHANGE_USERNAME"
const CHANGE_FONTSIZE = "CHANGE_FONTSIZE"

const userNameUpdate = userName => ({
    type: CHANGE_USERNAME,
    payload: {userName}
});
const fontSizeUpdate = fontSize => ({
    type: CHANGE_FONTSIZE,
    payload: {fontSize}
});

class PanelStore extends Store {
    getInitialState(){
        return  localStorage['preference'] ? 
                JSON.parse(localStorage['preference']) : panelData;
    }
    onDispatch(action) {
        const {type, payload} = action;
        switch(type) {
            case CHANGE_USERNAME: 
                this.state.userName = payload.userName;
                break;
            case CHANGE_FONTSIZE: 
                this.state.fontSize = payload.fontSize;
                break;    
        }
        this.emitChange();
    }
}
const panelStore = new PanelStore(panelDispatcher);

document.addEventListener('input', handleChangeName);
document.addEventListener('change', handleChangeName);

function handleChangeName(e) {
    const {type, target} = e;
    switch(type) {
        case 'input':
            if(target.id !== "userNameInput") return;
           
            panelDispatcher.dispath(userNameUpdate(target.value))
            break;
        case 'change':
            if(target.name !== "fontSize") return;
            panelDispatcher.dispath(fontSizeUpdate(target.value))
    }
}


function render({userName, fontSize}){
    userNameEl.innerHTML = userName;
    contentPage.style.fontSize = fontSize === 'small'? '16px' : "22px";
    document.forms.fontSizeForm.fontSize.value = fontSize;  
    localStorage['preference'] = JSON.stringify({userName, fontSize})
}

render(panelStore.getState())
panelStore.addListener(render);
panelStore.addListener(state => console.log(state))

