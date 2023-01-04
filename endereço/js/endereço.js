//vetores de inputs
let input_element = document.querySelectorAll("input");

//paragrafos para mostrar mensagem de erro
const erroNome = document.getElementById("erro-nome");
const erroEndereco = document.getElementById("erro-endereco");
const erroCidade = document.getElementById("erro-cidade");

//formulario
const form = document.getElementById("endereco-form");

//inputs
const nome = document.getElementById("name");
const endereco = document.getElementById("endereco");
const cidade = document.getElementById("cidade");

//vetor de paragrafos para mostrar mensagens de erro
let erros_element = [erroNome, erroEndereco, erroCidade];
//variavel que armazena o estado do formulario (valido ou não)
let valido;

//validação do formulario ao enviar
form.addEventListener("submit", (event) => {
    event.preventDefault();
    validarCampo(nome,erroNome,"");
    validarCampo(endereco,erroEndereco,"");
    validarCampo(cidade,erroCidade,"");
    if(valido){
        form.submit();
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//função que valida um campo do formulario
function validarCampo(obj, lugar, msg) {
    if (!obj.validity.valid) {
        showErro(obj, lugar, msg);
        valido = false;
    }
}

//função que verifica o tipo de erro do input
function showErro(obj, p, formato) {
    if (obj.validity.valueMissing) {
        setErromsg(p, "Campo Obrigatório");
    } else {
        if (obj.validity.typeMismatch) {
            setErromsg(p, "Formato inválido" + formato);
        } else {
            if (obj.validity.tooShort) {
                setErromsg(p, `O campo deve conter no mínimo ${obj.minLength} caracteres; você digitou apenas ${obj.value.length}`);
            } else {
                if (obj.validity.tooLong) {
                    setErromsg(p, `O campo deve conter no maximo ${obj.maxLength} caracteres; você digitou ${obj.value.length}`);
                }
            }
        }
    }
}

//função que mostra na tela o erro do input no seu respectivo local
function setErromsg(p, msg) {
    p.textContent = msg;
    p.setAttribute("class", "erro");
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (let i = 0; i < input_element.length; i++) {
    input_element[i].addEventListener("input", (event) => {
        valido = true;
        if (erros_element[i].classList.contains("erro")) {
            erros_element[i].removeAttribute("class");
            erros_element[i].textContent = "";
        }
    })
}

nome.addEventListener("blur",()=>{
    validarCampo(nome,erroNome,"");
})

endereco.addEventListener("blur",()=>{
    validarCampo(endereco,erroEndereco,"");
})

cidade.addEventListener("blur",()=>{
    validarCampo(cidade,erroCidade,"");
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
