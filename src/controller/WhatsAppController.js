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
            })


        }
        
        closeAllLeftPanel(){
            this.el.panelAddCotact.hide();
            this.el.paneEditProfile.hide();
        }
}