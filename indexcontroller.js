function carregarSugestao() {
    const sugestao = document.getElementById("sugestao");
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch("http://localhost:8080/apis/find-musics", requestOptions) // URL corrigida
        .then((response) => response.json())
        .then((result) => {
            let html = result.map(music => `${music.titulo} - ${music.artista}`).join("<br>");
            sugestao.innerHTML = html;
        })
        .catch((error) => sugestao.innerHTML = "Erro ao carregar sugestões: " + error);
}

function buscarMusicas() {
    const resultado = document.getElementById("result");
    const titulo = document.getElementById("titulo").value;
    let erro = false;

    fetch(`http://localhost:8080/apis/find-musics`, { method: "GET" }) // URL corrigida
        .then(response => {
            if (!response.ok) erro = true;
            return response.json();
        })
        .then(result => {
            if (erro) {
                resultado.innerHTML = "Erro ao buscar músicas.";
            } else {
                let html = "";
                result.forEach(element => {
                    if (element.titulo.toLowerCase().includes(titulo.toLowerCase())) {
                        html += `${element.titulo} - ${element.artista}<br>`;
                    }
                });
                resultado.innerHTML = html || "Nenhuma música encontrada.";
            }
        })
        .catch(error => resultado.innerHTML = "Erro ao buscar músicas: " + error);
}

function cadMusica() {
    const URL = "http://localhost:8080/apis/add-music"; // URL corrigida
    const fmusica = document.getElementById("fmusica");
    const formData = new FormData(fmusica); // Usa FormData para enviar arquivos

    fetch(URL, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(json => {
            alert("Música cadastrada com sucesso!");
            fmusica.reset();
        })
        .catch(error => {
            console.error("Erro ao cadastrar música: ", error);
        });
}
