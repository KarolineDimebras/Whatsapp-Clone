class Format{
    
    //percorre os ids no html e retorna eles no padrão camelcase para que o js localize
    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = '<div data-${text}="id"></div>';

        return Object.keys(div.firstChild.dataset)[0];
    }
}