(function () {
    const $ = q => document.querySelector(q);

    function renderArmario(){
        const armario = obterArmario();

        //add a chave na tabela
        armario.forEach(ck => addChaveNoArmario(ck))
    }

    function addChaveNoArmario(chave){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${chave.id}</td>
            <td>${chave.nome}</td>
            <td>${chave.solicitante}</td>
            <td data-time="${chave.time}">
                ${new Date(chave.time).toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })}
            </td>
            <td>
                <button class="delete">Devolver</button>
            </td>
        `;
        $("#armario").appendChild(row);

    };

    function devolver(info){
        const periodoEmprestimo = new Date() - new Date(info[3].dataset.time);

        const id = info[0].textContent; //obtem o valor na posiçao 0 da tabela

        console.log(periodoEmprestimo);

    }

    const obterArmario = () => {
        //consulta no local Storage do navegador e transforma em JSON
        return localStorage.armario ? JSON.parse(localStorage.armario) : [];
    }

    //atualiza a lista com a chave nova
    renderArmario();

    //pega o evento de click do botao
    $("#send").addEventListener("click", e => {
        
        //pega os valores digitados dentro dos campos
        const id = Math.ceil(Math.random() * Math.pow(10, 6)); //Cria um número aleatório do tamanho definido em size.
        const nome = $("#nome").value
        const solicitante = $("#solicitante").value

        //verifica se os campos nao estao vazios
        if(!nome || !solicitante){
            alert("Os campos  nao podem ser vazios!");
            return;
        }

        const chave = {id, nome, solicitante, time: new Date() }

        //consulta no local Storage do navegador e transforma em JSON
        const armario = obterArmario();
        armario.push(chave);

        //salva os dados no local storage
        localStorage.armario = JSON.stringify(armario);
        //console.log(armario);
        console.log(id);

        addChaveNoArmario(chave);


        //limpa os campos apos a insercao
        $("#nome").value = '';
        $("#solicitante").value = '';
    });

    //verifica qual o botao de x foi clicado
    $("#armario").addEventListener("click", e =>{
        if(e.target.className == "delete")
        //console.log(e.target.parentElement.parentElement.cells)
        //obtem as informaçoes das colunas
        devolver(e.target.parentElement.parentElement.cells)
    })

}) ();