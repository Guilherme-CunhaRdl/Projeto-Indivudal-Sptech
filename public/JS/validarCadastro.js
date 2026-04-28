let erroCadastro = true
function cadastrar() {
    // aguardar();

    /*Validando pra ver se o cadastro ta tudo certo*/
    validarEmail();
    validarSenha();
    validarNome();
    if(erroCadastro == true){
      return;
    }

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function validarNome() {
    erroCadastro = false;
    var nomeVar = nome_input.value;

    let listaCaracEspecNome = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "¨",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "=",
        "+",
        "[",
        "]",
        "{",
        "}",
        ";",
        ":",
        "/",
        "?",
        ".",
        ",",
        "<",
        ">",
        "\\",
        "|",
        "'",
        '"',
        "`",
        "~",
        "^",
    ];

    nome_input.classList.remove("inputErro");

    if (nomeVar == "") {
        console.log("IFFFFFF");
        nome_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_nomeErro.innerHTML = "Campo Vazio";
        return;
    } else {
        ipt_nomeErro.innerHTML = "";
    }



    if (nomeVar.length <= 3) {
        nome_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_nomeErro.innerHTML =
            "Nome de usuario pequeno de mais(minimo: 4 caracteres)";
    } else if (nomeVar.length > 20) {
        nome_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_nomeErro.innerHTML =
            "Nome de usuario grande de mais(Maximo:20 caracteres)";
    }

    for (let i = 0; i < listaCaracEspecNome.length; i++) {
        if (nomeVar.includes(listaCaracEspecNome[i])) {
            nome_input.classList.add("inputErro");
            erroCadastro = true;
            ipt_nomeErro.innerHTML =
                "Nome de usuario não pode conter caracteres especiais";
            break;
        }
    }

    if (erroCadastro == true) {
        return;
    }
}



function validarEmail() {
    erroCadastro = false;
    let indiceDoArroba = 0;

    let listaCaracEspecEmail = [
        "!",
        "#",
        "$",
        "%",
        "¨",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "=",
        "+",
        "[",
        "]",
        "{",
        "}",
        ";",
        ":",
        "/",
        "?",
        ",",
        "<",
        ">",
        "\\",
        "|",
        "'",
        '"',
        "`",
        "~",
        "^",
    ];

    var emailVar = email_input.value;

    email_input.classList.remove("inputErro");

    if (emailVar == "") {
        email_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_emailErro.innerHTML = "Campo Vazio";
        return;
    } else {
        ipt_emailErro.innerHTML = "";
    }

    for (let i = 0; i < listaCaracEspecEmail.length; i++) {
        if (emailVar.includes(listaCaracEspecEmail[i])) {
            email_input.classList.add("inputErro");
            erroCadastro = true;
            ipt_emailErro.innerHTML =
                "Email não pode conter caracteres especiais alem de '@' e '.' ";
            break;
        }
    }

    if (erroCadastro == true) {
        return;
    }

    if(!emailVar.includes('@')){
        email_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_emailErro.innerHTML = "Email Precisa Conter o caractere '@' ";
        return;
    }

    if(!emailVar.includes('.')){
        email_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_emailErro.innerHTML = "Email Precisa Conter o caractere '.' ";
        return;
    }



    for(let i = 0; i< emailVar.length;i++){
        if(emailVar[i] == '@'){
            indiceDoArroba = i
        }
    }

    //Verifica se ta no inicio ou no final o @
    if (indiceDoArroba == 0 || indiceDoArroba == emailVar.length - 1){
        email_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_emailErro.innerHTML = "O '@' não pode ser no inicio ou no final do E-mail";
        return;
    }

    if (emailVar.indexOf(".") < indiceDoArroba){
        email_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_emailErro.innerHTML = "O caractere de '.' tem que vir apos o '@' ";
        return;
    }
    

}

function validarSenha() {
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    erroCadastro = false;

    senha_input.classList.remove("inputErro");
    confirmacao_senha_input.classList.remove("inputErro");


    if (senhaVar == "") {
        senha_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_senhaErro.innerHTML = "Campo Vazio";
        return;
    } else {
        ipt_senhaErro.innerHTML = "";
    }

    if (confirmacaoSenhaVar == "") {
        confirmacao_senha_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_confirmarSenhaErro.innerHTML = "Campo Vazio";
        return;
    } else {
        ipt_confirmarSenhaErro.innerHTML = "";
    }

    if (senhaVar != confirmacaoSenhaVar) {
        senha_input.classList.add("inputErro");
        confirmacao_senha_input.classList.add("inputErro");
        erroCadastro = true;
        ipt_confirmarSenhaErro.innerHTML = "Senhas não coincidem";
        ipt_senhaErro.innerHTML = "Senhas não coincidem";
        return;
    } else {
        ipt_confirmarSenhaErro.innerHTML = "";
        ipt_senhaErro.innerHTML = "";
    }


}