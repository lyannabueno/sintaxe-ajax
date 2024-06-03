$(document).ready(function() {
    // Garantir que a biblioteca de máscara seja carregada corretamente e aplicada
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val().replace('-', ''); // Remove caracteres da máscara antes de enviar
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);

        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        fetch(endpoint)
        
        .then(function(resposta) {
            return resposta.json()
        })

            .then(function(json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                
                $('#endereco').val(endereco);
            })

            .catch(function(erro) {
                alert("Ocorreu um erro ao buscar o endereço, tente novamente main tarde!")
            })

            .finally(function() {
                resetButton();
            })

            function resetButton() {
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            }
    });
});
