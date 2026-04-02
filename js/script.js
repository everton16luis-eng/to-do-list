function addTask() {
    const container = document.getElementById("container");
    const task = document.querySelector('#tarefas')
    const tarefa = task.value
    const taskDate = document.querySelector('#data').value
    const date = new Date(taskDate)
    const hoje = new Date()
    const usuario = "Fernanda Montenegro"
    prazo = date.toLocaleString("pt-BR")
    //verificações da regra de negocio
    if (task.value == "" || taskDate == "") {
        alert("Por favor preencha todos os campos!")
        return
    }
    if (date < hoje) {
        alert("Data limite deve ser maior que a data atual!")
        return
    }

    // cria a div personalizada
    const card = document.createElement("div");
    card.innerHTML =
        // adiciona conteúdo dentro dela
        ` <div class="Task">
        <div class="text">
            <p>` + tarefa + ` </p>
            <div class="traco"></div>
            <div class="responsavel">
                <p>Solicitado por: ` + usuario + `</p>
                <P>Prazo: ` + prazo + `</P>
            </div>
        </div>
        <div class="butons">
            <img class="confirm" width="20" height="20" src="css/img/icons/check.png" alt="Task Concluida"
                title="Task Concluida" onclick="concluir(this)">
                <img class="confirm" width="20" height="20" src="css/img/icons/remove.png" alt="Remover"
                    title="Remover Task" onclick="remover(this)">
                </div>
        </div>`
    armazenar(tarefa, usuario, prazo)
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

function armazenar(tarefa, usuario, prazo){
    const jsTarefa = {
        tarefa: tarefa,
        usuario: usuario,
        prazo: prazo,
    };
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push(jsTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}
function loadTarefas(){
    const atrasadas = document.getElementById("atrasadas");
    const agora = new Date()
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const referencia = document.getElementById("ref");
    tarefas.forEach(tarefa => {
         const card = document.createElement("div");
         console.log(agora.toLocaleString(), tarefa.prazo)
    card.innerHTML =
        // adiciona conteúdo dentro dela
        ` <div class="Task">
        <div class="text">
            <p>` + tarefa.tarefa + ` </p>
            <div class="traco"></div>
            <div class="responsavel">
                <p>Solicitado por: ` + tarefa.usuario + `</p>
                <P>Prazo: ` + tarefa.prazo + `</P>
            </div>
        </div>
        <div class="butons">
            <img class="confirm" width="20" height="20" src="css/img/icons/check.png" alt="Task Concluida"
                title="Task Concluida" onclick="concluir(this)">
                <img class="confirm" width="20" height="20" src="css/img/icons/remove.png" alt="Remover"
                    title="Remover Task" onclick="remover(this)">
                </div>
        </div>`
    
    // insere antes do elemento de referência
    if (tarefa.prazo > agora.toLocaleString() ){
        container.insertBefore(card, referencia);
    }else{
        atrasadas.insertBefore(card, referencia)

    }
    
    });
}

document.addEventListener("DOMContentLoaded",() =>{
    loadTarefas()
}
)