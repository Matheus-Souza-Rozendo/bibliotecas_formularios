let input_element = document.querySelectorAll("input");

const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const form=document.getElementById("login-form");
const email=document.getElementById("email");
const senha=document.getElementById("senha");

let erros_element = [erroEmail,erroSenha];
let valido;


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    validarCampo(email,erroEmail,"");
    validarCampo(senha,erroSenha,"");
    if(valido){
        form.submit();
    }
});

function validarCampo(obj,lugar,msg){
    if(!obj.validity.valid){
        showErro(obj,lugar,msg);
        valido=false;
    }
}

function showErro(obj,p,formato){
    if(obj.validity.valueMissing){
        setErromsg(p,"Campo Obrigatório");
    }else{
        if(obj.validity.typeMismatch){
            setErromsg(p,"Formato inválido"+formato);
        }else{
            if(obj.validity.tooShort){
                setErromsg(p,`O campo deve conter no mínimo ${obj.minLength} caracteres; você digitou apenas ${obj.value.length}`);
            }else{
                if(obj.validity.tooLong){
                    setErromsg(p,`O campo deve conter no maximo ${obj.maxLength} caracteres; você digitou ${obj.value.length}`);
                }
            }
        }
    }
}

function setErromsg(p,msg){
    p.textContent=msg;
    p.setAttribute("class","erro");
}

for(let i=0;i<input_element.length;i++){
    input_element[i].addEventListener("input", (event) => {
        valido=true;
        if(erros_element[i].classList.contains("erro")){
            erros_element[i].removeAttribute("class");
            erros_element[i].textContent="";
        }
    })
}


email.addEventListener("blur",()=>{
    validarCampo(email,erroEmail,"");
})

senha.addEventListener("blur",()=>{
    validarCampo(senha,erroSenha,"");
})