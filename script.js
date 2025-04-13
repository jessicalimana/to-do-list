// script.js

// Carrega tarefas salvas ao abrir a página
window.onload = function () {
    carregarTarefas();
  };
  
  function adicionarTarefa() {
    const input = document.getElementById('tarefa');
    const categoria = document.getElementById('categoria').value;
    const texto = input.value.trim();
  
    if (texto !== "") {
      criarTarefaNaTela(texto, false, categoria);
      salvarTarefa(texto, categoria);
      input.value = "";
    } else {
      alert("Por favor, digite uma tarefa.");
    }
  }
  
  
  function criarTarefaNaTela(texto, concluida = false, categoria = '') {
    const lista = document.getElementById('lista');
  
    const li = document.createElement('li');
    li.textContent = `${categoria ? `[${categoria}] ` : ''}${texto}`;
  
    li.onclick = function () {
      li.classList.toggle('concluida');
      atualizarStatus(texto);
    };
  
    if (concluida) {
      li.classList.add('concluida');
    }
  
    const botao = document.createElement('button');
    botao.textContent = "❌";
    botao.style.marginLeft = "10px";
    botao.onclick = function (e) {
      e.stopPropagation();
      li.remove();
      removerTarefa(texto);
    };
  
    li.appendChild(botao);
    lista.appendChild(li);
  }
  
  // Salva a tarefa no localStorage
  function salvarTarefa(texto, categoria) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push({ texto, concluida: false, categoria });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  // Remove a tarefa do localStorage
  function removerTarefa(tarefaTexto) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter(t => t.texto !== tarefaTexto);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  // Carrega as tarefas salvas
  function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
      criarTarefaNaTela(tarefa.texto, tarefa.concluida);
    });
  }
  function atualizarStatus(tarefaTexto) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.map(t => {
      if (t.texto === tarefaTexto) {
        return { texto: t.texto, concluida: !t.concluida };
      }
      return t;
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  