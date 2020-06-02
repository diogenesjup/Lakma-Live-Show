const player = new Plyr('#player', {
  title: 'Peeling de cristal líquido: Inovação e exclusividade para o tratamento de qualquer tipo de manchas',
});

var urlApi = "https://beautyconnect.com.br/api/";

testeApi();



// TESTAR ATIVIDADE API
function testeApi(){
   
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"v1/testeapi",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c VERIFICAÇÃO DE DISPONIBILIDADE DE API","background:#ff0000;color:#fff;");
                  console.log(dados);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (apiAtiva)");
                   console.log(dados);

              });
              // FINAL CHAMADA AJAX

}


function verifyAccess(){

  var emailAccess = $("#emailAccess").val();

  $("#btnAcess").html('PROCESSANDO...');

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"v1/lakma-verifyAccess",
                  data:{emailAccess:emailAccess}
              
              })
              request.done(function (dados) {            

                  console.log("%c DADOS DE RETORNO ACESSO:","background:#ff0000;color:#fff;");
                  console.log(dados);

                  if(dados.sucesso=="200"){

                     $(".modal-acesso").fadeOut("500");
                     $("#btnAcess").html('PROCESSANDO...');
                     localStorage.setItem("accessGranted","sim");
                     localStorage.setItem("nomeLogado",dados.nome);
                     localStorage.setItem("sobreNomeLogado",dados.sobrenome);
                     localStorage.setItem("emailLogado",dados.email);
                     fnComentarios();
                     setInterval("fnComentarios()",8000);
                  
                  }else{
                    $("#retorno").html('<div class="alert alert-danger" role="alert">E-mail <b>não localizado</b>. Verifique as informações inseridas e tente novamente.</div>');
                  
                    $("#btnAcess").html('ACESSAR LAKMA LIVE SHOW');
                  
                  }

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (verifyAccess)");
                   console.log(dados);

              });
              // FINAL CHAMADA AJAX



}

function fnComentarios(){
    
    $("#caixaDasMensagensInternas").append('<div class="load-wrapp"> <div class="load-10"> <p>Carregando novos comentários</p><div class="bar"></div></div></div>');

    // FORÇAR A DIV DAS MENSAGENS A FICAR NA PARTE DE BAIXO
    var objDiv = document.getElementById("caixaDasMensagensInternas");
    objDiv.scrollTop = objDiv.scrollHeight;


              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"v1/lakma-comentarios",
                  //data:{emailAccess:emailAccess}
              
              })
              request.done(function (dados) {            

                  console.log("%c DADOS DE RETORNO ACESSO:","background:#ff0000;color:#fff;");
                  console.log(dados);

                  if(dados.sucesso=="200"){

                    // ALIMENTANDO HTML
                     $("#caixaDasMensagensInternas").html("");

                    for(var i = 0;i<dados.comentarios.length;i++){
                       $("#caixaDasMensagensInternas").append('<div class="row linha-comentario comentario-ident-18"> <div class="col-3"> <div class="foto-perfil-comentario" style="background:url(\'images/profile.png\') #000 no-repeat;background-size:cover;background-position:center center;">&nbsp;</div></div><div class="col-9"> <div class="balao-comentario"><b>'+dados.comentarios[i].nome+'</b><br>'+dados.comentarios[i].comentario+'</div><div class="meta-comentario text-right"></div></div></div>')
                    }
                     
                  }else{
                     
                     // NENHUM COMENTÁRIO NOVO
                     $(".load-wrapp").remove();
                  
                  }

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (fnComentarios)");
                   console.log(dados);

                   // API INDISPONÍVEL
                   $(".load-wrapp").remove();

              });
              // FINAL CHAMADA AJAX


              // FORÇAR A DIV DAS MENSAGENS A FICAR NA PARTE DE BAIXO
              var objDiv = document.getElementById("caixaDasMensagensInternas");
              objDiv.scrollTop = objDiv.scrollHeight;

}


function sendComentarios(){

  var comentario = $("#comentario").val();
  var nome = localStorage.getItem("nomeLogado");
  var sobrenome = localStorage.getItem("sobreNomeLogado");

  if(comentario!=""){

  $("#comentario").val("");

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"v1/lakma-enviar-comentarios",
                  data:{comentario:comentario,nome:nome,sobrenome:sobrenome}
              
              })
              request.done(function (dados) {            

                  console.log("%c DADOS DE RETORNO ACESSO:","background:#ff0000;color:#fff;");
                  console.log(dados);

                  $("#caixaDasMensagensInternas").append('<div class="row linha-comentario comentario-ident-18"> <div class="col-3"> <div class="foto-perfil-comentario" style="background:url(\'images/profile.png\') #000 no-repeat;background-size:cover;background-position:center center;">&nbsp;</div></div><div class="col-9"> <div class="balao-comentario"><b>'+nome+' '+sobrenome+'</b><br>'+comentario+'</div><div class="meta-comentario text-right"></div></div></div>')
                  // FORÇAR A DIV DAS MENSAGENS A FICAR NA PARTE DE BAIXO
                  var objDiv = document.getElementById("caixaDasMensagensInternas");
                  objDiv.scrollTop = objDiv.scrollHeight;


              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (sendComentarios)");
                   console.log(dados);
                  

              });
              // FINAL CHAMADA AJAX


              // FORÇAR A DIV DAS MENSAGENS A FICAR NA PARTE DE BAIXO
              var objDiv = document.getElementById("caixaDasMensagensInternas");
              objDiv.scrollTop = objDiv.scrollHeight;
  }

}


// ANCORA DO MENU (ANCORA)
$(function() {
  $('.menu-side nav ul li a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 300
        }, 1000); fecharSideMenu();
        return false;
      }
    }
  });
});

// ANCORA DO MENU (ANCORA)
$(function() {
  $('.toggles nav ul li a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 100
        }, 1000); fecharSideMenu();
        return false;
      }
    }
  });
});
// ANCORA DO MENU (ANCORA)
$(function() {
  $('a.leve-me-ingressos').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 100
        }, 1000); fecharSideMenu();
        return false;
      }
    }
  });
});






// MENU FIXO NAS PÁGINAS INTERNA
jQuery(document).ready(function ($) {

  var entreiAnimateNumber = 0;

  $(window).scroll(function(){


    var scroll = $(window).scrollTop();

    if (scroll < 450){
        $("header.header-fixo").css("top","-300px");
        //$(".call-to-action").css("position","relative");
        //$(".call-to-action").css("z-index","998");

        entreiAnimateNumber = 0;
     }

    if (scroll > 450){
        $("header.header-fixo").css("top","0");
        //$(".call-to-action").css("position","fixed");
        //$(".call-to-action").css("z-index","998");
     }

     //console.log("POSIÇÃO ATUAL DO SCROLL: "+scroll);

     // ANIMATE NUMBER
     if (scroll > 900){

        if(entreiAnimateNumber==0){

            entreiAnimateNumber = 1;

            $('#numero1')
              .prop('number', 1)
              .animateNumber(
                {
                  number: numPalestrantes
                },
                6500
              );

              $('#numero2')
              .prop('number', 250)
              .animateNumber(
                {
                  number: numParticipantes
                },
                6500
              );

              $('#numero3')
              .prop('number', 1)
              .animateNumber(
                {
                  number: numExpositores
                },
                6500
              );

              $('#numero4')
              .prop('number', 250)
              .animateNumber(
                {
                  number: numParticipantes
                },
                6500
              );

          }

      }



  });

});


/* ABRIR OU FECHAR O MENU SIDE */
function fecharSideMenu(){
   $(".menu-side").css("right","-370px");
}

function abrirSideMenu(){
   $(".menu-side").css("right","0px");
}

/* ABRIR OU FECHAR O MENU DE LOGIN */
function fecharModalLogin(){
    $(".modal-login").fadeOut("500");
}
function abrirModalLogin(){
    $(".modal-login").fadeIn("500");
}



// DESABILITAR O PAUSE ON HOVER
$('.carousel').carousel({
    pause: "false"
});


// PARALLAX DO BANNER PRINCIPAL
$("#container").mousemove(function(e) {
  parallaxIt(e, "#slide", -50);
  parallaxIt(e, ".background", -30);
});

$("#container2").mousemove(function(e) {
  parallaxIt2(e, "#slide2", -63);
});

function parallaxIt(e, target, movement) {
  var $this = $("#container");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}
function parallaxIt2(e, target, movement) {
  var $this = $("#container2");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}
