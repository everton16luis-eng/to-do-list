function addTask() {
    const container = document.getElementById("container");
    //captura o texto dentro da caixa de task
    const task = document.querySelector('#tarefas')
    const texto = task.value
    const taskDate = document.querySelector('#data').value
    const date = new Date(taskDate)
    data = date.toLocaleString("pt-BR")
    const Solicitado = "Fernanda Montenegro"
    if (task.value == "" || taskDate == "") {
        alert("Por favor preencha todos os campos!")
        return
    }

    // cria a div personalizada
    const card = document.createElement("div");
    card.innerHTML =
        // adiciona conteúdo dentro dela
        ` <div class="Task">
        <div class="text">
            <p>` + texto + ` </p>
            <div class="traco"></div>
            <div class="responsavel">
                <p>Solicitado por: ` + Solicitado + `</p>
                <P>Prazo: ` + data + `</P>
            </div>
        </div>
        <div class="butons">
            <img class="confirm" width="20" height="20" src="css/img/icons/check.png" alt="Task Concluida"
                title="Task Concluida" onclick="concluir(this)">
                <img class="confirm" width="20" height="20" src="css/img/icons/remove.png" alt="Remover"
                    title="Remover Task" onclick="remover(this)">
                </div>
        </div>`

    //Limpa o texto dentro do input de tasks
    clearField('#tarefas')
    clearField('#data')

    // pega o elemento de referência
    const referencia = document.getElementById("ref");

    // insere antes do elemento de referência
    container.insertBefore(card, referencia);


}
//Limpa o campo indicando o seletor
function clearField(selector) {
    document.querySelector(selector).value = ""
}
//Muda a tarefa para a area designada para tarefas concluidas
function concluir(botao) {
  const tarefa = botao.closest(".Task");

  const listaConcluidas = document.getElementById("concluidas");

  listaConcluidas.appendChild(tarefa);
  
}

//Remove a tarefa programada
function remover(botao) {
  botao.closest(".Task").remove();
  const tarefa = botao.closest(".Task");

  const listaConcluidas = document.getElementById("removidas");

  listaConcluidas.appendChild(tarefa);
}