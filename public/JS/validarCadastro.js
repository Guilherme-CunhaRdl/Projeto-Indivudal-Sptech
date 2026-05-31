function cadastrar() {

    if (!validarFormulario()) {
        return;
    }

    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    var fotoVar = iptFoto.files[0];

    let formData = new FormData();

    formData.append("nomeServer", nomeVar);
    formData.append("emailServer", emailVar);
    formData.append("senhaServer", senhaVar);

    // Só envia a foto se o usuário escolher uma
    if (fotoVar) {
        formData.append("foto", fotoVar);
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formData
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(function () {
                    window.location = "./login.html";
                }, 1000);

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

function validarFormulario() {
    let erro = false;

    if (!validarNome()) erro = true;
    if (!validarEmail()) erro = true;
    if (!validarSenha()) erro = true;

    return !erro;
}

function validarNome() {
    var nomeVar = nome_input.value.trim();

    let listaCaracEspecNome = [
        "!", "@", "#", "$", "%", "¨", "&", "*", "(", ")",
        "-", "_", "=", "+", "[", "]", "{", "}", ";", ":",
        "/", "?", ".", ",", "<", ">", "\\", "|", "'", '"',
        "`", "~", "^"
    ];

    nome_input.classList.remove("inputErro");

    if (nomeVar == "") {
        nome_input.classList.add("inputErro");
        ipt_nomeErro.innerHTML = "Campo vazio";
        return false;
    }

    if (nomeVar.length < 4) {
        nome_input.classList.add("inputErro");
        ipt_nomeErro.innerHTML = "Nome deve ter no mínimo 4 caracteres";
        return false;
    }

    if (nomeVar.length > 20) {
        nome_input.classList.add("inputErro");
        ipt_nomeErro.innerHTML = "Nome deve ter no máximo 20 caracteres";
        return false;
    }

    for (let i = 0; i < listaCaracEspecNome.length; i++) {
        if (nomeVar.includes(listaCaracEspecNome[i])) {
            nome_input.classList.add("inputErro");
            ipt_nomeErro.innerHTML = "Nome não pode conter caracteres especiais";
            return false;
        }
    }

    ipt_nomeErro.innerHTML = "";
    return true;
}

function validarEmail() {
    var emailVar = email_input.value.trim();

    let listaCaracEspecEmail = [
        "!", "#", "$", "%", "¨", "&", "*", "(", ")",
        "-", "_", "=", "+", "[", "]", "{", "}", ";", ":",
        "/", "?", ",", "<", ">", "\\", "|", "'", '"',
        "`", "~", "^"
    ];

    email_input.classList.remove("inputErro");

    if (emailVar == "") {
        email_input.classList.add("inputErro");
        ipt_emailErro.innerHTML = "Campo vazio";
        return false;
    }

    for (let i = 0; i < listaCaracEspecEmail.length; i++) {
        if (emailVar.includes(listaCaracEspecEmail[i])) {
            email_input.classList.add("inputErro");
            ipt_emailErro.innerHTML =
                "Email só pode conter '@' e '.' como caracteres especiais";
            return false;
        }
    }

    if (!emailVar.includes("@")) {
        email_input.classList.add("inputErro");
        ipt_emailErro.innerHTML = "Email precisa conter '@'";
        return false;
    }

    if (!emailVar.includes(".")) {
        email_input.classList.add("inputErro");
        ipt_emailErro.innerHTML = "Email precisa conter '.'";
        return false;
    }

    let indiceDoArroba = emailVar.indexOf("@");

    if (
        indiceDoArroba == 0 ||
        indiceDoArroba == emailVar.length - 1
    ) {
        email_input.classList.add("inputErro");
        ipt_emailErro.innerHTML =
            "O '@' não pode estar no início ou no final";
        return false;
    }

    ipt_emailErro.innerHTML = "";
    return true;
}

function validarSenha() {
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    senha_input.classList.remove("inputErro");
    confirmacao_senha_input.classList.remove("inputErro");

    if (senhaVar == "") {
        senha_input.classList.add("inputErro");
        ipt_senhaErro.innerHTML = "Campo vazio";
        return false;
    }

    if (confirmacaoSenhaVar == "") {
        confirmacao_senha_input.classList.add("inputErro");
        ipt_confirmarSenhaErro.innerHTML = "Campo vazio";
        return false;
    }

    if (senhaVar.length < 6) {
        senha_input.classList.add("inputErro");
        ipt_senhaErro.innerHTML = "Senha deve ter no mínimo 6 caracteres";
        return false;
    }

    if (senhaVar != confirmacaoSenhaVar) {
        senha_input.classList.add("inputErro");
        confirmacao_senha_input.classList.add("inputErro");

        ipt_senhaErro.innerHTML = "Senhas não coincidem";
        ipt_confirmarSenhaErro.innerHTML = "Senhas não coincidem";

        return false;
    }

    ipt_senhaErro.innerHTML = "";
    ipt_confirmarSenhaErro.innerHTML = "";

    return true;
}

function previewImagem() {
    var arquivo = iptFoto.files[0];

    if (!arquivo) {
        preview.src = "./assets/calcifer.png";
        return;
    }

    preview.src = URL.createObjectURL(arquivo);
}