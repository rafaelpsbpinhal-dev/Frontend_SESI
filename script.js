// MODAL
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// Fecha ao clicar no X
span.onclick = function () {
    modal.style.display = "none";
}

// Fecha ao clicar fora
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// NOTIFICAÇÃO
function mostrarNotificacao(texto) {
    const notificacao = document.getElementById("notificacao");

    notificacao.innerText = texto;
    notificacao.classList.add("show");

    setTimeout(() => {
        notificacao.classList.remove("show");
    }, 3000);
}

// SISTEMA
function executarSistema() {

    // dados de entrada
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    // dados de saída
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");
    const textoModal = document.getElementById("textoModal");

    // validação
    if (!nome || isNaN(idade) || isNaN(valor)) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // regra de negócio
    if (idade >= 16) {

        msg.innerText = `Venda autorizada: ${nome}`;
        msg.style.color = "#00ff88";

        let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

        // estoque
        let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
        lista.innerHTML = "";

        estoque.forEach(item => {
            let li = document.createElement("li");
            li.innerText = `Item ${item} reservado.`;
            lista.appendChild(li);
        });

        // relatório
        relatorio.style.display = "block";
        relatorio.innerHTML = `
            <strong>RESUMO DO PEDIDO</strong><br>
            Cliente: ${nome}<br>
            Total Original: R$ ${valor.toFixed(2)}<br>
            <strong>Total com desconto: R$ ${valorFinal.toFixed(2)}</strong>
        `;

        // notificação
        mostrarNotificacao(`✅ Venda de ${nome} concluída com sucesso!`);

        // modal
        textoModal.innerHTML = `
            <h3>Venda Concluída</h3>
            <p>Cliente: ${nome}</p>
            <p>Valor Final: R$ ${valorFinal.toFixed(2)}</p>
        `;

        modal.style.display = "block";

        // Limpeza dos campos (sua questão)
        document.getElementById("inputNome").value = "";
        document.getElementById("inputIdade").value = "";
        document.getElementById("inputValor").value = "";
        document.getElementById("inputCupom").value = "false"; 

        inputNome.focus();

    } else {

        msg.innerText = "Venda bloqueada: menor de 16 anos.";
        msg.style.color = "#ff4444";

        relatorio.style.display = "none";
        lista.innerHTML = "";

        inputNome.focus();
    }
}