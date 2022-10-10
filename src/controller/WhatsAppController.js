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
                this.el[FormData.getCamelcase(element.id)] = element;
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
                console.log('camera');
            });

            this.el.btnAttachDocument.on('click', e=>{
                console.log('document');
            });

            this.el.btnAttachContact.on('click', e=>{
                console.log('contact');
            });




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