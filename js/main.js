'use strict'

const regExpPhone = /^((\+7|7|8)+([0-9]){10})$/;
const regExpName = /^[а-яА-ЯёЁa-zA-Z]+$/;
const regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const regExpTextarea = /\S/;

const formRegistration = document.querySelector("#form-registration");
const formQuestion = document.querySelector("#form-question");


const inputsRegistration = formRegistration.querySelectorAll("input");
const inputsQuestion = formQuestion.querySelectorAll("input");

const submitMessage = document.querySelector('.submit-form');
const submitMessageContent = submitMessage.querySelector('.submit-form__content');


let formObj = {};



formRegistration.addEventListener("submit", (event) => {
    event.preventDefault();
    
    formObj.id = formRegistration.id;

    examEmpty (inputsRegistration);
    lostFocus (inputsRegistration);

    sendForm (formObj, formRegistration);
});



formQuestion.addEventListener("submit", (even) => {
    even.preventDefault();
    
    formObj.id = formQuestion.id;

    examEmpty (inputsQuestion);
    lostFocus (inputsQuestion);

    sendForm (formObj, formQuestion);
});





function lostFocus (inputs) {
    inputs.forEach (input => {
        input.addEventListener('blur', () => {
            examEmpty (inputs);
        });

        input.addEventListener ('input', () => {
            deleteErrEmpty(input);
        });
    });    
}


function examEmpty (inputs){
    inputs.forEach (input => {
        if (input.value.length === 0){
            showErrEmpty (input);
            formObj = {};
        } else {
            examValue(input);
        };
    });
    
    
};


function examValue (input){
    
        if (input.name === "name-1") {
            if (regExpName.test(input.value)){
                formObj.nameValid = true;
            } else {
                input.classList.add('input-err');
                input.nextElementSibling.textContent = "Введите корректные данные";
                formObj.nameValid = false;
            };
        }; 
        
        if (input.name === "name-2") {
            if (regExpName.test(input.value)){
                formObj.surnameValid = true;
            } else {
                input.classList.add('input-err');
                input.nextElementSibling.textContent = "Введите корректные данные";
                formObj.surnameValid = false;
            };
        };    
    
    
        if (input.name === "tel") {
            if (regExpPhone.test(input.value)){
                formObj.phoneValid = true;
            } else {
                input.classList.add('input-err');
                input.nextElementSibling.textContent = "Неверный номер телефона";
                formObj.phoneValid = false;
            }
        };
    
    
        if (input.name === "email") {
            if (regExpEmail.test(input.value)){
                formObj.emailValid = true;
            } else {
                input.classList.add('input-err');
                input.nextElementSibling.textContent = "Введите корректный e-mail";
                formObj.emailValid = false;

            }
        };   

        if (input.name === "question") {
            if (regExpTextarea.test(input.value)){
                formObj.textareaValid = true;
            } else {
                input.classList.add('input-err');
                input.nextElementSibling.textContent = "Введите корректный вопрос";
                formObj.textareaValid = false;

            }
        }; 
        
        
};



function sendForm (formObj, form){

    const formObjValue = Object.values(formObj);

    const foundFalse = formObjValue.filter(el => el === false);
    const formObjLength = Object.keys(formObj).length;

    
    if ((formObjLength > 1) && (foundFalse.length === 0)){

        form.reset();
        showSubmitMessage(formObj); 
        formObj = {}; 
    } 
    
}




  

function showErrEmpty (input){
    input.classList.add('input-err');
    input.nextElementSibling.textContent = "Это поле обязательно для заполнения"
};


function deleteErrEmpty (input){
    input.classList.remove('input-err');
    input.nextElementSibling.textContent = '';
}; 




function showSubmitMessage (formObj){
    

    if (formObj.id === 'form-question'){
        submitMessageContent.innerText = 'Ваш вопрос успешно отправлен';
    } else {
        submitMessageContent.innerText = 'Ваши данные успешно отправлены';
    };

    submitMessage.classList.remove('dsp-none');

    closeSubmitMessage ();
    setTimeout (function(){
        submitMessage.classList.add('dsp-none');
    }, 2000);
}




function closeSubmitMessage (){
    submitMessage.addEventListener('click', () => {
        submitMessage.classList.add('dsp-none');
    })

    submitMessageContent.addEventListener('click', (event) =>{
        event.stopPropagation();
    })
}

