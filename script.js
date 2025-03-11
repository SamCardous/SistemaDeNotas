document.getElementById('calcularButton').addEventListener('click', function() {
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const reposicao = parseFloat(document.getElementById('reposicao').value);

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        exibirResultado("Por favor, insira notas válidas entre 0 e 10.", 'erro');
        return;
    }

    if (!isNaN(reposicao) && (reposicao < 0 || reposicao > 10)) {
        exibirResultado("A nota de reposição deve ser um valor válido entre 0 e 10, ou deixe em branco.", 'erro');
        return;
    }

    let notas = [nota1, nota2, nota3];
    let mediaFinal;

    if (!isNaN(reposicao)) {
        let menorNota = Math.min(...notas);
        let indexMenorNota = notas.indexOf(menorNota);
        if (reposicao > menorNota && menorNota < 7) {
            notas[indexMenorNota] = reposicao;
        }
    }

    mediaFinal = (notas[0] + notas[1] + notas[2]) / 3;
    mediaFinal = parseFloat(mediaFinal.toFixed(2));

    let mensagemResultado = "";
    let classeResultado = "";

    if (mediaFinal >= 7) {
        mensagemResultado = "Aprovado(a) diretamente com média " + mediaFinal + ". Parabéns!";
        classeResultado = "aprovado";
    } else if (mediaFinal < 5) {
        mensagemResultado = "Reprovado(a) diretamente com média " + mediaFinal + ".";
        classeResultado = "reprovado";
    } else {
        mensagemResultado = "Necessita de Prova Final. Média " + mediaFinal + ".";
        classeResultado = "prova-final";

        
        const notaProvaFinalNecessaria = (12 - mediaFinal);
        mensagemResultado += "<br>Nota necessária na Prova Final: " + notaProvaFinalNecessaria.toFixed(2) + ".";
    }

    exibirResultado(mensagemResultado, classeResultado);
});

function exibirResultado(mensagem, tipo) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (tipo === 'erro') {
        const erroParagrafo = document.createElement('p');
        erroParagrafo.className = 'erro-mensagem';
        erroParagrafo.textContent = mensagem;
        resultadoDiv.appendChild(erroParagrafo);
    } else {
        const mensagemParagrafo = document.createElement('p');
        mensagemParagrafo.className = 'resultado-mensagem ' + tipo;
        mensagemParagrafo.innerHTML = mensagem;
        resultadoDiv.appendChild(mensagemParagrafo);

        const tituloResultado = document.createElement('h2');
        tituloResultado.textContent = "Resultado:";
        resultadoDiv.insertBefore(tituloResultado, mensagemParagrafo);
    }
}