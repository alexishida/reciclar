/* 
   Reciclar Game v1.0 (beta)
   Autor: Alex Ishida
 */

/* Constantes*/
var tempo = 30;
var tempo_preparar = 3;

/* Variaveis */
var pontuacao = 0;
var maior_pontuacao = 0;
var total_lixos_gerados = 0;
var tempo_restante = 0;


var thread_tempo;

$(document).ready(function () {

    redimencionando();
    //changeViewportMeta();

    $('.lixeira').droppable({
        accept: '#lixos div',
        hoverClass: 'lixeira_selecionada',
        drop: acertouLixo
    });

});

$(window).resize(function () {
  //  redimencionando();
});

function iniciaPreparacao() {
    $('#mensagem_inicio').addClass('esconder');
    $('#mensagem_fim').addClass('esconder');
    $('#topo').removeClass('esconder');
    $('#preparar').removeClass('esconder');
    tempo_preparar = 3;
    $("#preparar").html('<p>Prepare-se...</p><h1>' + tempo_preparar + '</h1>');
    thread_tempo = setInterval(function () {
        preparacao()
    }, 1000);

}


function preparacao() {
    tempo_preparar--;

    if (tempo_preparar == 0) {
        $("#preparar").html('<p style="font-size:30px;">Valendo...</p>');
    }
    else {
        $("#preparar").html('<p>Prepare-se...</p><h1>' + tempo_preparar + '</h1>');
    }

    if (tempo_preparar < 0) {
        clearInterval(thread_tempo);
        tempo_preparar = 3;
        comecarJogo();
        return;
    }


}


function comecarJogo() {
    pontuacao = 0;
    mostrarPontuacao();
    
    $('.box').addClass('esconder');
    $('#topo').removeClass('esconder');
    $('#jogo').removeClass('esconder');
    geraLixo();
    iniciarContador();
}


function iniciarContador() {
    tempo_restante = tempo;
    $("#placar_tempo").html("<p>" + tempo_restante + "</p>");
    thread_tempo = setInterval(function () {
        verificaContador()
    }, 1000);
}

function verificaContador() {
    tempo_restante--;
    $("#placar_tempo").html("<p>" + tempo_restante + "</p>");

    if (tempo_restante <= 0) {
        terminarContador();
        fimJogo();
    }
}

function terminarContador() {
    clearInterval(thread_tempo);
    tempo_restante = tempo;
}


function fimJogo() {

    if (maior_pontuacao < pontuacao) {
        maior_pontuacao = pontuacao;
        $("#placar_melhor").html("<p>" + maior_pontuacao + "</p>");
    }

    $('#mensagem_fim').removeClass('esconder');
    $('#jogo').addClass('esconder');

    pontuacao = 0;
}


function redimencionando() {
    //  $("body").css("width",$(window).width()+"px");
    // $("body").css("height",$(window).height()+"px");

}


// Em teste
//$(window).bind('orientationchange', changeViewportMeta);
function changeViewportMeta() {

    if ($(window).width() <= 320) {
        $('meta[name=viewport]').attr('content', 'width='+$(window).width()+', ,user-scalable=no, initial-scale=0.25');
    } else if ($(window).width() <= 480) {
        $('meta[name=viewport]').attr('content', 'width='+$(window).width()+', ,user-scalable=no, initial-scale=0.3');
    } else if ($(window).width() <= 768) {
        $('meta[name=viewport]').attr('content', 'width='+$(window).width()+', ,user-scalable=no, initial-scale=0.35');
    } else if ($(window).width() <= 900) {
        $('meta[name=viewport]').attr('content', 'width='+$(window).width()+', ,user-scalable=no, initial-scale=0.4');
    }
    else {
        $('meta[name=viewport]').attr('content', 'width=device-width, ,user-scalable=no, initial-scale=1');
    }

     alert($(window).width()+" | " + $(window).height());
}




function geraLixo() {
    total_lixos_gerados++;
    var id_lixo = 'lixo-' + total_lixos_gerados;
    var tipo_lixo = lixoAleatorio();
    var dados = '<div id="' + id_lixo + '" data-tipo-lixo="' + tipo_lixo + '" class="lixo lixo_' + tipo_lixo + '"></div>';
    $('#lixos').html(dados);
    posicaoAleatoria(id_lixo);
    $('#' + id_lixo).draggable({
        //containment: 'body',
        cursor: 'move',
        revert: true
    });
}


function posicaoAleatoria(id) {
    var max_width = 700;
    var min_height = 75;

    var left = Math.floor(Math.random() * (max_width - 0 + 1)) + 0;
    var top = Math.floor(Math.random() * (min_height - 0 + 1)) + 0;

    $('#' + id).css('left', left);
    $('#' + id).css('top', top);
}


function lixoAleatorio() {
    var valor = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

    var tipo_lixo = [
        "papel",
        "plastico",
        "vidro",
        "metal",
        "organico"];

    return tipo_lixo[valor];
}


function removeLixo() {
    $(".lixo").draggable("destroy");
    $('#lixos').html("");
}


function acertouLixo(event, ui) {

    var tipo_lixo = ui.draggable.attr("data-tipo-lixo");
    var classe_busca = "lixeira_" + tipo_lixo;

    // Verifica se é o lixo correto
    if ($(this).hasClass(classe_busca)) {
        somaPontuacao();
        removeLixo();
        geraLixo();
    }

}


function somaPontuacao() {
    pontuacao++;
    $("#placar_reciclagem").html("<p>" + pontuacao + "</p>");
}

function mostrarPontuacao() {
    $("#placar_reciclagem").html("<p>" + pontuacao + "</p>");
}