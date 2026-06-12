function executarSistema() {
    // dados de entrada 
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true"

    // dados de saída 
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");

    // validação para campos vazios 
    if (!nome || isNaN(idade) || isNaN(valor)) {
        alert("Por favor, peencha todos os campos!!");
        return;
    }

    //regra de negócios 
    if (idade >= 16) {
        msg.innerText = `Venda autorizada: ${nome}`;
        msg.style.color = "#00ff88";

        //desconto
        let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

        // estoque
        let estoque = ["placa de video", "processador", "memoria RAM"];
        lista.innerHTML = ""; // limpa a lista anterior

        // forEach:percorre um array e aplica uma ação para cada elemento
        estoque.forEach(item => {
            let li = document.createElement("li");
            li.innerText = `Item ${item} reservado.`;
            lista.appendChild(li); // usado para adicionar um novo elemento ou texto
        });

        //reatorio
        relatorio.style.display = "block";
        relatorio.innerHTML = `
        <strong> RESUMO DO PEDIDO <\strong><br>
        cliente: ${nome}<br>
        Total Original: R$ ${valor.toFixed(2)} <br>
        <strong> Total com descoto: R$ ${valorFinal.toFixed(2)} <\strong>
        `;

        // Limpeza dos campos (sua questão)
        document.getElementById("inputNome").value = "";
        document.getElementById("inputIdade").value = "";
        document.getElementById("inputValor").value = "";
        document.getElementById("inputCupom").value = "false"; 

    } else {
        msg.innerText = "Venda bloqueada: menor de 16 anos.";
        msg.style.color = "#f0f4444";
        relatorio.style.display = "none";
        lista.innerHTML = "";
    }
}