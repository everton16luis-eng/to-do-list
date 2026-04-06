function addTask() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const container = document.getElementById("container");
    const task = document.querySelector('#tarefas')
    const tarefa = task.value
    const taskDate = document.querySelector('#data').value
    const date = new Date(taskDate)
    const hoje = new Date()
    const usuario = "Fernanda Montenegro"
    const existe = tarefas.some(t => t.tarefa.trim().toLowerCase() === tarefa.trim().toLowerCase());
    prazo = date.toLocaleString("pt-BR")


    //verificações da regra de negocio
    if (!Array.isArray(tarefas)) tarefas = [];
    if (task.value == "" || taskDate == "") {
        alert("Por favor preencha todos os campos!")
        return
    }
    if (date < hoje) {
        alert("Data limite deve ser maior que a data atual!")
        return
    }


    if (existe) {
        alert("Essa tarefa já existe!");
        return; 
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
    const tarefaEl = botao.closest(".Task");
    const listaConcluidas = document.getElementById("concluidas");
    listaConcluidas.appendChild(tarefaEl);
    const texto = tarefaEl.querySelector('.text p').textContent.trim();
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    const index = tarefas.findIndex(t => t.tarefa === texto);
    if (index !== -1) {
        tarefas[index].concluida = true;
        tarefas[index].excluida = false;
        tarefas[index].atrasada = false;
        tarefas[index].dataConclusao = new Date().toLocaleString("pt-BR");
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
}
//Remove a tarefa programada
function remover(botao) {
    const tarefaEl = botao.closest(".Task");
    const listaConcluidas = document.getElementById("removidas");
    listaConcluidas.appendChild(tarefaEl);
    const texto = tarefaEl.querySelector('.text p').textContent.trim();
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    const index = tarefas.findIndex(t => t.tarefa === texto);
    if (index !== -1) {
        tarefas[index].concluida = false;
        tarefas[index].excluida = true;
        tarefas[index].atrasada = false;
        tarefas[index].dataConclusao = new Date().toLocaleString("pt-BR");
        tarefas[index].dataExclusao = new Date().toLocaleString("pt-BR");
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
}

function armazenar(tarefa, usuario, prazo){
    const jsTarefa = {
        tarefa: tarefa,
        usuario: usuario,
        prazo: prazo,
        dataConclusao: "",
        dataExclusao: "",
        concluida: false,
        excluida: false,
        atrasada: false

    };
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push(jsTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}
function loadTarefas(){
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
                <p class="conclusao">Data de Conclusão: ` + tarefa.dataConclusao + `</p>
                <p class="exclusao">Data de Exclusão: ` + tarefa.dataExclusao + `</p>
                <P class="prazo">Prazo: ` + tarefa.prazo + `</p>
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
        if(tarefa.concluida){
            const listaConcluidas = document.getElementById("concluidas");
            listaConcluidas.appendChild(card);
        } else if(tarefa.excluida){
            const listaRemovidas = document.getElementById("removidas");
            listaRemovidas.appendChild(card);
        } else if(tarefa.prazo < agora.toLocaleString("pt-BR") && !tarefa.concluida){
            const listaAtrasadas = document.getElementById("atrasadas");
            listaAtrasadas.appendChild(card);
        }
        else{
            container.insertBefore(card, referencia);
        }
    });
}

document.addEventListener("DOMContentLoaded",() =>{
    loadTarefas()
}
)