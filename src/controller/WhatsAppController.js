class WhatsAppController{

        constructor(){

            console.log('WhatsappController ok');

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
        }
        
        closeAllLeftPanel(){
            this.el.panelAddCotact.hide();
            this.el.paneEditProfile.hide();
        }
}