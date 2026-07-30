// Captura dos elementos gerados no front-end
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');
const botaoCopiar = document.querySelector('.botao-copiar');

// Estado inicial
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Eventos dos botões de controle de tamanho (+ e -)
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Atualiza em tempo real ao clicar nas caixas de seleção
for (let i = 0; i < checkbox.length; i++) {
	checkbox[i].onclick = geraSenha;
}

// Evento do botão de copiar
botaoCopiar.onclick = copiarSenha;

// Executa a primeira geração automática
geraSenha();

function diminuiTamanho() {
	if (tamanhoSenha > 1) {
    	tamanhoSenha--;
	}
	numeroSenha.textContent = tamanhoSenha;
	geraSenha();
}

function aumentaTamanho() {
	if (tamanhoSenha < 20) {
    	tamanhoSenha++;
	}
	numeroSenha.textContent = tamanhoSenha;
	geraSenha();
}

function geraSenha() {
	let alfabeto = '';
    
	if (checkbox[0].checked) alfabeto += letrasMaiusculas;
	if (checkbox[1].checked) alfabeto += letrasMinusculas;
	if (checkbox[2].checked) alfabeto += numeros;
	if (checkbox[3].checked) alfabeto += simbolos;

	if (alfabeto.length === 0) {
    	campoSenha.value = '';
    	valorEntropia.textContent = "Selecione pelo menos uma característica.";
    	forcaSenha.classList.remove('fraca', 'media', 'forte');
    	return;
	}

	let senha = '';
	for (let i = 0; i < tamanhoSenha; i++) {
    	let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
    	senha += alfabeto[numeroAleatorio];
	}
    
	campoSenha.value = senha;
	classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
	// Cálculo real utilizando a fórmula matemática de Entropia de Shannon
	let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
	forcaSenha.classList.remove('fraca', 'media', 'forte');

	if (entropia > 57) {
    	forcaSenha.classList.add('forte');
	} else if (entropia > 35 && entropia <= 57) {
    	forcaSenha.classList.add('media');
	} else if (entropia <= 35) {
    	forcaSenha.classList.add('fraca');
	}

	// Define a estimativa de tempo de quebra
	let diasParaQuebrar = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    
	if(diasParaQuebrar < 1) {
    	valorEntropia.textContent = "Um computador pode levar menos de 1 dia para descobrir essa senha.";
	} else {
    	valorEntropia.textContent = "Um computador pode levar até " + diasParaQuebrar.toLocaleString('pt-BR') + " dias para descobrir essa senha.";
	}
}

function copiarSenha() {
	if (campoSenha.value) {
    	navigator.clipboard.writeText(campoSenha.value);
    	alert("Senha copiada para a área de transferência!");
	}
}
