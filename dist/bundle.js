/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_WhatsAppController__ = __webpack_require__(1);


window.app = new __WEBPACK_IMPORTED_MODULE_0__controller_WhatsAppController__["a" /* WhatsAppController */]();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Format__ = __webpack_require__(2);


class WhatsAppController{

        constructor(){


            this.elementsPrototype();
            this.loadElements();
            this.initEvents();
        }

        //percorre os elementos html e retorna o padrao camelcase para facilitar
        //a localização dos eventos.
        loadElements(){

            this.el = {};
            document.querySelector(['id']).forEach(element=>{
                this.el[__WEBPACK_IMPORTED_MODULE_0__util_Format__["a" /* Format */].getCamelCase(element.id)] = element;
            });
        }
        //add novos metodos nas classes nativas Element e HTMLFormElement.
        elementsPrototype(){

            //o return this permite que as funçoes possam ser encadeadas
            Element.prototype.hide = function(){
                this.style.display = 'none';
                return this;
            }

            Element.prototype.show = function(){
                this.style.display = 'block';
                return this;
            }

            Element.prototype.toggle = function(){
                this.style.display = (this.style.display === 'none') ? 'block' : 'none';
                return this;
            }

            Element.prototype.on = function(events, fn) {
                events.split(' ').forEach(event=>{
                    this.addEventListener(event, fn);
                });
                return this;
            }

            Element.prototype.css = function(styles){
                for (let name in styles){
                    this.style[name] = styles[name];
                }
                return this;
            }

            Element.prototype.addClass = function(name){
                this.classList.add(name);
                return this;
            }

            Element.prototype.removeClass = function(name){
                this.classList.remove(name);
                return this;
            }

            Element.prototype.toggleClass = function(name){
                this.classList.toggle(name);
                return this;
            }

            Element.prototype.hasClass = function(name){
                return this.classList.contains(name);
            }

            //obtem os dados do input e retorna em formdata
            HTMLFormElement.prototype.getForm = function(){
                return new FormData(this);
            }

            //transforma os dados do formulario em um json
            HTMLFormElement.prototype.toJSON = function(){
                let JSON = {};

                this.getForm().forEach((value, key)=>{
                    json[key]=value;
                });

                return JSON;
            }
     
        }
        //inicia os eventos
        initEvents(){
            //---painel superior esquerdo---

            this.el.myPhoto.on('click', e=>{
                this.closeAllLeftPanel();
                this.el.panelEditProfile.show();
                //para dar tempo do elemento ser renderizado antes da animação
                setTimeout(()=>{
                    this.el.panelEditProfile.addClass('open');
                },300);
                
            });

            this.el.btnNewContact.on('click', e=>{
                this.closeAllLeftPanel();
                this.el.panelAddCotact.show();
                setTimeout(()=>{
                    this.el.panelAddCotact.addClass('open');
                },300);
            });

            this.el.btnClosePanelEditProfile.on('click', e=>{
                this.el.paneEditProfile.removeClass('open');
            });
            
            this.el.btnClosePanelAddContact.on('click', e=>{
                this.el.panelAddCotact.removeClass('open');
            });

            this.el.photoContainerEditProfile.on('click', e=>{
                this.el.inputProfilePhoto.click();
            });

            this.el.inputNamePanelEditProfile.on('keypress', e=>{
                if(e.key === 'Enter') {
                    e.preventDefaul();
                    this.el.btnSavePanelEditProfile.click();
                }
            });

            this.el.btnSavePanelEditProfile.on('click', e=>{
                console.log(this.el.inputNamePanelEditProfile.innerHTML);
            });

            this.el.formPanelAddContact.on('submit', e=>{
                e.preventDefaul();
                let formdata = new FormData(this.el.formPanelAddContact);
            });

            //dentro da lista busca a classe
            //clica no contato de mostra a lista de msg
            this.el.contactMessagesList.querySelectorAll('.contact-item').forEach(item=>{
                item.on('click', e=>{
                    //oculta a imagem de fundo quando abre a cvs
                    this.el.home.hide();
                    this.el.main.css({
                        display:'flex'
                    });
                });
            });

            //---botao anexar e suas opções---
            this.el.btnAttach.on('click', e=>{

                e.stopPropagation();
                this.el.menuAttach.addClass('open');
                document.addEventListener('click', this.closeMenuAttach.bind(this));
            });

            this.el.btnAttachPhoto.on('click', e=>{
                this.el.inputPhoto.click();
            });
            
            //permite selecionar e organizar varias fotos 
            this.el.inputPhoto.on('change', e=>{
                [...this.el.inputPhoto.files].forEach(file=>{
                    console.log(file);
                })
            })

            this.el.btnAttachCamera.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelCamera.addClass('open');
                //calcula a area q ira abrir a camera
                this.el.panelCamera.css({
                    'height':'cancelIdleCallback(100% - 120px)'
                });
            });

            this.el.btnClosePanelCamera.om('click', e=>{
                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();
            });

            this.el.btnTakePicture.on('click', e=>{
                console.log('tirar foto');
            });

            this.el.btnAttachDocument.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelDocumentPreview.addClass('open');
                //calcula a area q ira abrir a pre visualização do doc
                this.el.panelDocumentPreview.css({
                    'height':'cancelIdleCallback(100% - 120px)'
                });
                
            });

            this.el.btnClosePanelDocumentPreview.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();
            });

            this.el.btnAttachContact.on('click', e=>{
                this.el.modalContacts.show();
            });

            this.el.btnCloseModalContacts.on('click', e=>{
                this.el.modalContacts.hide();
            });

            //abre o gravador de audio
            this.el.btnSendMicrophone.on('click', e=>{
                this.closeRecordMicrophone();
                this.startRecordMicrophoneTime();
            });

            //cancela o audio
            this.el.btnCancelMicrophone.on('click', e=>{
                this.closeRecordMicrophone();
            });

            //concluir o audio
            this.el.btnFinishMicrophone.on('click', e=>{
                this.closeRecordMicrophone();
            });

            //verifica se a pessoa clicou Enter para enviar a msg
            this.el.inputText.on('keypress', e=>{
                
                if(e.key === 'Enter' && !e.ctrlKey){
                    e.preventDefaul();
                    this.el.btnSend.click();
                }
            });

            //oculta ou habilita o texto e icones do campo de digitar mensagem
            this.el.inputText.on('keyup', e=>{

                if(this.el.inputText.innerHTML.length){
                    this.el.inputPlaceholder.hide();
                    this.el.btnSendMicrophone.hide();
                    this.el.btnSend.show();
                }else{
                    this.el.inputPlaceholder.show();
                    this.el.btnSendMicrophone.show();
                    this.el.btnSend.hide();
                }
            });

            //enviar msg
            this.el.btnSend.on('click', e=>{

            });

            //abrir selecao de emoji
            this.el.btnEmojis.on('click', e=>{
                this.el.panelEmojis.toogleClass('open');
            });

            //seleciona o emoji no painel
            this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{
                emoji.on('click', e=>{
                    let img = this.el.imgEmojiDefault.cloneNode();

                    img.style.cssText = emoji.style.cssText;
                    img.dataset.unicode = emoji.dataset.unicode;
                    img.alt = emoji.dataset.unicode;

                    emoji.classList.forEach(name=>{
                        img.classList.add(name);
                    });

                    let cursor = window.getSelection();
                    
                    if(!cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                        this.el.inputText.focus();
                        cursor = window.getSelection();
                    }

                    let range = document.createRange();
                    range = cursor.getRangeAt(0);
                    range.deleteContents();

                    let frag = document.createDocumentFragment();
                    frag.appendChild(img);
                    range.insertNode(frag);
                    range.setStartAfter(img);

                    this.el.inputText.dispatchEvent(new Event('keyup'));
                });
            });
        }

        //inicia o cronometro do gravador de audio
        startRecordMicrophoneTime(){
            let start = Date.now();
            this._recordMicrophoneInterval = setInterval(()=>{
                this.el.startRecordMicrophoneTime.innerHTML = __WEBPACK_IMPORTED_MODULE_0__util_Format__["a" /* Format */].toTime(Date.now() - start);
            }, 100);
        }


        //fecha a gravação de audio
        closeRecordMicrophone(){
            this.el.recordMicrophone.show();
            this.el.btnSendmicrophone.hide();
            clearInterval(this._recordMicrophoneInterval);
        }
        //fecha qualquer painel q estiver aberto
        closeAllMainPanel(){
            this.el.panelMessagecontainer.hide();
            this.el.panelDocumentPreview.removeClass('open');
            this.el.panelCamera.removeClass('open');

        }

        //fecha o menu anexar
        closeMenuAttach(e){
            document.removeEventListener('click', this.closeMenuAttach);
            this.el.menuAttach.removeClass('open');
        }

        closeAllLeftPanel(){
            this.el.panelAddCotact.hide();
            this.el.paneEditProfile.hide();
        }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WhatsAppController;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Format{
    
    /**
         * @param {String} text Texto no padrão de id css. Ex.: #meu-id
         * @return {String} Texto formatado em camelCase.
         */
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;
        
        return Object.keys(div.firstChild.dataset)[0];
    }

    /**
     * @param {Date} duration 
     * @return {String} Hora formatada para 0:00:00 (se ouver horas) ou 0:00.
     */
    static toTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Format;


/***/ })
/******/ ]);