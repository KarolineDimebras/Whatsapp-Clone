class WhatsAppController{

        constructor(){

            console.log('WhatsappController ok');

            this.loadElements();
        }

        //percorre os elementos html e retorna o padrao camelcase para facilitar
        //a localização dos eventos
        loadElements(){

            this.el = {};
            document.querySelector(['id']).forEach(element=>{
                this.el[FormData.getCamelcase(element.id)] = element;
            });
        }
    
}