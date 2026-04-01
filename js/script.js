function addTask(){
    const container = document.getElementById("container");
    //captura o texto dentro da caixa de task
    const task = document.querySelector('#tarefas')
    const texto = task.value
    const taskDate = document.querySelector('#data')
    const data = taskDate.value
    if (task.value == "") {
        console.log("Campo vazio por favor insira alguma coisa")
        return
    } 
    
    // cria a div personalizada
    const card = document.createElement("div");
    card.classList.add("Task");
    card.innerHTML = `
        <p>`+  texto + ` ` + data +  `<p>`;
    // adiciona conteúdo dentro dela
    
    //Limpa o texto dentro da caixa de tasks
    clearField('#tarefas')
    clearField('#data')

    // pega o elemento de referência
    const referencia = document.getElementById("ref");

    // insere antes do elemento de referência
    container.insertBefore(card, referencia);


}
//Limpa o campo indicando o seletor
function clearField(selector){
    document.querySelector(selector).value = ""
}