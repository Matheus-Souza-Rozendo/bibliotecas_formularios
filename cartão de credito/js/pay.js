//vetores de inputs
let input_element = document.querySelectorAll("input");

//paragrafos para mostrar mensagem de erro
const erroCard = document.getElementById("erro-card");
const erroNome = document.getElementById("erro-nome");
const erroExpira = document.getElementById("erro-expira");
const erroCv = document.getElementById("erro-cv");

//formulario
const form = document.getElementById("card-form");

//inputs
const card = document.getElementById("card-number");
const nome = document.getElementById("name");
const expira = document.getElementById("expiry-date");
const cv = document.getElementById("security-code");

//vetor de paragrafos para mostrar mensagens de erro
let erros_element = [erroCard, erroNome, erroExpira, erroCv];
//variavel que armazena o estado do formulario (valido ou não)
let valido;


//validação do formulario ao enviar
form.addEventListener("submit", (event) => {
    event.preventDefault();
    validarCard(card,erroCard," ",3);
    validarCampo(nome,erroNome,"");
    validarCard(expira,erroExpira,"/",1);
    teste_data_mes_ano();
    validarCard(cv,erroCv,"",0);
    if(valido){
        form.submit();
    }
});


//validar inputs do tipo de cartão de credito
function validarCard(obj,local_do_erro,separador,numero_de_separadores){
    if(obj.validity.valueMissing){
        valido=false;
        setErromsg(local_do_erro, "Campo Obrigatório");
        }else{
            if(!validarNumber(obj,separador)){
                valido=false;
                 setErromsg(local_do_erro,"Digite apenas números");   
            }else{
                if (tooShort(obj)) {
                    valido=false;
                    setErromsg(local_do_erro, `O campo deve conter no mínimo ${obj.minLength-numero_de_separadores} números; você digitou apenas ${length(obj,separador)}`);
            }
        }
    }
}

//verica se o tamanho da entrada é menor do que o esperado
const tooShort = (obj)=>{
    if(obj.value.length<obj.minLength){
        return true;
    }
}

//verifica o tamanho da entrada para inputs do tipo cartão de credito
const length = (obj,separador)=>{
    var valores = obj.value.split(separador);
    var tamanho=0;
    for(let i=0;i<valores.length;i++){
        tamanho+=valores[i].length;
    }
    return tamanho
}

//valida se existe apenas numeros nos inputs do tipo cartão de credito
function validarNumber(obj,separador){
    var valores = obj.value.split(separador);
    const regex = /^[0-9]+$/
    for(let i=0;i<valores.length;i++){
        const isvalid = valores[i].length>0 && !regex.test(valores[i])
        if(isvalid){
            return false;
        }
    }
    return true;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// codigo reaproveitado de outros formularios

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//volta o formulario para valido caso  o usuario altere o valor do input
for (let i = 0; i < input_element.length; i++) {
    input_element[i].addEventListener("input", (event) => {
        valido = true;
        if (erros_element[i].classList.contains("erro")) {
            erros_element[i].removeAttribute("class");
            erros_element[i].textContent = "";
        }
        if(input_element[i].id == "card-number") {
            arrumarFormatoCard(event.inputType," ",card,4);
        }
        if(input_element[i].id == "expiry-date") {
            arrumarFormatoCard(event.inputType,"/",expira,2);
        }
    })
}

//arruma o formato dos inputs do tipo cartão de credito
function arrumarFormatoCard(tipo_de_entrada,separador,obj,tamanho_das_partes) {
    if (tipo_de_entrada != "deleteContentBackward"){
        var valores = obj.value.split(separador);
        for (let i = 0; i < valores.length; i++) {
            if (valores[i].length == tamanho_das_partes && i == valores.length - 1 && obj.value.length < obj.maxLength) {
                obj.value +=separador;
            }
        }
    }

}

card.addEventListener("blur",()=>{
    validarCard(card,erroCard," ",3);
})

nome.addEventListener("blur",()=>{
    validarCampo(nome,erroNome,"");
})

expira.addEventListener("blur",()=>{
    validarCard(expira,erroExpira,"/",1);
    console.log(valido);
    teste_data_mes_ano();
})

cv.addEventListener("blur",()=>{
    validarCard(cv,erroCv,"",0);
})

//testa se a data do tipo MM/AA foi inserida com valores validos de mes e ano
function teste_data_mes_ano(){
    if(valido){
        var valores = expira.value.split("/");
        mes = parseInt(valores[0]);
        ano = parseInt(valores[1]);
        const teste = (mes>=0)&&(mes<=12)&&(ano>=0)&&(ano<=99);
        if(!teste){
            valido=false;
            setErromsg(erroExpira,"Data inválida");
        }
    }
}