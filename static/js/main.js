window.onload = function(event) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const content = document.getElementById('content');
        const response = xhr.responseText;
        const membrosGrupoTesseractJSON = JSON.parse(response);
        let html = '';

        html += '<ul id="membros">';
        membrosGrupoTesseractJSON.forEach(function(membro) {
          html += '<li id="' + membro.login + '" class="membro">';
          html += '<a class="membro-detalhes" href="' + membro.url + '">';
          html += '<figure class="figure">';
          html += '<img';
          html += ' class="membro-avatar"';
          html += ' src="' + membro.avatar_url + '"';
          html += ' />';
          html += '<figcaption class="figure-caption">';
          html += membro.login;
          html += '</figcaption>';
          html += '</figure>';
          html += '</a>';
          html += '</li>';
        });
        html += '</ul>';
        content.innerHTML = html;

        let linksMembroDetalhes = Array.from(
          document.getElementsByClassName('membro-detalhes')
        );

        linksMembroDetalhes.forEach(function(linkMembroDetalhes) {
          linkMembroDetalhes.onclick = function(event) {
            event.preventDefault();
            let url = this.href;
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let json = JSON.parse(xhr.responseText);
                  let dadosMembro = 'INFORMAÇÕES\n\n';
                  dadosMembro += 'Nome: ' + json.name;
                  dadosMembro += '\n';
                  dadosMembro +=
                    'Quantidade de repositórios: ' + json.public_repos;
                  dadosMembro += '\n';
                  dadosMembro += 'Quantidade de seguidores: ' + json.followers;
                  dadosMembro += '\n';
                  var dataIngresso = new Date(
                    json.created_at
                  ).toLocaleDateString();
                  dadosMembro += 'Data de ingresso: ' + dataIngresso;
                  alert(dadosMembro);
                }
              }
            };

            xhr.open('GET', url);
            xhr.send();
          };
        });
      }
    }
  };
  let url = 'https://api.github.com/orgs/grupotesseract/public_members';
  xhr.open('GET', url);
  xhr.send();

  let campoPesquisa = document.getElementById('pesquisa');
  let botaoPesquisar = document.getElementById('pesquisar');
  let botaoLimpar = document.getElementById('limpar');

  botaoPesquisar.onclick = function(event) {
    let membrosGrupoTesseract = Array.from(
      document.querySelectorAll('.membro')
    );
    var membrosOcultar = membrosGrupoTesseract.filter(function(membro) {
      return membro.id !== campoPesquisa.value;
    });

    membrosOcultar.forEach(function(membro) {
      membro.style.display = 'none';
    });
  };

  botaoLimpar.onclick = function(event) {
    campoPesquisa.value = '';
    let membrosGrupoTesseract = Array.from(
      document.querySelectorAll('.membro')
    );
    membrosGrupoTesseract.forEach(function(membro) {
      membro.style.display = 'block';
    });
  };
};
