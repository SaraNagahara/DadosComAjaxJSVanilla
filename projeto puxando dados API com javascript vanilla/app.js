// Variáveis globais
var btnGravar = document.querySelector("#gravar");
var nome = document.querySelector("#nome");
var privilegio = document.querySelector("#privilegio");
var divErros = document.querySelector("#MsgErros");
var idEditando = null;
var btnLimpar = document.querySelector("#limpar");
var btnListar = document.querySelector("#listar");
var divIdUsuario = document.querySelector("#idUsuario"); 

listarFuncionarios()


// let url = `http://appwll.com.br/api/funcionarios`;

btnGravar.addEventListener("click", async function() {
  let formData = new FormData();
  formData.append("nome", nome.value);
  formData.append("privilegio", privilegio.value);

  if (idEditando) {

     await fetch(`http://appwll.com.br/api/funcionarios`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded" // diz ao servidor que o conteudo é html tradicional
      },
         body: new URLSearchParams({
                "id": idEditando, "nome": nome.value, 'privilegio': privilegio.value
            })
    });

  } else {
   
    await fetch(`http://appwll.com.br/api/funcionarios`, {
      method: 'POST',
      body: formData
    });
  }

  idEditando = null;
  divIdUsuario.classList.add("EscondeDiv");
  nome.value = "";
  privilegio.value = "";

  listarFuncionarios(); 
});


btnLimpar.addEventListener("click", function(){
    document.getElementById('linhas').innerHTML = "";
});

btnListar.addEventListener("click", function(){
  listarFuncionarios()
})

//Funcoes

function editarUsuario(id, nomePessoa, privilegioPessoa) {
    idEditando = id;
    divIdUsuario.classList.remove("EscondeDiv"); 
    divIdUsuario.innerHTML = `ID: ${idEditando}`; 
    nome.value = nomePessoa;
    privilegio.value = privilegioPessoa;
   
}

async function excluirUsuario(id) {
    if (confirm("Você tem certeza que deseja excluir esse usuário?")) {
        await fetch(`http://appwll.com.br/api/funcionarios/${id}`, {
            method: 'DELETE',
        });

        listarFuncionarios();
    }
}

async function listarFuncionarios(){
  let urlResponse = await fetch(`http://appwll.com.br/api/funcionarios`);
  let dadosFuncionarios = await urlResponse.json();

  let htmlTabela = '';
  dadosFuncionarios = dadosFuncionarios || [];

  dadosFuncionarios.forEach((funcionario) => {
    htmlTabela += "<tr>";
    htmlTabela += `<td class="table-primary">${funcionario.id}</td>`;
    htmlTabela += `<td class="table-primary">${funcionario.nome.toUpperCase()}</td>`;
    htmlTabela += `<td class="table-primary">${funcionario.privilegio_id}</td>`;
    htmlTabela += `<td class="table-primary">${funcionario.privilegio.toUpperCase()}</td>`;
    htmlTabela += `<td class="table-danger"><button type="button" class="btn btn-warning" onclick="editarUsuario('${funcionario.id}', '${funcionario.nome}', '${funcionario.privilegio}')">Editar</button> <button type="button" class="btn btn-danger" onclick="excluirUsuario(${funcionario.id})">Excluir</button></td>`;
    htmlTabela += "</tr>";
  });

  

  document.getElementById('linhas').innerHTML = htmlTabela;
}
