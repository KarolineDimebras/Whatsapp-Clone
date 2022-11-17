
class WhatsAppController{

    constructor(){
        console.log('WhatsAppController ok');

        this.initAuth();
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        
    }

    initAuth(){
        this._firebase.initAuth()
        .then(response=>{
            console.log('response', response);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    loadElements(){

        this.el = {};
        document.querySelectorAll('[id]').forEach(element=>{
            this.el[Format.getCamelcase(element.id)] = element;
        });
    }

    elementsPrototype(){

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

        HTMLFormElement.prototype.getForm = function (){
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function (){
           let json = {};
           this.getForm().forEach((value,key)=>{
                json[key] = value;
           });

           return json;
        }
    }

    initEvents(){

        
        this.el.myPhoto.on('click', e=>{
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            },300);

        });

        this.el.btnNewContact.on('click', e=>{
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            },300);
        });

        this.el.btnClosePanelEditProfile.on('click', e=>{
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e=>{
            this.el.panelAddContact.removeClass('open');
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
            this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
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
            
            //anexar foto
            this.el.btnAttachPhoto.on('click', e=>{
                this.el.inputPhoto.click();
            });

            //permite selecionar e organizar varias fotos 
            this.el.inputPhoto.on('change', e=>{
                [...this.el.inputPhoto.files].forEach(file=>{
                    console.log(file);
                })
            })

            //camera
            this.el.btnAttachCamera.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelCamera.addClass('open');
                //calcula a area q ira abrir a camera
                this.el.panelCamera.css({
                    'height':'calc(100% - 120px)'
                });

                this._camera = new CameraController(this.el.videoCamera);
            });

            this.el.btnClosePanelCamera.on('click', event => {

                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();
                this._camera.stop();
    
            });
    
            this.el.btnTakePicture.on('click', event => {
                let dataUrl = this._camera.takePicture();

                this.el.pictureCamera.src = dataUrl;
                this.el.pictureCamera.show();
                this.el.videoCamera.hide();
                this.el.btnReshootPanelCamera.show();
                this.el.containerTakePicture.hide();
                this.el.containerSendPicture.show();

            });

            this.el.btnReshootPanelCamera.on('click', e=>{
                
                this.el.pictureCamera.hide();
                this.el.videoCamera.show();
                this.el.btnReshootPanelCamera.hide();
                this.el.containerTakePicture.show();
                this.el.containerSendPicture.hide();
            });

            this.el.btnSendPicture.on('click', e=>{

            });

            //documento
            this.el.btnClosePanelDocumentPreview.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();
            });

            this.el.btnAttachDocument.on('click', e=>{
                this.closeAllMainPanel();
                this.el.panelDocumentPreview.addClass('open');
                //calcula a area q ira abrir a pre visualização do doc
                this.el.panelDocumentPreview.css({
                    'height':'cancelIdleCallback(100% - 120px)'
                });
            });

            this.el.btnSendDocument.on('click', event => {
    
            });

            //enviar contato
            this.el.btnAttachContact.on('click', e=>{
                this.el.modalContacts.show();
            });

            this.el.btnCloseModalContacts.on('click', e=>{
                this.el.modalContacts.hide();
            });

            //abre o gravador de audio
            this.el.btnSendMicrophone.on('click', e=>{
                this.el.recordMicrophone.show();
                this.el.btnSendMicrophone.hide();


                this._microphoneController = new MicrophoneController();

                this._microphoneController.on('ready', toca=>{
                    console.log('recebi o play');

                    this._microphoneController.startRecorder();
                });

                this._microphoneController.on('recordtimer', timer=>{
                    this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
                });

            });
    
            //cancela o audio
            this.el.btnCancelMicrophone.on('click', e=>{
                this._microphoneController.stopRecorder();
                this.closeRecordMicrophone();
            });
    
            //concluir o audio
            this.el.btnFinishMicrophone.on('click', e=>{
                this._microphoneController.stopRecorder();
                this.closeRecordMicrophone();
            });

             //campo de escrever mensagem
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
                this.el.panelEmojis.toggleClass('open');
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

    //fecha a gravação de audio
    closeRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        
    }

     //fecha qualquer painel q estiver aberto
    closeAllMainPanel(){
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }

    closeAllLeftPanel(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}